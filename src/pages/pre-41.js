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
    OutlinedInput
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
    td: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    th: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));


export default function BoxCount() {
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

            <div className={classes.section}>

                    <div className={classes.sectionRow}>
                        <table>
                        <tbody>
                            <tr align="center">
                                <th>Symbol</th>
                                <th>Name of Candidate</th>
                                <th>No. of votes in words</th>
                                <th>No. of votes in figures</th>
                                <th>Agent</th>
                             </tr>

                    {ui.candidates.map((candidate, candidateIndex) => {
                        return <tr><td>

                            <label>{candidate.symbol}</label></td>
                            <td><label>{candidate.candidateName}</label></td>

                            <td><TextField
                                id="outlined-dense"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={""}
                            /></td>
                            <td><TextField
                                id="outlined-dense"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={""}
                            /></td>
                            <td><TextField
                                id="outlined-dense"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={""}
                            /></td>
                            </tr>
                    })}
                    </tbody>
                    </table>
                    </div>
                </div>



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