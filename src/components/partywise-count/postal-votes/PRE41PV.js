import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

class PRE41PV extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            open: false,
            allUsers: [],
            offices: [],
            selected: 'Select',
            setOpen: false
        };
    }

    handleClickOpen() {
        this.props.history.replace('/PRE41PV-Entry')
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };

    componentDidMount() {
        console.log("Election Result Test")
        axios.get('https://cors-anywhere.herokuapp.com/https://dev.tabulation.ecdev.opensource.lk/office?limit=20&offset=0&electionId=1', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                offices: res.data
            })
        })
            .catch((error) => console.log(error));
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Presidential Election 2019 - Party-Wise Count ( PRE-41 ) : Postal Votes
                        </Typography>

                    </div>

                    <Grid container spacing={3} style={{marginBottom: '2%'}}>
                        <Grid item xs={4} sm={2}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    District Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                    {this.state.offices.map((office, idx) => (
                                        <MenuItem value={office.officeName}>{office.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    Counting Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                    {this.state.offices.map((day1, idx) => (
                                        <MenuItem value={day1.officeName}>{day1.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    Polling Station
                                </InputLabel>
                                <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                    {this.state.offices.map((day1, idx) => (
                                        <MenuItem value={day1.officeName}>{day1.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginLeft: '80%', marginTop: '2%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpen}
                            className="button">Next</Button>
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Invalid Ballot Count Confirmation "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you that all the necessary data entered correctly ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default PRE41PV;
