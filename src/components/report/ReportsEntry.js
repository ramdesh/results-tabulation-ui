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
        this.state = {

            open: false,
            allUsers: [],
            offices: [],
            selected: 'Select',
            selected1: 'Select',
            setOpen: false,
            report: [],
            value: 0

        };
    }

    handleClickOpen() {
        axios.post('/report/' + this.state.value + '/version')
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

        axios.get('/report?limit=20&offset=0&officeId=' + event.target.value, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                report: res.data
            })
        })
            .catch((error) => console.log(error));

    };


    componentDidMount() {
        console.log("Election Result Test")
        axios.get('/office?limit=20&offset=0&electionId=1', {
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

    handleReport = event => {
        this.setState({selected1: event.target.value, name: event.target.name});
        this.setState({value: event.target.value});
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
                                        <Select className="width50" value={this.state.selectedDistrictCentre} onChange={this.handleChange}>
                                            {this.state.offices.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.officeId}>{districtCentre.officeName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
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
                                        <Select className="width50" value={this.state.selectedDistrictCentre} onChange={this.handleChange}>
                                            {this.state.offices.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.officeId}>{districtCentre.officeName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
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
                                        <Select className="width50" value={this.state.selectedDistrictCentre} onChange={this.handleChange}>
                                            {this.state.offices.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.officeId}>{districtCentre.officeName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
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
