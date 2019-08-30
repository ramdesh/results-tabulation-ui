import React, {Component} from 'react'
import axios from '../../axios-base';
import {
    Typography,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    FormControl,
    InputLabel,
    Select,
    Button
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class ReportsEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickOpenPoll = this.handleClickOpenPoll.bind(this);
        this.handleClickOpenElectorate = this.handleClickOpenElectorate.bind(this);
        this.state = {

            open: false,
            allUsers: [],
            offices: [],
            pollingStation: [],
            electionDivision: [],
            selected: 'Select',
            selected1: 'Select',
            selected2: 'Select',
            selected3: 'Select',
            setOpen: false,
            report: [],
            reportPolling: [],
            reportDivision: [],
            value: 0

        };
    }

    handleClickOpen() {

        axios.post('/report/' + this.state.report + '/version')
            .then(res => {
                console.log(res);
                console.log(res.data.reportFile.urlInline);
                window.open(res.data.reportFile.urlInline, "_blank")
            });

        // window.open('newPageUrl', "https://dev.tabulation.ecdev.opensource.lk")


        this.setState({open: true});
    }

    handleClickOpenPoll() {

        axios.post('/report/' + this.state.reportPolling + '/version')
            .then(res => {
                console.log(res);
                console.log(res.data.reportFile.urlInline);
                window.open(res.data.reportFile.urlInline, "_blank")
            });

        // window.open('newPageUrl', "https://dev.tabulation.ecdev.opensource.lk")


        this.setState({open: true});
    }



    handleClickOpenElectorate() {

        axios.post('/report/' + this.state.reportDivision + '/version')
            .then(res => {
                console.log(res);
                console.log(res.data.reportFile.urlInline);
                window.open(res.data.reportFile.urlInline, "_blank")
            });

        // window.open('newPageUrl', "https://dev.tabulation.ecdev.opensource.lk")


        this.setState({open: true});
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});


        axios.get('/report?limit=20&offset=0&officeId='+ event.target.value+'&reportCode=PRE-41' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].reportId)
            this.setState({
                report: res.data[0].reportId
            })
        })
            .catch((error) => console.log(error));

    };

    handlePoll = event => {
        this.setState({selected1: event.target.value, name: event.target.name});


        axios.get('/report?limit=20&offset=0&officeId='+ event.target.value+'&reportCode=PRE-30-PD' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].reportId)
            this.setState({
                reportPolling: res.data[0].reportId
            })
        })
            .catch((error) => console.log(error));

    };

    handleDivision = event => {
        this.setState({selected2: event.target.value, name: event.target.name});


        axios.get('/report?limit=20&offset=0&officeId='+ event.target.value+'&reportCode=PRE-30-ED' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].reportId)
            this.setState({
                reportDivision: res.data[0].reportId
            })
        })
            .catch((error) => console.log(error));

    };


    componentDidMount() {
        console.log("Election Result Test")
        axios.get('/office?limit=20&offset=0&officeType=CountingCentre', {
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

        axios.get('/electorate?limit=20&offset=0&electorateType=PollingDivision', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                pollingStation: res.data
            })
        })
            .catch((error) => console.log(error));

        axios.get('/electorate?limit=20&offset=0&electorateType=ElectoralDistrict', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                electionDivision: res.data
            })
        })
            .catch((error) => console.log(error));
    }

    handleReport = event => {
        this.setState({selected1: event.target.value, name: event.target.name});

    };


    render() {
        return (
            <div style={{margin: '3%',marginRight:'8%'}}>
                <div>
                <div style={{marginBottom: '3%'}}>
                    <Typography variant="h5" gutterBottom>
                        Presidential Election 2019 - Reports
                    </Typography>

                </div>

                <Paper style={{margin: '3%'}}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                {/*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width:'40%',fontSize: 13,fontWeight: 'bold',}}>PRE 41</TableCell>
                                <TableCell style={{fontSize: 13}}>
                                    <FormControl variant="outlined" margin="dense">
                                        <InputLabel>
                                            Counting Center
                                        </InputLabel>
                                        <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                            {this.state.offices.map((CountingCenter, idx) => (
                                                <MenuItem value={CountingCenter.officeId}>{CountingCenter.officeName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpen}
                                            className="button">Generate</Button>
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 30 PD</TableCell>
                                <TableCell style={{fontSize: 13}}>
                                    <FormControl variant="outlined" margin="dense">
                                        <InputLabel>
                                            Polling Station
                                        </InputLabel>
                                        <Select className="width50" value={this.state.selected1} onChange={this.handlePoll}>
                                            {this.state.pollingStation.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.electorateId}>{districtCentre.electorateName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPoll}
                                            className="button">Generate</Button>
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 30 ED</TableCell>
                                <TableCell style={{fontSize: 13}}>
                                    <FormControl variant="outlined" margin="dense">
                                        <InputLabel>
                                            Electoral District
                                        </InputLabel>
                                        <Select className="width50" value={this.state.selected2} onChange={this.handleDivision}>
                                            {this.state.electionDivision.map((electralDivision, idx) => (
                                                <MenuItem value={electralDivision.electorateId}>{electralDivision.electorateName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenElectorate}
                                            className="button">Generate</Button>
                                </TableCell>
                            </TableRow>



                        </TableBody>
                    </Table>
                </Paper>
            </div>
            </div>



        )
    }
}

export default ReportsEntry;
