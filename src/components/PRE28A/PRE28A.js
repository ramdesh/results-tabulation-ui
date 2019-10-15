import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from '../../axios-base';
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

class PRE28A extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            open: false,
            areas: [],
            selectedDistrictCentre: '',
            selectedCountingCenter: '',
            selectedPollingStation: '',
            countingCenter: [],
            pollingStation: [],
            polling: 0
        };
    }

    handleClickOpen() {
        if (this.state.polling === 0) {
            alert("Please select the necessary fields !")
        } else {
            // axios.get('/area?limit=20&offset=0&areaType=DistrictCentre', {
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //         'Access-Control-Allow-Methods': 'GET',
            //         'Access-Control-Allow-Headers': 'Content-Type',
            //         'X-Requested-With': 'XMLHttpRequest'
            //     }
            // }).then(res => {
            //     console.log("Election" + res.data[0])
            //     this.setState({
            //         areas: res.data
            //     })
            // })
            //     .catch((error) => console.log(error));
            this.props.history.replace('/PRE28A-Entry/' + this.state.polling)
        }
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selectedDistrictCentre: event.target.value, name: event.target.name});
        console.log(event.target.value)
        axios.get('/area?limit=20&offset=0&parentareaId=' + event.target.value + '&areaType=CountingCentre', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                countingCenter: res.data
            })
        })
            .catch((error) => console.log(error));

    };

    handleCounting = event => {
        this.setState({selectedCountingCenter: event.target.value, name: event.target.name});
        axios.get('/area?limit=20&offset=0&parentareaId=' + event.target.value + '&areaType=PollingStation', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                pollingStation: res.data
            })
        })
            .catch((error) => console.log(error));

    };

    handlePolling = event => {
        this.setState({
            selectedPollingStation: event.target.value,
            name: event.target.name
        });

        this.setState({polling: event.target.value});

    };

    componentDidMount() {
        axios.get('/area?limit=20&offset=0&areaType=DistrictCentre', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                areas: res.data
            })
        })
            .catch((error) => console.log(error));
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Box Count ( PRE-28A )
                        </Typography>
                    </div>

                    <Grid container spacing={3} style={{marginBottom: '2%'}}>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    District Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedDistrictCentre}
                                        onChange={this.handleChange}>
                                    {this.state.areas.map((districtCentre, idx) => (
                                        <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    Counting Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedCountingCenter}
                                        onChange={this.handleCounting}>
                                    {this.state.countingCenter.map((countingCenter, idx) => (
                                        <MenuItem value={countingCenter.areaId}>{countingCenter.areaName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    Polling Station
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedPollingStation}
                                        onChange={this.handlePolling}>
                                    {this.state.pollingStation.map((pollingStation, idx) => (
                                        <MenuItem value={pollingStation.areaId}>{pollingStation.areaName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginLeft: '76%', marginTop: '4%'}}>
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

export default PRE28A;
