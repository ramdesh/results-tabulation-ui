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
    Button,
    Breadcrumbs,
    Link
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class ReportsEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenPRE41 = this.handleClickOpenPRE41.bind(this);
        this.handleClickPD30 = this.handleClickPD30.bind(this);
        this.handleClickOpenElectorate = this.handleClickOpenElectorate.bind(this);
        this.handleClickAllIsland = this.handleClickAllIsland.bind(this);

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
            reportId:0,
            reportversion: null,
            reportPolling: [],
            reportDivision: [],
            reportAllisland: [],
            value: 0

        };
    }

    // Handle click for PRE 41 Non Postal votes
    handleClickOpenPRE41() {

        if (this.state.reportversion == null) {

            alert('Report not Avialable')

        }else{
            axios.get('/tally-sheet/'+this.state.reportId+'/version/'+this.state.reportversion+'/html' , {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
                // this.setState({
                //     report: res.data[0].reportId
                // })
            })
                .catch((error) => console.log(error));



            window.open('https://dev.tabulation.ecdev.opensource.lk/tally-sheet/'+this.state.reportId+'/version/'+this.state.reportversion+'/html', "_blank");
        }




        this.setState({open: true});
    }

    // handle click for PRE 30 PD Non-postal votes
    handleClickPD30() {

        axios.post('/tally-sheet/PRE-30-PD/'+this.state.reportPolling+'/version')
            .then(res => {
                console.log(res);
                console.log(res.data.htmlUrl);
                window.open(res.data.htmlUrl, "_blank")
            });

        // window.open('newPageUrl', "https://dev.tabulation.ecdev.opensource.lk")


        this.setState({open: true});
    }



    handleClickOpenElectorate() {

        axios.post('/tally-sheet/PRE-30-ED/'+this.state.reportDivision+'/version')
            .then(res => {
                console.log(res);
                console.log(res.data.htmlUrl);
                window.open(res.data.htmlUrl, "_blank")
            });

        // window.open('newPageUrl', "https://dev.tabulation.ecdev.opensource.lk")


        this.setState({open: true});
    }

    handleClickAllIsland() {
        axios.get('/tally-sheet?limit=20&offset=0&tallySheetCode=PRE_ALL_ISLAND_RESULTS' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)

            axios.post('/tally-sheet/PRE_ALL_ISLAND_RESULTS/'+res.data[0].tallySheetId+'/version',{timeout:4000})
                .then(res => {
                    console.log(res);
                    console.log(res.data.htmlUrl);
                    window.open(res.data.htmlUrl, "_blank")
                });
        })
            .catch((error) => console.log(error));



        this.setState({open: true});
    }

    handleClickAllIslandED() {
        axios.get('/tally-sheet?limit=20&offset=0&tallySheetCode=PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)

            axios.post('/tally-sheet/PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS/'+res.data[0].tallySheetId+'/version',{timeout:4000})
                .then(res => {
                    console.log(res);
                    console.log(res.data.htmlUrl);
                    window.open(res.data.htmlUrl, "_blank")
                });
        })
            .catch((error) => console.log(error));



        // this.setState({open: true});
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    // Report handling for PRE 41  Non postal votel
    handleChangePRE41 = event => {
        this.setState({selected: event.target.value, name: event.target.name});

        console.log("PRE41 Counting "+event.target.value)

        this.setState({
            reportId: event.target.value
        })

        axios.get('/tally-sheet?limit=20&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-41' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log(res.data[0].latestVersionId)
            this.setState({
                reportversion: res.data[0].latestVersionId
            })
        })
            .catch((error) => console.log(error));



    };
   // Event for PRE 30 PD
    PD30 = event => {
        this.setState({selected1: event.target.value, name: event.target.name});


        axios.get('/tally-sheet?limit=1000&offset=0&officeId='+event.target.value+'&tallySheetCode=PRE-30-PD' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                reportPolling: res.data[0].tallySheetId
            })
        })
            .catch((error) => console.log(error));

    };

    handleDivision = event => {
        this.setState({selected2: event.target.value, name: event.target.name});


        axios.get('/tally-sheet?limit=1000&offset=0&officeId='+event.target.value+'&tallySheetCode=PRE-30-ED' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                reportDivision: res.data[0].tallySheetId
            })
        })
            .catch((error) => console.log(error));

    };


    componentDidMount() {
        console.log("Election Result Test")
        axios.get('/area?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&areaType=CountingCentre', {
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

    handleReport = event => {
        this.setState({selected1: event.target.value, name: event.target.name});

    };




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
                                        <Select className="width50" value={this.state.selected} onChange={this.handleChangePRE41}>
                                            {this.state.offices.map((CountingCenter, idx) => (
                                                <MenuItem value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE41}
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
                                        <Select className="width50" value={this.state.selected1} onChange={this.PD30}>
                                            {this.state.pollingStation.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickPD30}
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



                {/*<div>*/}
                    {/*<div style={{marginBottom: '3%'}}>*/}
                        {/*<Typography variant="h5" gutterBottom>*/}
                            {/*Postal Votes Reports*/}
                        {/*</Typography>*/}

                    {/*</div>*/}

                    {/*<Paper style={{margin: '3%'}}>*/}
                        {/*<Table >*/}
                            {/*<TableHead>*/}
                                {/*<TableRow>*/}
                                    {/*/!*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*!/*/}
                                {/*</TableRow>*/}
                            {/*</TableHead>*/}
                            {/*<TableBody>*/}

                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>CE 201 PV</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<FormControl variant="outlined" margin="dense">*/}
                                            {/*<InputLabel>*/}
                                                {/*Polling Division*/}
                                            {/*</InputLabel>*/}
                                            {/*<Select className="width50" value={this.state.selected1} onChange={this.handlePoll}>*/}
                                                {/*{this.state.pollingStation.map((districtCentre, idx) => (*/}
                                                    {/*<MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>*/}
                                                {/*))}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPoll}*/}
                                                {/*className="button">Generate</Button>*/}
                                    {/*</TableCell>*/}

                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{width:'40%',fontSize: 13,fontWeight: 'bold',}}>PRE 41 PV</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<FormControl variant="outlined" margin="dense">*/}
                                            {/*<InputLabel>*/}
                                                {/*Counting Center*/}
                                            {/*</InputLabel>*/}
                                            {/*<Select className="width50" value={this.state.selected} onChange={this.handleChange}>*/}
                                                {/*{this.state.offices.map((CountingCenter, idx) => (*/}
                                                    {/*<MenuItem value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>*/}
                                                {/*))}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpen}*/}
                                                {/*className="button">Generate</Button>*/}
                                    {/*</TableCell>*/}

                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 21 PV</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<FormControl variant="outlined" margin="dense">*/}
                                            {/*<InputLabel>*/}
                                                {/*Polling Division*/}
                                            {/*</InputLabel>*/}
                                            {/*<Select className="width50" value={this.state.selected1} onChange={this.handlePoll}>*/}
                                                {/*{this.state.pollingStation.map((districtCentre, idx) => (*/}
                                                    {/*<MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>*/}
                                                {/*))}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPoll}*/}
                                                {/*className="button">Generate</Button>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 30 PV</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<FormControl variant="outlined" margin="dense">*/}
                                            {/*<InputLabel>*/}
                                                {/*Electoral District*/}
                                            {/*</InputLabel>*/}
                                            {/*<Select className="width50" value={this.state.selected2} onChange={this.handleDivision}>*/}
                                                {/*{this.state.electionDivision.map((electralDivision, idx) => (*/}
                                                    {/*<MenuItem value={electralDivision.areaId}>{electralDivision.areaName}</MenuItem>*/}
                                                {/*))}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenElectorate}*/}
                                                {/*className="button">Generate</Button>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}

                            {/*</TableBody>*/}
                        {/*</Table>*/}
                    {/*</Paper>*/}
                {/*</div>*/}


                {/*<div>*/}
                    {/*<div style={{marginBottom: '3%'}}>*/}
                        {/*<Typography variant="h5" gutterBottom>*/}
                            {/*Overall Reports*/}
                        {/*</Typography>*/}

                    {/*</div>*/}

                    {/*<Paper style={{margin: '3%'}}>*/}
                        {/*<Table >*/}
                            {/*<TableHead>*/}
                                {/*<TableRow>*/}
                                    {/*/!*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*!/*/}
                                {/*</TableRow>*/}
                            {/*</TableHead>*/}
                            {/*<TableBody>*/}

                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>All Island</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickAllIsland}*/}
                                                {/*className="button">Generate</Button>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}

                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>All Island ED</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickAllIslandED}*/}
                                                {/*className="button1">Generate</Button>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}

                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 30 ED</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<FormControl variant="outlined" margin="dense">*/}
                                            {/*<InputLabel>*/}
                                                {/*Electoral District*/}
                                            {/*</InputLabel>*/}
                                            {/*<Select className="width50" value={this.state.selected2} onChange={this.handleDivision}>*/}
                                                {/*{this.state.electionDivision.map((electralDivision, idx) => (*/}
                                                    {/*<MenuItem value={electralDivision.areaId}>{electralDivision.areaName}</MenuItem>*/}
                                                {/*))}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell>*/}
                                        {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenElectorate}*/}
                                                {/*className="button">Generate</Button>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}

                            {/*</TableBody>*/}
                        {/*</Table>*/}
                    {/*</Paper>*/}
                {/*</div>*/}


            </div>



        )
    }
}

export default ReportsEntry;
