import React, {Component} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    FilledInput,
    OutlinedInput,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper
} from '@material-ui/core';

import services from '../services'

import {useState, useEffect} from 'react';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: 10
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

export default function Pre41() {
    const classes = useStyles();


    const [model, setModel] = useState({
        code: "PRE-41",
        createdAt: "",
        createdBy: "",
        electionId: "1",
        districtCentreId: "",
        countingCentreId: "",
        officeId: "",
        version: "",
        partyWiseResults: [
            {partyId: "1", symbol: "", candidateName: "", voteCount: undefined, voteCountInWords: "", agent: ""},
            {partyId: "2", symbol: "", candidateName: "", voteCount: undefined, voteCountInWords: "", agent: ""},
            {partyId: "3", symbol: "", candidateName: "", voteCount: undefined, voteCountInWords: "", agent: ""},
            {partyId: "4", symbol: "", candidateName: "", voteCount: undefined, voteCountInWords: "", agent: ""},
            {partyId: "5", symbol: "", candidateName: "", voteCount: undefined, voteCountInWords: "", agent: ""},
            {partyId: "6", symbol: "", candidateName: "", voteCount: undefined, voteCountInWords: "", agent: ""},
        ],

        //OLD STUFF
        tallySheetVersionId: 0,
        electoralDistrictId: "",
        pollingDivisionId: "",
        pollingDistrictId: "",
        pollingStationId: "",
        boxes: [undefined, undefined, undefined],
        ballotBundles: [
            {from: undefined, to: undefined, type: "normal"},
            {from: undefined, to: undefined, type: "normal"},
            {from: undefined, to: undefined, type: "normal"},
            {from: undefined, to: undefined, type: "tender"},
            {from: undefined, to: undefined, type: "tender"},
            {from: undefined, to: undefined, type: "tender"}
        ],
    });

    const [ui, setUi] = useState({

        districtCentres: [],
        countingCentres: [],
        elections: [],
        parties: [],
        candidates: []
    });

    useEffect(() => {
        const fetchData = async () => {

            setUi({
                ...ui,
                districtCentres: await services.centres.districtCentres.getAll(),
                countingCentres: await services.centres.countingCentres.getAll(model.districtCentreId),
                candidates: await services.elections.candidates.getAll(model.electionId),

            })
        }

        fetchData()
    }, [model.districtCentreId, model.countingCentreId]);


    const actions = {

        districtCentreId: () => e => {
            const districtCentreId = e.target.value;
            setModel({
                ...model,
                districtCentreId: districtCentreId,
                countingCentreId: ""
            })
        },
        countingCentreId: () => async e => {
            const countingCentreId = e.target.value;
            const countingCentre = await services.centres.countingCentres.getById(countingCentreId);
            setModel({
                ...model,
                districtCentreId: countingCentre.districtCentreId,
                countingCentreId: countingCentre.countingCentreId
            })
        },
        partyWiseResults: {
            voteCountInWords: {
                edit: (candidateIndex) => e => {
                    setModel({
                        ...model,
                        partyWiseResults: model.partyWiseResults.slice(0, candidateIndex)
                            .concat([{
                                ...model.partyWiseResults[candidateIndex],
                                voteCountInWords: e.target.value.trim()
                            }])
                            .concat(model.partyWiseResults.slice(candidateIndex + 1))
                    })
                },
            },
            voteCount: {
                edit: (candidateIndex) => e => {
                    setModel({
                        ...model,
                        partyWiseResults: model.partyWiseResults.slice(0, candidateIndex)
                            .concat([{
                                ...model.partyWiseResults[candidateIndex],
                                voteCount: e.target.value.trim()
                            }])
                            .concat(model.partyWiseResults.slice(candidateIndex + 1))
                    })
                },
            },
            agent: {
                edit: (candidateIndex) => e => {
                    setModel({
                        ...model,
                        partyWiseResults: model.partyWiseResults.slice(0, candidateIndex)
                            .concat([{
                                ...model.partyWiseResults[candidateIndex],
                                agent: e.target.value.trim()
                            }])
                            .concat(model.partyWiseResults.slice(candidateIndex + 1))
                    })
                },
            },
         }
    };


    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>
                <Typography variant="h5" gutterBottom>
                    Counting at the Counting Centre
                </Typography>
                <Typography variant="body2" gutterBottom>
                    This is to be filled at the counting centre when the votes for each candidate is counted.
                </Typography>
            </div>

            <div className={classes.section}>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        District Centre
                    </InputLabel>
                    <Select
                        native
                        value={model.districtCentreId}
                        onChange={actions.districtCentreId()}
                        input={
                            <OutlinedInput
                                name="age"
                                margin="dense"
                                labelWidth={130}
                                id="outlined-age-native-simple"
                            />
                        }
                    >
                        <option value=""/>
                        {ui.districtCentres.map((districtCentre, districtCentreIndex) => {
                            return <option value={districtCentre.districtCentreId} key={districtCentreIndex}>
                                {districtCentre.name}
                            </option>
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Counting Centre
                    </InputLabel>
                    <Select
                        native
                        value={model.countingCentreId}
                        onChange={actions.countingCentreId()}
                        input={
                            <OutlinedInput
                                name="age"
                                margin="dense"
                                labelWidth={130}
                                id="outlined-age-native-simple"
                            />
                        }
                    >
                        <option value=""/>
                        {ui.countingCentres.map((countingCentre, countingCentreIndex) => {
                            return <option value={countingCentre.countingCentreId} key={countingCentreIndex}>
                                {countingCentre.name}
                            </option>
                        })}
                    </Select>
                </FormControl>

            </div>

            <Paper className={classes.root}>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Name of Candidate</TableCell>
                            <TableCell>No. of votes in words</TableCell>
                            <TableCell>No. of votes in figures</TableCell>
                            <TableCell>Agent</TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>

                    {ui.candidates.map((candidate, candidateIndex) => {
                        return <TableRow key={candidateIndex}>
                            <TableCell>{candidate.symbol}</TableCell>
                            <TableCell>{candidate.candidateName}</TableCell>

                             <TableCell><TextField
                                id="outlined-dense"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={model.partyWiseResults.voteCountInWords}
                                onChange={actions.partyWiseResults.voteCountInWords.edit(candidateIndex)}
                            /></TableCell>
                            <TableCell><TextField
                                id="outlined-dense"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={model.partyWiseResults.voteCount}
                                onChange={actions.partyWiseResults.voteCount.edit(candidateIndex)}
                            /></TableCell>
                            <TableCell><TextField
                                id="outlined-dense"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={model.partyWiseResults.agent}
                                onChange={actions.partyWiseResults.agent.edit(candidateIndex)}
                            /></TableCell>
                         </TableRow>
                    })}
                    </TableBody>
                    </Table>
                </Paper>



            <div className={clsx(classes.section, classes.right)}>
                <Button variant="contained" className={classes.button}>
                    Save
                </Button>
                <Button variant="contained" className={classes.button} color="primary">
                    Submit
                </Button>
            </div>
        </form>
    );
}