import React, {Component} from 'react'
import {
    Typography,
    Button,
    Breadcrumbs,
    Link, Paper, Table, TableHead, TableRow, TableBody, TableCell, FormControl, InputLabel, Select
} from '@material-ui/core';
import MenuItem from "@material-ui/core/MenuItem";
import axios from "../../axios-base";

class ReportsNew extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickOpen1 = this.handleClickOpen1.bind(this);

        this.state = {
            open: false,
            value: 0
        };
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleClickOpen (){
        this.props.history.replace('/Home')
    }

    handleClickOpen1 (){
        this.props.history.replace('/ReportsEntry')
    }

    componentDidMount() {
        console.log("Election Result Test")
        axios.get('/area?limit=1000&offset=0&areaType=CountingCentre', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                offices: res.data.sort(function (a,b) {
                    if (parseInt(a.areaName) > parseInt(b.areaName)) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            })
        })
            .catch((error) => console.log(error));

        axios.get('/area?limit=1000&offset=0&areaType=PollingDivision', {
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

        axios.get('/area?limit=1000&offset=0&areaType=ElectoralDistrict', {
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


    render() {
        return (
            <div style={{margin: '3%',marginRight:'8%'}}>

                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}} separator="/"
                                     aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                Home
                            </Link>
                            <Link color="inherit" href="/Main">
                                Presidential Election
                            </Link>
                            <Link color="inherit" >
                                Reports
                            </Link>

                            {/*<Typography color="textPrimary"></Typography>*/}
                        </Breadcrumbs>
                        <Typography variant="h5" gutterBottom>
                            Ordinary Votes Reports
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
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>CE 201</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selected1} onChange={this.handlePoll}>
                                                {this.state.pollingStation.map((districtCentre, idx) => (
                                                    <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
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
                                    <TableCell style={{width:'40%',fontSize: 13,fontWeight: 'bold',}}>PRE 41</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                                {this.state.offices.map((CountingCenter, idx) => (
                                                    <MenuItem value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
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
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selected1} onChange={this.handlePoll}>
                                                {this.state.pollingStation.map((districtCentre, idx) => (
                                                    <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
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
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 21</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selected1} onChange={this.handlePoll}>
                                                {this.state.pollingStation.map((districtCentre, idx) => (
                                                    <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPoll}
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

export default ReportsNew;
