import React, {Component} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {
    Typography,
    Button,
    FormControl,
    TextField,
    InputLabel,
    Select,
    OutlinedInput,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

export default function InvalidBallots() {

    const classes = useStyles();

    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Console app' }
    }
    axios(config)

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>
                <Typography variant="h5" gutterBottom>
                    Invalid Ballot Count
                </Typography>
                <Typography variant="body2" gutterBottom>
                    This is to be filled at the counting centre before counting the valid votes.
                    Please Select the District Centre and Counting Center at first.
                </Typography>
            </div>

            <div className={classes.section}>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        District Centre
                    </InputLabel>
                    <Select
                        // value={values.age}
                        // onChange={handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Counting Centre
                    </InputLabel>
                    <Select
                        native
                        input={
                            <OutlinedInput
                                name="age"
                                margin="dense"
                                labelWidth={130}
                                id="outlined-age-native-simple"
                            />
                        }
                    >
                        })}
                    </Select>
                </FormControl>

            </div>

            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>Ground For Rejection</TableCell>
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>No of Ballot Papers Rejected</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Does not bear the official mark</TableCell>
                            <TableCell style={{fontSize:13}}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Voted for more than one candidate</TableCell>
                            <TableCell style={{fontSize:13}}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Specified a second preference or a third preference only both such preference only</TableCell>
                            <TableCell style={{fontSize:13}}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Something is written or marked by which the voter can be identified</TableCell>
                            <TableCell style={{fontSize:13}}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{fontSize:13}}>Unmarked</TableCell>
                            <TableCell style={{fontSize:13}}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Void for Uncertainty</TableCell>
                            <TableCell style={{fontSize:13}}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>


            <div className={clsx(classes.section, classes.right)}>
                <Button variant="contained" className={classes.button}>
                    Save
                </Button>
                <Button style = {{color :'Black'}} variant="contained" className={classes.button}>
                    Submit
                </Button>
            </div>
        </form>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: 10,
        margin:'3%'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    button: {
        margin: theme.spacing(1)
    },
    readOnlyField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    section: {
        margin: 10
    },
    sectionHeader: {
        // fontWeight: 600,
        padding: 10
    },
    sectionRow: {
        display: "flex",
        flexDirection: "row"
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    title: {},
    right: {
        textAlign: "right"
    },
    label: {
        margin: theme.spacing(1)
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    }
}));
