import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {isNumeric, processNumericValue} from "../../utils";
import {
    getElections,
    getTallySheet,
    getTallySheetById,
    getTallySheetVersionById,
    saveTallySheetVersion, submitTallySheet
} from "../../services/tabulation-api";
import {MessagesProvider, MessagesConsumer, MESSAGE_TYPES} from "../../services/messages.provider";
import {
    PATH_ELECTION, PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY, PATH_ELECTION_DATA_ENTRY_EDIT,
    TALLY_SHEET_CODE_CE_201,
    TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_41
} from "../../App";
import BreadCrumb from "../../components/bread-crumb";
import Processing from "../../components/processing";
import Error from "../../components/error";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

export default function DataEntryEdit_PRE_41({history, queryString, election, tallySheet, messages}) {
    const {tallySheetId, tallySheetCode} = tallySheet;
    const {electionId, electionName} = election;

    const [candidateWiseCounts, setCandidateWiseCounts] = useState({});
    const [rejectedVoteCount, setRejectedVoteCount] = useState(0);
    const [totalValidVoteCount, setTotalValidVoteCount] = useState(0);
    const [totalVoteCount, setTotalVoteCount] = useState(0);
    const [processing, setProcessing] = useState(true);
    const [tallySheetVersion, setTallySheetVersion] = useState(null);
    const [processingLabel, setProcessingLabel] = useState("Loading");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (tallySheet.latestVersionId) {
            getTallySheetVersionById(tallySheetId, tallySheetCode, tallySheet.latestVersionId).then((tallySheetVersion) => {
                const latestCandidateWiseCounts = {};
                const {content, summary} = tallySheetVersion;
                let validTotal = 0;
                for (let i = 0; i < content.length; i++) {
                    let contentRow = content[i];
                    latestCandidateWiseCounts[contentRow.candidateId] = {
                        candidateId: contentRow.candidateId,
                        validVoteCount: contentRow.count,
                        validVoteCountInWords: contentRow.countInWords
                    };
                    validTotal += contentRow.count;
                }
                setRejectedVoteCount(summary.rejectedVoteCount);
                setTotalValidVoteCount(validTotal);
                setTotalVoteCount((validTotal + summary.rejectedVoteCount));
                setCandidateWiseCounts(latestCandidateWiseCounts);
                setProcessing(false);
            }).catch((error) => {
                messages.push("Error", "Tally sheet is not reachable.", MESSAGE_TYPES.ERROR);
                setProcessing(false);
            })
        } else {
            const initialCandidateWiseCounts = {};
            election.parties.map(party => {
                party.candidates.map(candidate => {
                    initialCandidateWiseCounts[candidate.candidateId] = {
                        candidateId: candidate.candidateId,
                        validVoteCount: 0,
                        validVoteCountInWords: 0
                    };
                });
            });
            setCandidateWiseCounts(initialCandidateWiseCounts);
            setProcessing(false);
        }
    }, []);

    const handleValidVoteCountChange = candidateId => event => {
        setCandidateWiseCounts({
            ...candidateWiseCounts,
            [candidateId]: {
                ...candidateWiseCounts[candidateId],
                validVoteCount: processNumericValue(event.target.value)
            }
        })
    };

    const handleValidVoteCountInWordsChange = candidateId => event => {
        setCandidateWiseCounts({
            ...candidateWiseCounts,
            [candidateId]: {
                ...candidateWiseCounts[candidateId],
                validVoteCountInWords: event.target.value
            }
        })
    };

    const getTallySheetSaveRequestBody = () => {
        const content = [];
        election.parties.map(party => {
            party.candidates.map(candidate => {
                const {candidateId} = candidate;
                const {validVoteCount, validVoteCountInWords} = candidateWiseCounts[candidateId];
                content.push({
                    candidateId: candidateId,
                    count: validVoteCount,
                    countInWords: validVoteCountInWords
                })
            })
        });

        return {
            content: content,
            summary: {
                rejectedVoteCount
            }
        }
    };

    const handleClickNext = (saved = true) => async (event) => {
        if (validateAllValues()) {
            setSaved(saved)
            setProcessing(true);
            setProcessingLabel("Saving");
            try {
                const body = getTallySheetSaveRequestBody();
                const tallySheetVersion = await saveTallySheetVersion(tallySheetId, tallySheetCode, body);

                setTallySheetVersion(tallySheetVersion);
            } catch (e) {
                messages.push("Error", "Unknown error occurred while saving the tally sheet.", MESSAGE_TYPES.ERROR);
            }
            setProcessing(false);
        } else {
            messages.push("Error", "Please check the input values for errors", MESSAGE_TYPES.ERROR)
        }
    };

    const handleClickSubmit = () => async (event) => {
        setProcessing(true);
        setProcessingLabel("Submitting");
        try {
            const {tallySheetVersionId} = tallySheetVersion;
            const tallySheet = await submitTallySheet(tallySheetId, tallySheetVersionId);

            messages.push("Success", "PRE-41 tally sheet was submitted successfully", MESSAGE_TYPES.SUCCESS);
            setTimeout(() => {
                const subElectionId = tallySheet.electionId;
                history.push(PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode, subElectionId));
            }, 1000)
        } catch (e) {
            messages.push("Error", "Unknown error occurred while submitting the tally sheet.", MESSAGE_TYPES.ERROR);
        }

        setProcessing(false);
    };

    function calculateTotalValidVoteCount() {
        let total = 0;
        for (let key in candidateWiseCounts) {
            total += parseInt(candidateWiseCounts[key]["validVoteCount"])
        }
        console.log(total);
        return total;
    }

    function validateAllValues() {
        for (let key in candidateWiseCounts) {
            if (!isNumeric(candidateWiseCounts[key]["validVoteCount"])) {
                return false;
            }
        }
        return (isNumeric(rejectedVoteCount) &&
            calculateTotalVoteCount() === totalVoteCount &&
            calculateTotalValidVoteCount() === totalValidVoteCount
        )

    }

    function calculateTotalVoteCount() {
        return calculateTotalValidVoteCount() + parseInt(rejectedVoteCount);
    }


    const handleTotalValidVoteCountChange = () => event => {
        setTotalValidVoteCount(processNumericValue(event.target.value));
    };

    const handleRejectedVoteCountChange = () => event => {
        setRejectedVoteCount(processNumericValue(event.target.value));
    };

    const handleTotalVoteCountChange = () => event => {
        setTotalVoteCount(processNumericValue(event.target.value));
    };

    function getTallySheetEditForm() {
        if (saved) {
            return <Table aria-label="simple table" size={saved ? "small" : "medium"}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Candidate Name</TableCell>
                        <TableCell align="center">Party Symbol</TableCell>
                        <TableCell align="center">Count in words</TableCell>
                        <TableCell align="right">Count in figures</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {election.parties.map(party => {
                        return party.candidates.map(candidate => {
                            const {candidateId, candidateName} = candidate;
                            const {partySymbol} = party;
                            const candidateWiseCount = candidateWiseCounts[candidateId];
                            const {validVoteCount, validVoteCountInWords} = candidateWiseCount;
                            return <TableRow key={candidateId}>
                                <TableCell align="center">{candidateName}</TableCell>
                                <TableCell align="center">{partySymbol}</TableCell>
                                <TableCell align="center">{validVoteCountInWords}</TableCell>
                                <TableCell align="right">{validVoteCount}</TableCell>
                            </TableRow>
                        });
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Total valid vote count</TableCell>
                        <TableCell align="right">{calculateTotalValidVoteCount()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Total rejected vote count</TableCell>
                        <TableCell align="right">{rejectedVoteCount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Total vote count</TableCell>
                        <TableCell align="right">{calculateTotalVoteCount()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={4}>
                            <div className="page-bottom-fixed-action-bar">
                                <Button
                                    variant="contained" color="default" onClick={handleClickNext(false)}
                                    disabled={processing}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained" color="primary" onClick={handleClickSubmit()}
                                    disabled={processing}
                                >
                                    Submit
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>

                </TableFooter>

            </Table>
        } else if (!processing) {
            return <Table aria-label="simple table" size={saved ? "small" : "medium"}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Candidate Name</TableCell>
                        <TableCell align="center">Party Symbol</TableCell>
                        <TableCell align="center">Count in words</TableCell>
                        <TableCell align="right">Count in figures</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {election.parties.map(party => {
                        return party.candidates.map(candidate => {
                            const {candidateId, candidateName} = candidate;
                            const {partySymbol} = party;
                            const candidateWiseCount = candidateWiseCounts[candidateId];
                            const {validVoteCount, validVoteCountInWords} = candidateWiseCount;
                            return <TableRow key={candidateId}>
                                <TableCell align="center">{candidateName}</TableCell>
                                <TableCell align="center">{partySymbol}</TableCell>
                                <TableCell align="center">
                                    <TextField
                                        required
                                        className={"data-entry-edit-count-in-words-input"}
                                        value={validVoteCountInWords}
                                        margin="normal"
                                        onChange={handleValidVoteCountInWordsChange(candidateId)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        required
                                        error={!isNumeric(validVoteCount)}
                                        helperText={!isNumeric(validVoteCount) ? "Only numeric values are valid" : ''}
                                        className={"data-entry-edit-count-input"}
                                        value={validVoteCount}
                                        margin="normal"
                                        onChange={handleValidVoteCountChange(candidateId)}
                                    />
                                </TableCell>
                            </TableRow>
                        });
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Total valid vote count</TableCell>
                        <TableCell align="right">
                            <TextField
                                required
                                error={calculateTotalValidVoteCount() !== totalValidVoteCount}
                                helperText={calculateTotalValidVoteCount() !== totalValidVoteCount ? 'Total valid vote count mismatch!' : ' '}
                                className={"data-entry-edit-count-input"}
                                value={totalValidVoteCount}
                                margin="normal"
                                onChange={handleTotalValidVoteCountChange()}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Total rejected vote count</TableCell>
                        <TableCell align="right"><TextField
                            required
                            error={!isNumeric(rejectedVoteCount)}
                            helperText={!isNumeric(rejectedVoteCount) ? "Only numeric values are valid" : ''}
                            className={"data-entry-edit-count-input"}
                            value={rejectedVoteCount}
                            margin="normal"
                            onChange={handleRejectedVoteCountChange()}
                        /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Total vote count</TableCell>
                        <TableCell align="right">
                            <TextField
                                required
                                error={calculateTotalVoteCount() !== totalVoteCount}
                                helperText={calculateTotalVoteCount() !== totalVoteCount ? 'Total vote count mismatch!' : ' '}
                                className={"data-entry-edit-count-input"}
                                value={totalVoteCount}
                                margin="normal"
                                onChange={handleTotalVoteCountChange()}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={4}>
                            <div className="page-bottom-fixed-action-bar">
                                <Button
                                    variant="contained" color="default" onClick={handleClickNext()}
                                    disabled={processing}
                                >
                                    Save & Next
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>

                </TableFooter>

            </Table>
        } else {
            return null;
        }
    }


    return <Processing showProgress={processing} label={processingLabel}>
        {getTallySheetEditForm()}
    </Processing>;
}