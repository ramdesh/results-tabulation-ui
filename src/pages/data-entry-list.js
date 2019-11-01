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
import {getAreaName, getElectoralDistrictName, getPollingDivisionName, getTallySheetCodeStr} from "../utils/tallySheet";
import TextField from "@material-ui/core/TextField/TextField";
import {fieldMatch, getFirstOrNull} from "../utils";

import {VOTE_TYPE} from "../services/tabulation-api/entities/election.entity";


export default function DataEntryList({history, queryString, election, subElection}) {
    const {electionId, electionName} = election;
    const {tallySheetCode} = queryString;

    const [tallySheets, setTallySheets] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(false);

    const [searchParameters, setSearchParameters] = React.useState({
        electoralDistrict: '',
        pollingDivision: '',
        countingCentre: '',
        status: ''
    });

    const handleChange = name => event => {
        setSearchParameters({...searchParameters, [name]: event.target.value});
    };

    useEffect(() => {
        getTallySheet({
            electionId: getElection().electionId,
            tallySheetCode,
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

    function getElection() {
        return subElection ? subElection : election;
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
                        <TableCell align="center" style={{width: "20%"}}>
                            <TextField
                                value={searchParameters.electoralDistrict}
                                margin="dense"
                                variant="outlined"
                                placeholder="Electoral District"
                                onChange={handleChange('electoralDistrict')}
                            />
                        </TableCell>
                        <TableCell align="center" style={{width: "20%"}}>
                            <TextField
                                value={searchParameters.pollingDivision}
                                margin="dense"
                                variant="outlined"
                                placeholder="Polling Division"
                                onChange={handleChange('pollingDivision')}
                            />
                        </TableCell>
                        <TableCell align="center" style={{width: "10%"}}>
                            <TextField
                                value={searchParameters.countingCentre}
                                margin="dense"
                                variant="outlined"
                                placeholder="Centre"
                                onChange={handleChange('countingCentre')}
                            />
                        </TableCell>
                        <TableCell align="center" style={{width: "20%"}}>
                            <TextField
                                value={searchParameters.status}
                                margin="dense"
                                variant="outlined"
                                placeholder="Status"
                                onChange={handleChange('status')}
                            />
                        </TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
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
                        if (fieldMatch(getAreaName(tallySheet.countingCentre), searchParameters.countingCentre) &&
                            fieldMatch(getAreaName(tallySheet.electoralDistrict), searchParameters.electoralDistrict) &&
                            fieldMatch(tallySheet.tallySheetStatus, searchParameters.status) &&
                            fieldMatch(getAreaName(tallySheet.pollingDivision), searchParameters.pollingDivision)) {
                            return <TableRow key={tallySheet.tallySheetId}>
                                <TableCell align="center">{getAreaName(tallySheet.electoralDistrict)}</TableCell>
                                <TableCell align="center">{getAreaName(tallySheet.pollingDivision)}</TableCell>
                                <TableCell align="center">{getAreaName(tallySheet.countingCentre)}</TableCell>
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
                                        Verify
                                    </Button>
                                    <Button
                                        variant="outlined" color="default"
                                        disabled={tallySheet.latestVersionId === null}
                                        size="small"
                                        disabled={!(tallySheet.tallySheetStatus !== TALLY_SHEET_STATUS_ENUM.NOT_ENTERED)}
                                        onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined" color="default"
                                        disabled={tallySheet.lockedVersionId === null}
                                        size="small"
                                        disabled={!(tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.VERIFIED)}
                                        onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                                    >
                                        Unlock
                                    </Button>
                                </TableCell>
                            </TableRow>
                        }
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
                    label: getTallySheetCodeStr({tallySheetCode, election: getElection()}).toLowerCase(),
                    to: PATH_ELECTION_DATA_ENTRY(electionId, tallySheetCode, getElection().electionId)
                },
            ]}
        />
        <div className="page-content">
            <div>{electionName}</div>
            <div>{getTallySheetCodeStr({tallySheetCode, election: getElection()})}</div>
            {getTallySheetListJsx()}
        </div>
    </div>
}