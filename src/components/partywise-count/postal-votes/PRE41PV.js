import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from '../../../axios-base';
import {
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    Breadcrumbs,
    Link
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class PRE41PV extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            selectedDistrictCentre: '',
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
        this.props.history.goBack()
    }

    /** PRE41 Postal **/
    handleClickOpen() {
        if (this.state.selectedCountingCenter === '') {
            alert("Please select the necessary fields !")
        } else {
            axios.get('/tally-sheet?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&areaId='+this.state.countingId+'&tallySheetCode=PRE-41', {
                headers: {
                    'Authorization': "Bearer "+localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                if (res.data.length === 0) {
                    alert("No TallySheets Allocated for here !")
                } else if (res.data[0].locked){
                    // alert("Already Locked Tally Sheet !")
                    console.log("locked - passed the lockedVersionId")
                    this.setState({
                        tallySheetId: res.data[0].tallySheetId
                    })
                    // console.log("ID :" + res.data[0].tallySheetId)
                    this.props.history.push('/PRE41Report/' + this.state.tallySheetId + '/'+ res.data[0].lockedVersionId)

                }else{
                    this.setState({
                        tallySheetId: res.data[0].tallySheetId
                    })
                    console.log("ID :" + res.data[0].tallySheetId)
                    this.props.history.push('/PRE41Entry/' + this.state.tallySheetId + '/'+ this.state.countingId)
                }
            })
                .catch((error) => console.log(error));
        }
    }

    /** District Centre **/
    handleChange = event => {
        this.setState({selectedDistrictCentre: event.target.value, name: event.target.name});
        console.log("Electoral District :"+event.target.value)
        axios.get('/area?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&associatedAreaId='+event.target.value+'&areaType=CountingCentre', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].areaName)
            this.setState({
                PollingDivision: res.data
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

    };

    componentDidMount() {
        axios.get('/area?limit=1000&offset=0&areaType=ElectoralDistrict', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
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
                                Postal Votes - PRE 41
                            </Link>
                        </Breadcrumbs>


                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            PRE 41 : Postal Votes
                        </Typography>
                    </div>

                    <Grid container spacing={3} style={{marginBottom: '2%'}}>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel style={{marginLeft: '-5%'}}>
                                    Electoral District
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
                                    Counting Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedCountingCenter}
                                        onChange={this.handleCounting}>
                                    {this.state.PollingDivision.map((countingCenter, idx) => (
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

            </div>
        )
    }
}

export default PRE41PV;
