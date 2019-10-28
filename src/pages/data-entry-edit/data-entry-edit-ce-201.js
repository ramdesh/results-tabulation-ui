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

export default function DataEntryEdit_CE_201({history, queryString, election, tallySheet, messages}) {
    const {tallySheetId, tallySheetCode} = tallySheet;
    const {electionId, electionName} = election;

    const [pollingStationMap, setPollingStationMap] = useState({});
    const [pollingStations, setPollingStations] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [totalOrdinaryBallotCountFromBoxCount, setTotalOrdinaryBallotCountFromBoxCount] = useState(0);

    const fetchData = async () => {
        try {
            const pollingStations = await getPollingStations(tallySheet.area.areaId);
            const pollingStationMap = {};

            pollingStations.map((pollingStation) => {
                pollingStationMap[pollingStation.areaId] = {
                    areaId: pollingStation.areaId,
                    ordinaryBallotCountFromBoxCount: 0
                };
            });

            let total = 0;
            if (tallySheet.latestVersionId) {
                const latestVersion = await getTallySheetVersionById(tallySheetId, tallySheetCode, tallySheet.latestVersionId);

                const {content} = latestVersion;
                for (let i = 0; i < content.length; i++) {
                    let contentRow = content[i];
                    let {ordinaryBallotCountFromBoxCount} = contentRow;
                    if (ordinaryBallotCountFromBoxCount) {
                        pollingStationMap[contentRow.areaId].ordinaryBallotCountFromBoxCount = ordinaryBallotCountFromBoxCount
                        total += ordinaryBallotCountFromBoxCount
                    }
                }
            }

            setPollingStations(pollingStations);
            setPollingStationMap(pollingStationMap);
            setTotalOrdinaryBallotCountFromBoxCount(total);
        } catch (error) {
            setError(true)
        }

        setProcessing(false);
    };

    useEffect(() => {
        fetchData()
    }, []);


    const handleClickNext = (saved = true) => async (event) => {
        if (validateAllValues()) {
            setSaved(saved);
            setProcessing(true);
            try {
                const content = [];

                pollingStations.map(pollingStation => {
                    const {areaId} = pollingStation;
                    const {ordinaryBallotCountFromBoxCount} = pollingStationMap[areaId];
                    content.push({
                        areaId: areaId,
                        ballotBoxesIssued: [],
                        ballotBoxesReceived: [],
                        ballotsIssued: 0,
                        ballotsReceived: 0,
                        ballotsSpoilt: 0,
                        ballotsUnused: 0,
                        ordinaryBallotCountFromBoxCount: ordinaryBallotCountFromBoxCount,
                        tenderedBallotCountFromBoxCount: 0,
                        ordinaryBallotCountFromBallotPaperAccount: 0,
                        tenderedBallotCountFromBallotPaperAccount: 0
                    })
                })

                await saveTallySheetVersion(tallySheetId, tallySheetCode, {
                    content: content
                });


            } catch (e) {
                debugger;
                setError(true);
            }
            setProcessing(false);
        } else {
            messages.push("Error", "Please check the input values for errors")
        }

    };

    const handleClickSubmit = () => async (event) => {
        setSubmitted(true);

        setTimeout(() => {
            history.push(PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode))
        }, 10000);
    };

    const handleOrdinaryBallotCountFromBoxCountChange = areaId => event => {
        setPollingStationMap({
            ...pollingStationMap,
            [areaId]: {
                ...pollingStationMap[areaId],
                ordinaryBallotCountFromBoxCount: processNumericValue(event.target.value)
            }
        })
    };

    function calculateTotalOrdinaryBallotCountFromBoxCount() {
        let total = 0;
        for (let key in pollingStationMap) {
            total += parseInt(pollingStationMap[key]["ordinaryBallotCountFromBoxCount"])
        }
        console.log(total);
        return total;
    }

    const handleTotalOrdinaryBallotCountFromBoxCountChange = () => event => {
        setTotalOrdinaryBallotCountFromBoxCount(processNumericValue(event.target.value));
    };

    function validateAllValues() {
        for (let key in pollingStationMap) {
            if (!isNumeric(pollingStationMap[key]["ordinaryBallotCountFromBoxCount"])) {
                return false;
            }
        }
        return (calculateTotalOrdinaryBallotCountFromBoxCount() === totalOrdinaryBallotCountFromBoxCount)

    }

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
            return <Table aria-label="simple table" size={saved ? "small" : "medium"}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Polling Districts</TableCell>
                        <TableCell align="center">Polling Station</TableCell>
                        <TableCell align="center">Ordinary Ballot Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pollingStations.map(pollingStation => {
                        const {pollingDistricts, areaName, areaId} = pollingStation;
                        const {ordinaryBallotCountFromBoxCount} = pollingStationMap[areaId];
                        const pollingDistrictsStr = pollingDistricts.map(pollingDistrict => pollingDistrict.areaName).join(", ");
                        return <TableRow key={areaId}>
                            <TableCell align="center">{pollingDistrictsStr}</TableCell>
                            <TableCell align="center">{areaName}</TableCell>
                            <TableCell align="center">{ordinaryBallotCountFromBoxCount}</TableCell>
                        </TableRow>
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>Total ordinary ballot count</TableCell>
                        <TableCell align="right">{totalOrdinaryBallotCountFromBoxCount}</TableCell>
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
            return <Table aria-label="simple table" size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Polling Districts</TableCell>
                        <TableCell align="center">Polling Station</TableCell>
                        <TableCell align="center">Ordinary Ballot Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pollingStations.map(pollingStation => {

                        const {pollingDistricts, areaName, areaId} = pollingStation;

                        const {ordinaryBallotCountFromBoxCount} = pollingStationMap[areaId];

                        const pollingDistrictsStr = pollingDistricts.map(pollingDistrict => pollingDistrict.areaName).join(", ");

                        return <TableRow key={areaId}>
                            <TableCell align="center">{pollingDistrictsStr}</TableCell>
                            <TableCell align="center">{areaName}</TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    error={!isNumeric(ordinaryBallotCountFromBoxCount)}
                                    helperText={!isNumeric(ordinaryBallotCountFromBoxCount) ? "Only numeric values are valid" : ''}
                                    className={"data-entry-edit-count-input"}
                                    value={ordinaryBallotCountFromBoxCount}
                                    margin="normal"
                                    onChange={handleOrdinaryBallotCountFromBoxCountChange(areaId)}
                                />
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>Total ordinary ballot count</TableCell>
                        <TableCell align="right">
                            <TextField
                                required
                                error={calculateTotalOrdinaryBallotCountFromBoxCount() !== totalOrdinaryBallotCountFromBoxCount}
                                helperText={calculateTotalOrdinaryBallotCountFromBoxCount() !== totalOrdinaryBallotCountFromBoxCount ? 'Total ballot count mismatch!' : ' '}
                                className={"data-entry-edit-count-input"}
                                value={totalOrdinaryBallotCountFromBoxCount}
                                margin="normal"
                                onChange={handleTotalOrdinaryBallotCountFromBoxCountChange()}
                            />
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