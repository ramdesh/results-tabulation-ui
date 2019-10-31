import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {getElections, getTallySheet, TALLY_SHEET_STATUS_ENUM, unlockTallySheet} from "../services/tabulation-api";
import {MessagesProvider, MessagesConsumer, MESSAGE_TYPES} from "../services/messages.provider";
import {
    PATH_ELECTION, PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY, PATH_ELECTION_DATA_ENTRY_EDIT, PATH_ELECTION_REPORT_VIEW,
    TALLY_SHEET_CODE_CE_201,
    TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_41
} from "../App";
import Processing from "../components/processing";
import Error from "../components/error";
import BreadCrumb from "../components/bread-crumb";
import Button from "@material-ui/core/Button";
import {getFirstOrNull} from "../utils";


export default function DataEntryList({history, queryString, election}) {
    const {electionId, electionName} = election;
    const {tallySheetCode, subElectionId} = queryString;

    const [tallySheets, setTallySheets] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        getTallySheet({
            electionId: subElectionId,
            tallySheetCode,
            subElectionId,
            limit: 3000,
            offset: 0
        }).then((tallySheets) => {
            setTallySheets(tallySheets);
            setProcessing(false);
        }).catch((error) => {
            setError(true);
            setProcessing(false);
        })
    }, []);


    //TODO refactor and generalize to a common utility.
    function getElectoralDivision(tallySheet) {
        const countingCentre = tallySheet.area;
        const pollingStation = getFirstOrNull(countingCentre.pollingStations);
        const pollingDistrict = getFirstOrNull(pollingStation.pollingDistricts);
        const pollingDivision = getFirstOrNull(pollingDistrict.pollingDivisions);

        return pollingDivision
    }

    //TODO refactor and generalize to a common utility.
    function getElectoralDistrict(tallySheet) {
        const countingCentre = tallySheet.area;
        const pollingStation = getFirstOrNull(countingCentre.pollingStations);
        let electoralDistrict = null;
        if (pollingStation) {
            const pollingDistrict = getFirstOrNull(pollingStation.pollingDistricts);
            const pollingDivision = getFirstOrNull(pollingDistrict.pollingDivisions);
            electoralDistrict = getFirstOrNull(pollingDivision.electoralDistricts);
        } else {
            electoralDistrict = getFirstOrNull(countingCentre.electoralDistricts);
        }

        return electoralDistrict;
    }

    function getElectoralDistrictName(tallySheet) {
        const electoralDistrict = getElectoralDistrict(tallySheet);
        if (electoralDistrict) {
            return electoralDistrict.areaName;
        }
    }

    function getPollingDivisionName(tallySheet) {
        const electoralDistrict = getElectoralDivision(tallySheet);
        if (electoralDistrict) {
            return electoralDistrict.areaName;
        }
    }

    function getTallySheetListJsx() {
        if (processing) {
            return <Processing/>
        } else if (error) {
            return <Error
                title="Tally sheet list cannot be accessed"
            />
        } else {
            return <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Electoral District</TableCell>
                        <TableCell align="center">Polling Division</TableCell>
                        <TableCell align="center">Counting Centre</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tallySheets.map(tallySheet => {
                        return <TableRow key={tallySheet.tallySheetId}>
                            <TableCell align="center">{getElectoralDistrictName(tallySheet)}</TableCell>
                            <TableCell align="center">{getPollingDivisionName(tallySheet)}</TableCell>
                            <TableCell align="center">{tallySheet.area.areaName}</TableCell>
                            <TableCell align="center">{tallySheet.tallySheetStatus}</TableCell>
                            <TableCell align="center">
                                {(() => {
                                    if (tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.NOT_ENTERED) {
                                        return <Button
                                            variant="outlined" color="default"
                                            size="small"
                                            onClick={() => history.push(PATH_ELECTION_DATA_ENTRY_EDIT(electionId, tallySheet.tallySheetId))}
                                        >
                                            Enter
                                        </Button>
                                    } else {
                                        return <Button
                                            variant="outlined" color="default"
                                            size="small"
                                            disabled={!(tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.ENTERED)}
                                            onClick={() => history.push(PATH_ELECTION_DATA_ENTRY_EDIT(electionId, tallySheet.tallySheetId))}
                                        >
                                            Edit
                                        </Button>
                                    }
                                })()}
                                <Button
                                    variant="outlined" color="default"
                                    disabled={!(tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.SUBMITTED)}
                                    size="small"
                                    onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outlined" color="default" disabled={tallySheet.latestVersionId === null}
                                    size="small"
                                    disabled={!(tallySheet.tallySheetStatus !== TALLY_SHEET_STATUS_ENUM.NOT_ENTERED)}
                                    onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="outlined" color="default" disabled={tallySheet.lockedVersionId === null}
                                    size="small"
                                    disabled={!(tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.VERIFIED)}
                                    onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                                >
                                    Unlock
                                </Button>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        }
    }

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()},
                {label: electionName, to: PATH_ELECTION_BY_ID(electionId)},
                {
                    label: tallySheetCode.toLowerCase(),
                    to: PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode, subElectionId)
                },
            ]}
        />
        <div className="page-content">
            <div>{electionName}</div>
            <div>{tallySheetCode}</div>
            {getTallySheetListJsx()}
        </div>
    </div>
}