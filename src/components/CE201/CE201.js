import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from '../../axios-base';
import {
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    Breadcrumbs,
    Link
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

class CE201 extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            open: false,
            selectedDistrictCentre: '',
            selectedPollingDivision: '',
            selectedCountingCenter: '',
            districtCentres: [],
            countingCenter: [],
            PollingDivision:[],
            polling: 0,

            /** url params **/
            countingId: 0,
            countingName: 0,
            tallySheetId:0
        };
    }

    handleBack() {
        this.props.history.replace('/Home')
    }

    handleClickOpen() {
        if (this.state.selectedCountingCenter === '') {
            alert("Please select the necessary fields !")
        } else {
            axios.get('/tally-sheet?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&areaId='+this.state.countingId+'&tallySheetCode=CE-201', {

                headers: {
                    'Authorization': "Bearer "+localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                // console.log("Election ID :" + res.data[0])
                if (res.data.length === 0) {
                    alert("No TallySheets Allocated for here !")
                } else {
                    this.setState({
                        tallySheetId: res.data[0].tallySheetId
                    })
                    console.log("ID :" + res.data[0].tallySheetId)
                    this.props.history.replace('/CE201-Entry/' + this.state.tallySheetId + '/'+ this.state.countingName+ '/'+ this.state.countingId)
                }
            })
                .catch((error) => console.log(error));
        }
    }

    /** District Centre **/
    handleChange = event => {
        this.setState({selectedDistrictCentre: event.target.value, name: event.target.name});
        console.log("District Centre :"+event.target.value)
        axios.get('/area?limit=20&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&associatedAreaId='+event.target.value+'&areaType=PollingDivision', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                PollingDivision: res.data
            })

        })
            .catch((error) => console.log(error));
    };

    /** Polling Division **/
    handlePollingDivision = event => {
        this.setState({selectedPollingDivision: event.target.value, name: event.target.name});
        console.log(event.target.value)
        axios.get('/area?limit=20&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&associatedAreaId='+event.target.value+'&areaType=CountingCentre', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                countingCenter: res.data.sort(function (a,b) {
                    if (parseInt(a.areaName) > parseInt(b.areaName)) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            })
        })
            .catch((error) => console.log(error));
    };

    /** Counting Centre **/
    handleCounting = event => {
        // set the counting center name
        this.setState({
            selectedCountingCenter: event.target.value,
            countingId: event.target.value,
            name: event.target.name
        });

        this.setState({countingName: event.target.value});
        console.log("Counting ID" + event.target.value)

        /** get the areaId by areaName **/
        // axios.get('/area?limit=1000&offset=0&areaName=' + event.target.value + '&areaType=CountingCentre', {
        //     headers: {
        //         'Authorization': "Bearer "+localStorage.getItem('token'),
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'GET',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        //         'X-Requested-With': 'XMLHttpRequest'
        //     }
        // }).then(res => {
        //     console.log("Counting Center Id" + res.data[0].areaId)
        //     this.setState({
        //         countingId: res.data[0].areaId
        //     })
        // })
        //     .catch((error) => console.log(error));

    };

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    componentDidMount() {
        axios.get('/area?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&areaType=DistrictCentre', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                districtCentres: res.data
            })
        })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '4%'}}>

                        <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}} separator="/"
                                     aria-label="breadcrumb">
                            <Link color="inherit" href="/Election">
                                Home
                            </Link>
                            <Link color="inherit" href="/Main">
                                Presidential Election
                            </Link>
                            <Link color="inherit" href="/Home">
                                Data Entry
                            </Link>
                            <Link color="inherit">
                                Votes - CE 201
                            </Link>
                            {/*<Typography color="textPrimary"></Typography>*/}
                        </Breadcrumbs>


                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          CE - 201
                        </Typography>
                    </div>

                    <Grid container spacing={3} style={{marginBottom: '2%'}}>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel style={{marginLeft: '-5%'}}>
                                    District Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedDistrictCentre}
                                        onChange={this.handleChange}>
                                    {this.state.districtCentres.map((districtCentre, idx) => (
                                        <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel style={{marginLeft: '-5%'}}>
                                    Polling Division
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedPollingDivision}
                                        onChange={this.handlePollingDivision}>
                                    {this.state.PollingDivision.map((pollingDivision, idx) => (
                                        <MenuItem value={pollingDivision.areaId}>{pollingDivision.areaName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel style={{marginLeft: '-5%'}}>
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

                    </Grid>
                </div>

                <div style={{marginLeft: '76%', marginTop: '4%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
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

export default CE201;
