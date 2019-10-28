import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {
    getElections, getPollingStations,
    getTallySheet,
    getTallySheetById,
    getTallySheetVersionById,
    saveTallySheetVersion
} from "../../services/tabulation-api";
import {MessagesProvider, MessagesConsumer} from "../../services/messages.provider";
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
import {isNumeric, processNumericValue} from "../../utils";

export default function DataEntryEdit_CE_201_PV({history, queryString, election, tallySheet, messages}) {
    const {tallySheetId, tallySheetCode} = tallySheet;
    const {electionId, electionName} = election;

    const [countingCentreSummary, setCountingCentreSummary] = useState({
        numberOfACoversRejected: 0,
        numberOfBCoversRejected: 0,
        numberOfValidBallotPapers: 0,
        situation: "",
        timeOfCommencementOfCount: null
    });
    const [ballotBoxList, setBallotBoxList] = useState([]);
    const [ballotBoxMap, setBallotBoxMap] = useState({});
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [totalOrdinaryBallotCountFromBoxCount, setTotalOrdinaryBallotCountFromBoxCount] = useState(0);

    const addBallotBox = ballotBox => {
        let {refId, ballotBoxId, numberOfAPacketsFound, numberOfPacketsInserted} = ballotBox;
        if (!ballotBoxId) {
            ballotBoxId = ""
        }

        if (!numberOfAPacketsFound) {
            numberOfAPacketsFound = 0;
        }

        if (!numberOfPacketsInserted) {
            numberOfPacketsInserted = 0;
        }

        setBallotBoxMap((ballotBoxMap) => {
            return {
                ...ballotBoxMap,
                [refId]: {
                    refId, ballotBoxId, numberOfAPacketsFound, numberOfPacketsInserted
                }
            }
        });
        setBallotBoxList(ballotBoxList => [...ballotBoxList, refId]);
    };

    const fetchData = async () => {
        try {
            if (tallySheet.latestVersionId) {
                const latestVersion = await getTallySheetVersionById(tallySheetId, tallySheetCode, tallySheet.latestVersionId);
                const {content, summary} = latestVersion;
                debugger;
                for (let i = 0; i < content.length; i++) {
                    let ballotBox = content[i];
                    ballotBox.refId = i;
                    addBallotBox({});
                }
                for (let i = content.length; i < 6; i++) {
                    addBallotBox({refId: i});
                }

                setCountingCentreSummary({...summary, countingCentreSummary});
            }
        } catch (error) {
            setError(true)
        }

        setProcessing(false);
    };

    useEffect(() => {
        fetchData()
    }, []);


    const handleClickNext = (saved = true) => async (event) => {
        setProcessing(true);
        setTimeout(() => {
            setSaved(saved)
            setProcessing(false);
        }, 300);
    };

    const handleClickSubmit = () => async (event) => {
        setProcessing(true);
        try {
            const content = [];
            const summary = countingCentreSummary

            ballotBoxList.map(ballotBoxRefId => {
                const ballotBox = ballotBoxMap[ballotBoxRefId];
                let {ballotBoxId, numberOfAPacketsFound, numberOfPacketsInserted} = ballotBox;
                content.push({ballotBoxId, numberOfAPacketsFound, numberOfPacketsInserted});
            });

            await saveTallySheetVersion(tallySheetId, tallySheetCode, {
                content: content,
                summary: summary
            });

            setSubmitted(true);

            setTimeout(() => {
                history.push(PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode))
            }, 10000);
        } catch (e) {
            debugger;
            setError(true);
        }
        setProcessing(false);
    };


    function getTallySheetEditForm() {
        if (processing) {
            return <Processing/>
        } else if (error) {
            return <Error
                title="Tally sheet is not accessible."
            />
        } else if (submitted) {
            return <div class="">
                <h4>Tally sheet was submitted successfully and waiting for verification.</h4>
                <div>
                    <Button variant="contained" color="default"
                            onClick={() => history.push(PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode))}>
                        Back to Data Entry
                    </Button>
                </div>
            </div>
        } else if (saved) {
            const {numberOfACoversRejected, numberOfBCoversRejected, numberOfValidBallotPapers, situation, timeOfCommencementOfCount} = countingCentreSummary;
            return <Table aria-label="simple table" size={saved ? "small" : "medium"}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Serial Number of Postal Votes Ballot Box</TableCell>
                        <TableCell align="center">No. of packets inserted by the Returning Officer</TableCell>
                        <TableCell align="center">No. pf PV-A packets found inside the Ballot Box after the
                            count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ballotBoxList.map(ballotBoxRefId => {
                        const ballotBox = ballotBoxMap[ballotBoxRefId];
                        let {ballotBoxId, numberOfAPacketsFound, numberOfPacketsInserted} = ballotBox;
                        return <TableRow key={ballotBoxRefId}>
                            <TableCell align="center">{ballotBoxId}</TableCell>
                            <TableCell align="center">{numberOfAPacketsFound}</TableCell>
                            <TableCell align="center">{numberOfPacketsInserted}</TableCell>
                        </TableRow>
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            Total number of PV-A packets found in the Box/ Boxes
                        </TableCell>
                        <TableCell align="right">

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            Number of Packets rejected on various grounds after opening 'A' covers
                        </TableCell>
                        <TableCell align="right">
                            {numberOfACoversRejected}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>No. of covers rejected on</strong>
                            various grounds after opening 'B' covers in accepted ballot papers receptacle
                        </TableCell>
                        <TableCell align="right">
                            {numberOfBCoversRejected}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>
                                No of postal ballot papers for the count in the receptacle for accepted ballot papers.
                            </strong>
                        </TableCell>
                        <TableCell align="right">
                            {numberOfValidBallotPapers}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>
                                Situation of Postal Ballot Paper Counting Centre
                            </strong>
                        </TableCell>
                        <TableCell align="right">
                            {situation}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>
                                Time of commencement of the count fo Postal Votes ballot papers
                            </strong>
                        </TableCell>
                        <TableCell align="right">
                            {timeOfCommencementOfCount}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            <div className="page-bottom-fixed-action-bar">
                                <Button variant="contained" color="default" onClick={handleClickNext(false)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleClickSubmit()}>
                                    Submit
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>

                </TableFooter>

            </Table>
        } else {
            const {numberOfACoversRejected, numberOfBCoversRejected, numberOfValidBallotPapers, situation, timeOfCommencementOfCount} = countingCentreSummary;
            return <Table aria-label="simple table" size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Polling Districts</TableCell>
                        <TableCell align="center">Polling Station</TableCell>
                        <TableCell align="center">Ordinary Ballot Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ballotBoxList.map(ballotBoxRefId => {
                        const ballotBox = ballotBoxMap[ballotBoxRefId];
                        let {ballotBoxId, numberOfAPacketsFound, numberOfPacketsInserted} = ballotBox;
                        return <TableRow key={ballotBoxRefId}>
                            <TableCell align="center">{ballotBoxId}</TableCell>
                            <TableCell align="center">{numberOfAPacketsFound}</TableCell>
                            <TableCell align="center">{numberOfPacketsInserted}</TableCell>
                        </TableRow>
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            Total number of PV-A packets found in the Box/ Boxes
                        </TableCell>
                        <TableCell align="right">

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            Number of Packets rejected on various grounds after opening 'A' covers
                        </TableCell>
                        <TableCell align="right">
                            {numberOfACoversRejected}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>No. of covers rejected on</strong>
                            various grounds after opening 'B' covers in accepted ballot papers receptacle
                        </TableCell>
                        <TableCell align="right">
                            {numberOfBCoversRejected}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>
                                No of postal ballot papers for the count in the receptacle for accepted ballot papers.
                            </strong>
                        </TableCell>
                        <TableCell align="right">
                            {numberOfValidBallotPapers}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>
                                Situation of Postal Ballot Paper Counting Centre
                            </strong>
                        </TableCell>
                        <TableCell align="right">
                            {situation}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>
                            <strong>
                                Time of commencement of the count fo Postal Votes ballot papers
                            </strong>
                        </TableCell>
                        <TableCell align="right">
                            {timeOfCommencementOfCount}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            <div className="page-bottom-fixed-action-bar">
                                <Button variant="contained" color="default" onClick={handleClickNext()}>
                                    Next
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>

            </Table>
        }
    }

    return getTallySheetEditForm()

}