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
        this.handleClickOpenPRE21 = this.handleClickOpenPRE21.bind(this);
        this.handleClickOpenCE201 = this.handleClickOpenCE201.bind(this);
        this.handleClickOpenElectorate = this.handleClickOpenElectorate.bind(this);
        this.handleClickOpenPRE30Pv = this.handleClickOpenPRE30Pv.bind(this);
        this.handleClickOpenPRE21pv = this.handleClickOpenPRE21pv.bind(this);
        this.handleClickOpenPRE41Pv = this.handleClickOpenPRE41Pv.bind(this);
        this.handleClickAllIsland = this.handleClickAllIsland.bind(this);

        this.state = {

            open: false,
            allUsers: [],
            offices: [],
            officespv:[],
            pollingStation: [],
            pollingStationpv:[],
            electionDivision: [],
            selected: 'Select',
            selectedPD30: 'Select',
            selectedCE201: 'Select',
            selectedPRE21: 'Select',
            selectedPRE30PV: 'Select',
            selectedPRE21PV: 'Select',
            selectedPRE41PV: 'Select',
            selected2: 'Select',
            selected3: 'Select',
            setOpen: false,
            reportId:0,
            reportIdCE201:0,
            reportIdPRE21:0,
            reportIdPRE21Pv:0,
            report30pdpv:0,
            reportIdPRE41Pv:0,
            reportversion: null,
            reportversionCE201: null,
            reportversionPRE21: null,
            reportversionPRE21Pv: null,
            reportversionPRE41Pv: null,
            reportPolling: [],
            reportDivision: [],
            reportDivisionPV: [],
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

    // Handle click for PRE 41  Postal votes
    handleClickOpenPRE41Pv() {

        if (this.state.reportversionPRE41Pv == null) {

            alert('Report not Avialable')

        }else{
            axios.get('/tally-sheet/'+this.state.reportIdPRE41Pv+'/version/'+this.state.reportversionPRE41Pv+'/html' , {
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

    // Handle click for CE 201 Non Postal votes
    handleClickOpenCE201() {

        if (this.state.reportversionCE201 == null) {

            alert('Report not Avialable')

        }else{
            axios.get('/tally-sheet/'+this.state.reportIdCE201+'/version/'+this.state.reportversionCE201+'/html' , {
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


    // Handle click for PRE 21 Non Postal votes
    handleClickOpenPRE21() {

        if (this.state.reportversionPRE21 == null) {

            alert('Report not Avialable')

        }else{
            axios.get('/tally-sheet/'+this.state.reportIdPRE21+'/version/'+this.state.reportversionPRE21+'/html' , {
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


    // Handle click for PRE 21 Non  votes
    handleClickOpenPRE21pv() {

        if (this.state.reportversionPRE21Pv == null) {

            alert('Report not Avialable')

        }else{
            axios.get('/tally-sheet/'+this.state.reportIdPRE21Pv+'/version/'+this.state.reportversionPRE21+'/html' , {
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



            window.open('https://dev.tabulation.ecdev.opensource.lk/tally-sheet/'+this.state.reportIdPRE21Pv+'/version/'+this.state.reportversionPRE21Pv+'/html', "_blank");
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

    //
    handleClickOpenPRE30Pv() {

        axios.post('/tally-sheet/PRE-30-PD/'+this.state.reportDivisionPV+'/version')
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

    // Report handling for PRE 41pv   postal votel
    handleChangePRE41pv = event => {
        this.setState({selectedPRE41PV: event.target.value, name: event.target.name});

        console.log("PRE41 Counting "+event.target.value)

        this.setState({
            reportIdPRE41Pv: event.target.value
        })

        axios.get('/tally-sheet?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-41' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log(res.data[0].latestVersionId)
            this.setState({
                reportversionPRE41Pv: res.data[0].latestVersionId
            })
        })
            .catch((error) => console.log(error));

    };

    // Report handling for CE 201  Non postal votel
    handleChangeCE201 = event => {
        this.setState({selectedCE201: event.target.value, name: event.target.name});

        console.log("PRE41 Counting "+event.target.value)

        this.setState({
            reportIdCE201: event.target.value
        })

        axios.get('/tally-sheet?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&officeId='+event.target.value+'&tallySheetCode=CE-201' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log(res.data[0].latestVersionId)
            this.setState({
                reportversionCE201: res.data[0].latestVersionId
            })
        })
            .catch((error) => console.log(error));



    };

    // Report handling for PRE 21  Non postal votel
    handleChangePRE21 = event => {
        this.setState({selectedPRE21: event.target.value, name: event.target.name});

        console.log("PRE41 Counting "+event.target.value)

        this.setState({
            reportIdPRE21: event.target.value
        })

        axios.get('/tally-sheet?limit=20&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-21' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log(res.data[0].latestVersionId)
            this.setState({
                reportversionPRE21: res.data[0].latestVersionId
            })
        })
            .catch((error) => console.log(error));



    };

    // Report handling for PRE 21 postal votel
    handleChangePRE21pv = event => {
        this.setState({selectedPRE21PV: event.target.value, name: event.target.name});

        console.log("PRE41 Counting "+event.target.value)

        this.setState({
            reportIdPRE21Pv: event.target.value
        })

        axios.get('/tally-sheet?limit=20&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-21' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log(res.data[0].latestVersionId)
            this.setState({
                reportversionPRE21Pv: res.data[0].latestVersionId
            })
        })
            .catch((error) => console.log(error));



    };

   // Event for PRE 30 PD
    PD30 = event => {
        this.setState({selectedPD30: event.target.value, name: event.target.name});


        axios.get('/tally-sheet?limit=20&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-30-PD' , {
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


        axios.get('/tally-sheet?limit=20&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-30-ED' , {
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
     //PRE 30-Pv
    handleDivisionPv = event => {
        this.setState({selectedPRE30PV: event.target.value, name: event.target.name});

        axios.get('/tally-sheet?limit=20&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&officeId='+event.target.value+'&tallySheetCode=PRE-30-PD' , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                reportDivisionPV: res.data[0].tallySheetId
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

        // counting centers postal votes
        axios.get('/area?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&areaType=CountingCentre', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                officespv: res.data.sort(function (a,b) {
                    if (parseInt(a.areaName) > parseInt(b.areaName)) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            })
        })
            .catch((error) => console.log(error));

        axios.get('/area?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_NonPostal_Id')+'&areaType=PollingDivision', {
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

        // Polling division postal
        axios.get('/area?limit=1000&offset=0&electionId='+localStorage.getItem('electionType_Postal_Id')+'&areaType=PollingDivision', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                pollingStationpv: res.data
            })
        })
            .catch((error) => console.log(error));


        // Electrorial for postal votes


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
                                            Counting Center
                                        </InputLabel>
                                        <Select className="width50" value={this.state.selectedCE201} onChange={this.handleChangeCE201}>
                                            {this.state.offices.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenCE201}
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
                                        <Select className="width50" value={this.state.selectedPD30} onChange={this.PD30}>
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
                                            Counting Center
                                        </InputLabel>
                                        <Select className="width50" value={this.state.selectedPRE21} onChange={this.handleChangePRE21}>
                                            {this.state.offices.map((districtCentre, idx) => (
                                                <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE21}
                                            className="button">Generate</Button>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Paper>
            </div>



                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Postal Votes Reports
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
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>CE 201 PV</TableCell>
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
                                    <TableCell style={{width:'40%',fontSize: 13,fontWeight: 'bold',}}>PRE 41 PV</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedPRE41PV} onChange={this.handleChangePRE41pv}>
                                                {this.state.officespv.map((CountingCenter, idx) => (
                                                    <MenuItem value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE41Pv}
                                                className="button">Generate</Button>
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 21 PV</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedPRE21PV} onChange={this.handleChangePRE21pv}>
                                                {this.state.officespv.map((districtCentre, idx) => (
                                                    <MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE21pv}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 30 PV</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedPRE30PV} onChange={this.handleDivisionPv}>
                                                {this.state.pollingStationpv.map((electralDivision, idx) => (
                                                    <MenuItem value={electralDivision.areaId}>{electralDivision.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE30Pv}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>


                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Overall Reports
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
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>All Island</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickAllIsland}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>All Island ED</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickAllIslandED}
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
                                                    <MenuItem value={electralDivision.areaId}>{electralDivision.areaName}</MenuItem>
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
