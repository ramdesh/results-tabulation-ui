import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import {generateReport, getElections, getTallySheet, TALLY_SHEET_STATUS_ENUM} from "../../services/tabulation-api";
import {MessagesProvider, MessagesConsumer} from "../../services/messages.provider";
import {
    PATH_ELECTION,
    PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY,
    PATH_ELECTION_DATA_ENTRY_EDIT,
    PATH_ELECTION_REPORT,
    PATH_ELECTION_REPORT_VIEW,
    TALLY_SHEET_CODE_CE_201,
    TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_30_ED,
    TALLY_SHEET_CODE_PRE_30_PD, TALLY_SHEET_CODE_PRE_34_I_RO, TALLY_SHEET_CODE_PRE_34_II_RO,
    TALLY_SHEET_CODE_PRE_34,
    TALLY_SHEET_CODE_PRE_41,
    TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS,
    TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS
} from "../../App";
import Processing from "../../components/processing";
import Error from "../../components/error";
import BreadCrumb from "../../components/bread-crumb";
import Button from "@material-ui/core/Button";
import {getTallySheetCodeStr} from "../../utils/tallySheet";
import TextField from "@material-ui/core/TextField/TextField";
import {fieldMatch, getFirstOrNull} from "../../utils";
import {getAreaName} from "../../utils/tallySheet";
import {VOTE_TYPE} from "../../services/tabulation-api/entities/election.entity";


export default function ReportList({history, queryString, election, subElection}) {
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

    function getElection() {
        return subElection ? subElection : election;
    }


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
    }, [])

    function getTallySheetListJsx() {
        console.log("processing", processing)
        if (processing) {
            return <Processing/>
        } else if (error) {
            return <Error
                title="Tally sheet list cannot be accessed"
            />
        } else {
            if (tallySheetCode === TALLY_SHEET_CODE_PRE_30_PD) {
                return getTallySheetListJsx_PRE_30_PD(tallySheets)
            } else if (tallySheetCode === TALLY_SHEET_CODE_PRE_30_ED) {
                return getTallySheetListJsx_PRE_30_ED(tallySheets)
            } else if (tallySheetCode === TALLY_SHEET_CODE_PRE_34_I_RO ||
                tallySheetCode === TALLY_SHEET_CODE_PRE_34_II_RO ||
                tallySheetCode === TALLY_SHEET_CODE_PRE_34) {
                return getTallySheetListJsx_PRE_30_PD(tallySheets)
            } else if (tallySheetCode === TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS ||
                tallySheetCode === TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS) {
                return getTallySheetListJsx_AllIslandReports(tallySheets)
            }
        }
    }

    function getActions(tallySheet) {
        return <TableCell align="center">
            <Button
                variant="outlined" color="default"
                size="small"
                disabled={!(tallySheet.tallySheetStatus !== TALLY_SHEET_STATUS_ENUM.VERIFIED)}

                onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
            >
                Verify
            </Button>
            <Button
                variant="outlined" color="default"
                size="small"
                onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
            >
                View
            </Button>
            <Button
                variant="outlined" color="default"
                disabled={!(tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.VERIFIED)}
                size="small"
                onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
            >
                Unlock
            </Button>
        </TableCell>
    }

    function getTallySheetListJsx_PRE_30_PD(tallySheets) {
        return <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{width: "20%"}}>
                        <TextField
                            value={searchParameters.electoralDistrict}
                            margin="dense"
                            variant="outlined"
                            placeholder="Search Electoral District"
                            onChange={handleChange('electoralDistrict')}
                        />
                    </TableCell>
                    <TableCell align="center" style={{width: "20%"}}>
                        <TextField
                            value={searchParameters.pollingDivision}
                            margin="dense"
                            variant="outlined"
                            placeholder="Search Polling Division"
                            onChange={handleChange('pollingDivision')}
                        />
                    </TableCell>
                    <TableCell align="center" style={{width: "10%"}}>
                        <TextField
                            value={searchParameters.status}
                            margin="dense"
                            variant="outlined"
                            placeholder="Status"
                            onChange={handleChange('status')}
                        />
                    </TableCell>
                    <TableCell align="left"> </TableCell>
                    <TableCell align="center"> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">Electoral District</TableCell>
                    <TableCell align="left">Polling Division</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tallySheets.map(tallySheet => {
                    if (fieldMatch(getAreaName(tallySheet.electoralDistrict), searchParameters.electoralDistrict) &&
                        fieldMatch(tallySheet.tallySheetStatus, searchParameters.status) &&
                        fieldMatch(getAreaName(tallySheet.pollingDivision), searchParameters.pollingDivision)) {
                        return <TableRow key={tallySheet.tallySheetId}>
                            <TableCell align="left">{getAreaName(tallySheet.electoralDistrict)}</TableCell>
                            <TableCell align="left">{getAreaName(tallySheet.pollingDivision)}</TableCell>
                            <TableCell align="center">{tallySheet.tallySheetStatus}</TableCell>
                            {getActions(tallySheet)}
                        </TableRow>
                    }
                })}
            </TableBody>
        </Table>
    }


    function getTallySheetListJsx_PRE_30_ED(tallySheets) {
        return <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{width: "20%"}}>
                        <TextField
                            value={searchParameters.electoralDistrict}
                            margin="dense"
                            variant="outlined"
                            placeholder="Search Electoral District"
                            onChange={handleChange('electoralDistrict')}
                        />
                    </TableCell>
                    <TableCell align="center" style={{width: "10%"}}>
                        <TextField
                            value={searchParameters.status}
                            margin="dense"
                            variant="outlined"
                            placeholder="Status"
                            onChange={handleChange('status')}
                        />
                    </TableCell>
                    <TableCell align="left"> </TableCell>
                    <TableCell align="center"> </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">Electoral District</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tallySheets.map(tallySheet => {
                    if (fieldMatch(getAreaName(tallySheet), searchParameters.electoralDistrict) &&
                        fieldMatch(tallySheet.tallySheetStatus, searchParameters.status)) {
                        return <TableRow key={tallySheet.tallySheetId}>
                            <TableCell align="left">{getAreaName(tallySheet.electoralDistrict)}</TableCell>
                            <TableCell align="center">{tallySheet.tallySheetStatus}</TableCell>
                            {getActions(tallySheet)}
                        </TableRow>
                    }
                })}
            </TableBody>
        </Table>
    }

    function getTallySheetListJsx_AllIslandReports(tallySheets) {
        return <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Country</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tallySheets.map(tallySheet => {
                    return <TableRow key={tallySheet.tallySheetId}>
                        <TableCell align="left">{getAreaName(tallySheet.country)}</TableCell>
                        <TableCell align="center">{tallySheet.tallySheetStatus}</TableCell>
                        {getActions(tallySheet)}
                    </TableRow>
                })}
            </TableBody>
        </Table>
    }

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()},
                {label: electionName, to: PATH_ELECTION_BY_ID(electionId)},
                {
                    label: getTallySheetCodeStr({tallySheetCode, election: getElection()}).toLowerCase(),
                    to: PATH_ELECTION_REPORT(electionId, tallySheetCode)
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

