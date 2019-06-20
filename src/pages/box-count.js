import React, {Component} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {Typography, Button, TextField} from '@material-ui/core';


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

export default function OutlinedTextFields() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
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
                <Typography variant="h6" gutterBottom>
                    Ballot Boxes
                </Typography>
                <TextField
                    id="outlined-dense"
                    label="Dense"
                    className={clsx(classes.textField)}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-dense"
                    label="Dense"
                    className={clsx(classes.textField)}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-dense"
                    label="Dense"
                    className={clsx(classes.textField)}
                    margin="dense"
                    variant="outlined"
                />

                <Button size="small" variant="contained" className={classes.button}>
                    Add
                </Button>
            </div>
            <div className={classes.section}>
                <Typography variant="h6" gutterBottom>
                    Ballot Bundles
                </Typography>

                <div className={classes.sectionRow}>
                    <TextField
                        id="outlined-dense"
                        label="From"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-dense"
                        label="To"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-dense"
                        label="Ballot Count"
                        className={clsx(classes.textField)}
                        margin="dense"
                        value={0}
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true
                        }}
                    />
                </div>

                <div className={classes.sectionRow}>
                    <TextField
                        id="outlined-dense"
                        label="From"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-dense"
                        label="To"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-dense"
                        label="Ballot Count"
                        className={clsx(classes.textField)}
                        margin="dense"
                        value={0}
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true
                        }}
                    />
                </div>

                <div className={classes.sectionRow}>
                    <TextField
                        id="outlined-dense"
                        label="From"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-dense"
                        label="To"
                        className={clsx(classes.textField)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-dense"
                        label="Ballot Count"
                        className={clsx(classes.textField)}
                        margin="dense"
                        value={0}
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true
                        }}
                    />
                </div>

                <Button size="small" variant="contained" className={classes.button}>
                    Add
                </Button>
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