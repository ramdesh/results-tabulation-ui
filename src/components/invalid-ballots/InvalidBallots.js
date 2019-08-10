import React, {Component} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {
    Typography,
    Button,
    FormControl,
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

export default function InvalidBallots() {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>

                <Typography variant="h5" gutterBottom>
                    Party-wise Ballot Counts
                </Typography>
                <Typography variant="body2" gutterBottom>
                    This is to be filled at the counting centre when the votes for each candidate is counted.
                    Please Select the District Centre and Counting Center at first.
                </Typography>
            </div>

            <div className={classes.section}>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        District Centre
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
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>Symbol</TableCell>
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>Name of Candidate</TableCell>
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>No of votes in words</TableCell>
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>No of votes in figures</TableCell>
                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>Agent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Elephant</TableCell>
                            <TableCell style={{fontSize:13}}>ABC Perera</TableCell>
                            <TableCell style={{fontSize:13}}>Seven Hundred and Fifty Thousand</TableCell>
                            <TableCell style={{fontSize:13}}>750 000</TableCell>
                            <TableCell style={{fontSize:13}}>Ryan Samuel</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontSize:13}}>Elephant</TableCell>
                            <TableCell style={{fontSize:13}}>ABC Perera</TableCell>
                            <TableCell style={{fontSize:13}}>Seven Hundred and Fifty Thousand</TableCell>
                            <TableCell style={{fontSize:13}}>750 000</TableCell>
                            <TableCell style={{fontSize:13}}>Ryan Samuel</TableCell>
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
