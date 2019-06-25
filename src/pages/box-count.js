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
    }
}));


export default function BoxCount() {
    const classes = useStyles();


    const [model, setModel] = useState({
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
        ]
    });

    const [ui, setUi] = useState({
        ballotBundleTypes: [
            {"names": "normal", "title": "Ballot Bundles"},
            {"names": "tender", "title": "Tender allot Bundles"}
        ],
        electoralDistricts: [],
        pollingDivisions: [],
        pollingDistricts: [],
        pollingStations: []
    });

    useEffect(() => {
        const fetchData = async () => {

            setUi({
                ...ui,
                electoralDistricts: await services.electorates.electoralDistricts.getAll(),
                pollingDivisions: await services.electorates.pollingDivisions.getAll(model.electoralDistrictId),
                pollingDistricts: await services.electorates.pollingDistricts.getAll(model.electoralDistrictId, model.pollingDivisionId),
                pollingStations: await services.electorates.pollingStations.getAll(model.electoralDistrictId, model.pollingDivisionId, model.pollingDistrictId)
            })
        }

        fetchData()
    }, [model.electoralDistrictId, model.pollingDivisionId, model.pollingDistrictId]);


    const actions = {
        electoralDistrictId: () => e => {
            const electoralDistrictId = e.target.value;
            setModel({
                ...model,
                electoralDistrictId: electoralDistrictId,
                pollingDivisionId: "",
                pollingDistrictId: "",
                pollingStationId: ""
            })
        },
        pollingDivisionId: () => async e => {
            const pollingStationId = e.target.value;
            const pollingStation = await services.electorates.pollingDivisions.getById(pollingStationId);
            setModel({
                ...model,
                electoralDistrictId: pollingStation.electoralDistrictId,
                pollingDivisionId: pollingStation.pollingDivisionId,
                pollingDistrictId: "",
                pollingStationId: ""
            })
        },
        pollingDistrictId: () => async e => {
            const pollingStationId = e.target.value;
            const pollingStation = await services.electorates.pollingDistricts.getById(pollingStationId);
            setModel({
                ...model,
                electoralDistrictId: pollingStation.electoralDistrictId,
                pollingDivisionId: pollingStation.pollingDivisionId,
                pollingDistrictId: pollingStation.pollingDistrictId,
                pollingStationId: ""
            })
        },
        pollingStationId: () => async e => {
            const pollingStationId = e.target.value;
            const pollingStation = await services.electorates.pollingStations.getById(pollingStationId);
            setModel({
                ...model,
                electoralDistrictId: pollingStation.electoralDistrictId,
                pollingDivisionId: pollingStation.pollingDivisionId,
                pollingDistrictId: pollingStation.pollingDistrictId,
                pollingStationId: pollingStation.pollingStationId
            })
        },
        boxes: {
            edit: (boxIndex) => e => {
                setModel({
                    ...model,
                    boxes: model.boxes.slice(0, boxIndex)
                        .concat([parseInt(e.target.value)])
                        .concat(model.boxes.slice(boxIndex + 1))
                })
            },
            add: () => e => {
                setModel({
                    ...model,
                    boxes: [
                        ...model.boxes,
                        undefined
                    ]
                })
            }
        },
        ballotBundles: {
            from: {
                edit: (boxIndex) => e => {
                    setModel({
                        ...model,
                        ballotBundles: model.ballotBundles.slice(0, boxIndex)
                            .concat([{
                                ...model.ballotBundles[boxIndex],
                                from: e.target.value.trim()
                            }])
                            .concat(model.ballotBundles.slice(boxIndex + 1))
                    })
                },
            },
            to: {
                edit: (boxIndex) => e => {
                    setModel({
                        ...model,
                        ballotBundles: model.ballotBundles.slice(0, boxIndex)
                            .concat([{
                                ...model.ballotBundles[boxIndex],
                                to: parseInt(e.target.value)
                            }])
                            .concat(model.ballotBundles.slice(boxIndex + 1))
                    })
                },
            },
            count: (bundleIndex) => {
                const ballotBundle = model.ballotBundles[bundleIndex]

                // TODO

                if (ballotBundle.from === undefined || ballotBundle.from === null || ballotBundle.from === "") {
                    return 0
                } else if (ballotBundle.to === undefined || ballotBundle.to === null || ballotBundle.to === "") {
                    return 0
                } else {
                    try {
                        const count = parseInt(ballotBundle.to) - parseInt(ballotBundle.from)
                        return count;
                    } catch (error) {
                        return 0
                    }
                }
            },
            add: () => e => {
                setModel({
                    ...model,
                    ballotBundles: [
                        ...model.ballotBundles,
                        {from: undefined, to: undefined}
                    ]
                })
            }
        }
    };


    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>
                <Typography variant="h5" gutterBottom>
                    Issuing at the Counting Centre.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    This is to be filled at the counting centre when the ballot boxes and bunles being handed over to
                    senior perciding officers.
                </Typography>
            </div>

            <div className={classes.section}>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Electoral District
                    </InputLabel>
                    <Select
                        native
                        value={model.electoralDistrictId}
                        onChange={actions.electoralDistrictId()}
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
                        {ui.electoralDistricts.map((electoralDistrict, electoralDistrictIndex) => {
                            return <option value={electoralDistrict.electoralDistrictId} key={electoralDistrictIndex}>
                                {electoralDistrict.name}
                            </option>
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Polling Division
                    </InputLabel>
                    <Select
                        native
                        value={model.pollingDivisionId}
                        onChange={actions.pollingDivisionId()}
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
                        {ui.pollingDivisions.map((pollingDivision, pollingDivisionIndex) => {
                            return <option value={pollingDivision.pollingDivisionId} key={pollingDivisionIndex}>
                                {pollingDivision.name}
                            </option>
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Polling District
                    </InputLabel>
                    <Select
                        native
                        value={model.pollingDistrictId}
                        onChange={actions.pollingDistrictId()}
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
                        {ui.pollingDistricts.map((pollingDistrict, pollingDistrictIndex) => {
                            return <option value={pollingDistrict.pollingDistrictId} key={pollingDistrictIndex}>
                                {pollingDistrict.name}
                            </option>
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Polling Station
                    </InputLabel>
                    <Select
                        native
                        value={model.pollingStationId}
                        onChange={actions.pollingStationId()}
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
                        {ui.pollingStations.map((pollingStation, pollingStationIndex) => {
                            return <option value={pollingStation.pollingStationId} key={pollingStationIndex}>
                                {pollingStation.name}
                            </option>
                        })}
                    </Select>
                </FormControl>

            </div>

            <div className={classes.section}>
                <Typography variant="h6" gutterBottom>
                    Ballot Boxes
                </Typography>
                {model.boxes.map((boxId, boxIndex) => {
                    return <TextField
                        key={`ballot-box-${boxIndex}`}
                        id="outlined-dense"
                        label="Box ID"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                        value={model.boxes[boxIndex]}
                        onChange={actions.boxes.edit(boxIndex)}
                    />
                })}

                <Button
                    size="small" variant="contained" className={classes.button}
                    onClick={actions.boxes.add()}
                >
                    Add
                </Button>
            </div>


            {ui.ballotBundleTypes.map((ballotBundleType, ballotBundleTypeIndex) => {
                return <div className={classes.section} key={ballotBundleTypeIndex}>
                    <Typography variant="h6" gutterBottom>
                        Ballot Bundles
                    </Typography>

                    {model.ballotBundles.map((ballotBundle, ballotBundleIndex) => {
                        return <div className={classes.sectionRow} key={ballotBundleIndex}>
                            <TextField
                                id="outlined-dense"
                                label="From"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={ballotBundle.from}
                                onChange={actions.ballotBundles.from.edit(ballotBundleIndex)}
                            />
                            <TextField
                                id="outlined-dense"
                                label="To"
                                className={clsx(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                value={ballotBundle.to}
                                onChange={actions.ballotBundles.to.edit(ballotBundleIndex)}
                            />
                            <TextField
                                id="outlined-dense"
                                label="Ballot Count"
                                className={clsx(classes.textField)}
                                margin="dense"
                                value={0}
                                InputProps={{
                                    readOnly: true,
                                    disableUnderline: true,
                                }}
                                inputProps={{
                                    tabIndex: "-1"
                                }}
                                value={actions.ballotBundles.count(ballotBundleIndex)}
                            />
                        </div>
                    })}

                    <Button size="small" variant="contained" className={classes.button}>
                        Add
                    </Button>
                </div>
            })}


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