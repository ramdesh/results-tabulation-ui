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

import {generateReport, getElections, getTallySheet, TALLY_SHEET_STATUS_ENUM} from "../tabulation-api";
import {MessagesProvider, MessagesConsumer} from "../messages.provider";
import {
    PATH_ELECTION, PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY, PATH_ELECTION_DATA_ENTRY_EDIT, PATH_ELECTION_REPORT, PATH_ELECTION_REPORT_VIEW,
    TALLY_SHEET_CODE_CE_201,
    TALLY_SHEET_CODE_CE_201_PV, TALLY_SHEET_CODE_PRE_30_ED, TALLY_SHEET_CODE_PRE_30_PD,
    TALLY_SHEET_CODE_PRE_41
} from "../../App";
import Processing from "../processing";
import Error from "../error";
import BreadCrumb from "../../components/bread-crumb";
import Button from "@material-ui/core/Button";


export default function ReportList(props) {
    const {history, election} = props;
    const {electionId, electionName} = election;
    const {tallySheetCode} = props.queryString;

    const [tallySheets, setTallySheets] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        getTallySheet({tallySheetCode}).then((tallySheets, limit = 3000, offset = 0) => {
            setTallySheets(tallySheets);
            setProcessing(false);
        }).catch((error) => {
            setError(true);
            setProcessing(false);
        })
    }, [])


    function getTallySheetListJsx() {
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
            }
        }
    }


    function getTallySheetListJsx_PRE_30_PD(tallySheets) {
        return <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Electoral District</TableCell>
                    <TableCell align="center">Polling Division</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tallySheets.map(tallySheet => {
                    return <TableRow key={tallySheet.tallySheetId}>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">{tallySheet.area.areaName}</TableCell>
                        <TableCell align="center">{tallySheet.tallySheetStatus}</TableCell>
                        <TableCell align="center">
                            <Button
                                tallySheet={tallySheet}
                                variant="outlined" color="default"
                                size="small"
                                disabled={!(tallySheet.tallySheetStatus !== TALLY_SHEET_STATUS_ENUM.VERIFIED)}

                                onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                            >
                                Verify
                            </Button>
                            <Button
                                tallySheet={tallySheet}
                                variant="outlined" color="default"
                                size="small"
                                onClick={() => history.push(PATH_ELECTION_REPORT_VIEW(electionId, tallySheet.tallySheetId))}
                            >
                                View
                            </Button>
                            <Button
                                variant="outlined" color="default"
                                disabled={!(tallySheet.tallySheetStatus === TALLY_SHEET_STATUS_ENUM.VERIFIED)}
                                size="small" disabled={tallySheet.lockedVersionId === null}
                            >
                                Unlock
                            </Button>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    }


    function getTallySheetListJsx_PRE_30_ED(tallySheets) {
        return <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Electoral District</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tallySheets.map(tallySheet => {
                    return <TableRow key={tallySheet.tallySheetId}>
                        <TableCell align="center">{tallySheet.area.areaName}</TableCell>
                        <TableCell align="center">{tallySheet.tallySheetStatus}</TableCell>
                        <TableCell align="center">
                            <Button
                                variant="outlined" color="default"
                                size="small" disabled={tallySheet.lockedVersionId !== null}
                            >
                                Verify
                            </Button>
                            <Button
                                variant="outlined" color="default"
                                size="small"
                            >
                                View
                            </Button>
                            <Button
                                variant="outlined" color="default"
                                size="small" disabled={tallySheet.lockedVersionId === null}
                            >
                                Unlock
                            </Button>
                        </TableCell>
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
                {label: tallySheetCode.toLowerCase(), to: PATH_ELECTION_REPORT(electionId, tallySheetCode)},
            ]}
        />
        <div className="page-content">
            <div>{electionName}</div>
            <div>{tallySheetCode}</div>
            {getTallySheetListJsx()}
        </div>
    </div>
}

export function ReportViewButton(props) {
    const {tallySheet} = props;

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (open && tallySheet) {
            const {tallySheetId, tallySheetCode} = tallySheet;
            generateReport(tallySheetId, tallySheetCode)
        }
        // getTallySheetVersionHtml
    }, [open, tallySheet])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    if (open) {
        return <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Sound
                    </Typography>
                    <Button color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <div>

            </div>
        </Dialog>
    } else {
        return <Button
            {...props}
            onClick={(event) => {
                handleClickOpen();
                props.onClick && props.onClick(event);
            }}
        >
            {props.children}
        </Button>
    }

}
