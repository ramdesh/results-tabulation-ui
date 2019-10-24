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
        this.handleBack = this.handleBack.bind(this);
        this.handleClickOpenPRE41 = this.handleClickOpenPRE41.bind(this);
        this.handleClickPD30 = this.handleClickPD30.bind(this);
        this.handleClickOpenPRE21 = this.handleClickOpenPRE21.bind(this);
        this.handleClickOpenCE201 = this.handleClickOpenCE201.bind(this);
        this.handleClickOpenCE201pv = this.handleClickOpenCE201pv.bind(this);
        this.handleClickOpenElectorate = this.handleClickOpenElectorate.bind(this);
        this.handleClickOpenPRE30Pv = this.handleClickOpenPRE30Pv.bind(this);
        this.handleClickOpenPRE21pv = this.handleClickOpenPRE21pv.bind(this);
        this.handleClickOpenPRE41Pv = this.handleClickOpenPRE41Pv.bind(this);
        this.handleClickAllIsland = this.handleClickAllIsland.bind(this);
        this.handleClickAllIslandED = this.handleClickAllIslandED.bind(this);
        this.handleClickPD30View = this.handleClickPD30View.bind(this);


        this.state = {
            open: false,
            allUsers: [],
            areas: [],
            areasPv: [],
            pollingStation: [],
            pollingStationpv: [],
            electionDivision: [],
            districtCentres: [],
            PollingDivision: [],
            PollingDivisionpostal: [],
            countingCenter: [],
            selected: 'Select',
            selectedPD30: 'Select',
            selectedCE201: 'Select',
            selectedPRE21: 'Select',
            selectedCE201PV: 'Select',
            selectedCE201PV1: 'Select',
            selectedCE201PV2: 'Select',
            selectedPRE30PV: 'Select',
            selectedPRE21PV: 'Select',
            selectedPRE41PV: 'Select',
            selected2: 'Select',
            selected3: 'Select',
            selectedED1: 'Select',
            selectedED2: 'Select',
            selectedCE201PD: 'Select',
            selectedCE201PD1: 'Select',
            setOpen: false,
            reportId: 0,
            reportIdCE201: 0,
            reportIdCE201pv: 0,
            reportIdPRE21: 0,
            reportIdPRE21Pv: 0,
            report30PD: 0,
            report30pdpv: 0,
            reportIdPRE41Pv: 0,
            ALLIslandtallyId: 0,
            ALLIslandEDtallId: 0,
            reportversion: null,
            reportversionCE201: null,
            reportversionCE201pv: null,
            reportversionPRE21: null,
            reportversionPRE21Pv: null,
            reportversionPRE41Pv: null,
            reportversionPD30: null,
            reportversionPD30PV: null,
            reportPolling: [],
            reportDivision: [],
            reportDivisionPV: [],
            reportAllisland: [],
            latestVersionIdPD30: null,
            lockedVersionId30ED: null,
            lockedVersionIdAllIslandED: null,
            lockedVersionIdAllIsland:null,

            isLokedPRE30PD:false,
            isLokedPRE30PV:false,
            isLokedPRE30ED:false,
            isLokedAllIslandED:false,
            isLokedAllIsland:false,

            btnPRE41: false,
            btnCE201: false,
            btnPRE41PV: false,
            btnCE201PV:false,

            btnPRE30PD: false,
            btnPRE30PV: false,
            btnPRE30ED: false,
            btnAllIslandED:false,
            btnAllIsland:false,

            value: 0
        };
    }

    handleBack() {
        this.props.history.goBack()
    }

    /** PRE 41 Non Postal votes **/
    handleClickOpenPRE41() {
        if (this.state.reportversion == null) {
            alert('Report not Available')
        } else {
            axios.get('/tally-sheet/' + this.state.reportId + '/version/' + this.state.reportversion + '/html', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
            })
                .catch((error) => console.log(error));

            this.props.history.push('/ReportView/' + this.state.reportId + '/' + this.state.reportversion)
        }
        this.setState({open: true});
    }


    /** PRE 41 Postal votes **/
    handleClickOpenPRE41Pv() {
        if (this.state.reportversionPRE41Pv == null) {
            alert('Report not Available')
        } else {
            axios.get('/tally-sheet/' + this.state.reportIdPRE41Pv + '/version/' + this.state.reportversionPRE41Pv + '/html', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
            })
                .catch((error) => console.log(error));

            this.props.history.push('/ReportView/' + this.state.reportIdPRE41Pv + '/' + this.state.reportversionPRE41Pv)
        }
        this.setState({open: true});
    }

    /** CE 201 Non Postal votes **/
    handleClickOpenCE201() {
        if (this.state.reportversionCE201 == null) {
            alert('Report not Available')
        } else {
            axios.get('/tally-sheet/' + this.state.reportIdCE201 + '/version/' + this.state.reportversionCE201 + '/html', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
            })
                .catch((error) => console.log(error));

            console.log(this.state.reportIdCE201);
            this.props.history.push('/ReportView/' + this.state.reportIdCE201 + '/' + this.state.reportversionCE201)
        }
        this.setState({open: true});
    }


    /** CE 201 Postal votes **/
    handleClickOpenCE201pv() {
        if (this.state.reportversionCE201 == null) {
            alert('Report not Available')
        } else {
            axios.get('/tally-sheet/' + this.state.reportIdCE201pv + '/version/' + this.state.reportversionCE201pv + '/html', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
            })
                .catch((error) => console.log(error));

            this.props.history.push('/ReportView/' + this.state.reportIdCE201pv + '/' + this.state.reportversionCE201pv)
        }
        this.setState({open: true});
    }


    /** PRE 21 Non Postal votes **/
    handleClickOpenPRE21() {
        if (this.state.reportversionPRE21 == null) {
            alert('Report not Avialable')
        } else {
            axios.get('/tally-sheet/' + this.state.reportIdPRE21 + '/version/' + this.state.reportversionPRE21 + '/html', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
            })
                .catch((error) => console.log(error));
        }
        this.setState({open: true});
    }


    /** PRE 21 Postal votes **/
    handleClickOpenPRE21pv() {
        if (this.state.reportversionPRE21Pv == null) {
            alert('Report not Avialable')
        } else {
            axios.get('/tally-sheet/' + this.state.reportIdPRE21Pv + '/version/' + this.state.reportversionPRE21 + '/html', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                console.log("Election" + res)
            })
                .catch((error) => console.log(error));
        }
        this.setState({open: true});
    }


    /** PRE 30 PD Non-postal votes **/
    handleClickPD30() {
        console.log("PRE 30 PD")
        axios.post('/tally-sheet/PRE-30-PD/' + this.state.reportversionPD30 + '/version', null, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                console.log(res.data.tallySheetVersionId)
                this.props.history.replace('/ReportView/' + this.state.reportversionPD30 + '/' + res.data.tallySheetVersionId)
            });

        this.setState({open: true});
    }

    /** PRE 30 PD Non-postal votes **/
    handleClickPD30View() {
        console.log("PRE 30 PD")

        this.props.history.replace('/ReportView/' + this.state.reportversionPD30 + '/' + this.state.latestVersionIdPD30)

        // axios.post('/tally-sheet/PRE-30-PD/' + this.state.reportversionPD30 + '/version', null, {
        //     headers: {
        //         'Authorization': "Bearer " + localStorage.getItem('token'),
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data.tallySheetVersionId)
        //         this.props.history.replace('/ReportView/' + this.state.reportversionPD30 + '/' + this.state.latestVersionIdPD30)
        //     });
        //
        // this.setState({open: true});
    }

    // For Generate Purposes
    handleClickOpenElectorate() {
        axios.post('/tally-sheet/PRE-30-ED/' + this.state.reportDivision + '/version', null, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                this.props.history.push('/ReportView/' + this.state.reportDivision + '/' + res.data.tallySheetVersionId)
            });
        this.setState({open: true});
    }

    // For viewing
    handleClickOpenElectorateView() {
        this.props.history.push('/ReportView/' + this.state.reportDivision + '/' + this.state.lockedVersionId30ED)

        //lockedVersionId30ED
        // axios.post('/tally-sheet/PRE-30-ED/' + this.state.reportDivision + '/version', null, {
        //     headers: {
        //         'Authorization': "Bearer " + localStorage.getItem('token'),
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        //     .then(res => {
        //         this.props.history.push('/ReportView/' + this.state.reportDivision + '/' + res.data.tallySheetVersionId)
        //     });
        this.setState({open: true});
    }


    /** PRE 30 PV  **/
    handleClickOpenPRE30Pv() {
        axios.post('/tally-sheet/PRE-30-PD/' + this.state.report30pdpv + '/version', null, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                console.log(res.data.tallySheetVersionId)
                this.props.history.push('/ReportView/' + this.state.report30pdpv + '/' + res.data.tallySheetVersionId)
            });
        this.setState({open: true});
    }


    /** All Island  **/
    handleClickAllIsland() {
        axios.get('/tally-sheet?limit=20&offset=0&tallySheetCode=PRE_ALL_ISLAND_RESULTS', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                ALLIslandtallyId: res.data[0].tallySheetId
            })

            this.setState({
                lockedVersionIdAllIsland: res.data[0].lockedVersionIdAllIsland
            })

            console.log(this.state.lockedVersionIdAllIsland);

            if (this.state.lockedVersionIdAllIsland == null){

                axios.post('/tally-sheet/PRE_ALL_ISLAND_RESULTS/' + res.data[0].tallySheetId + '/version', null, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token'),
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                )
                    .then(res => {
                        this.props.history.replace('/ReportView/' + this.state.ALLIslandtallyId + '/' + res.data.tallySheetVersionId)

                    });

            } else {

                this.props.history.replace('/ReportView/' + this.state.ALLIslandtallyId + '/' + res.data.lockedVersionIdAllIsland)

            }


        })
            .catch((error) => console.log(error));
            this.setState({open: true});
    }


    /** All Island ED **/
    handleClickAllIslandED() {
        axios.get('/tally-sheet?limit=20&offset=0&tallySheetCode=PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                ALLIslandEDtallId: res.data[0].tallySheetId
            })

            this.setState({
                lockedVersionIdAllIslandED: res.data[0].lockedVersionIdAllIslandED
            })

            console.log(this.state.lockedVersionIdAllIslandED);

            if (this.state.lockedVersionIdAllIslandED == null){

                axios.post('/tally-sheet/PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS/' + this.state.ALLIslandEDtallId + '/version', null, {headers: {'Authorization': "Bearer " + localStorage.getItem('token'),}})
                    .then(res => {

                        this.props.history.replace('/ReportView/' + this.state.ALLIslandEDtallId + '/' + res.data.tallySheetVersionId)
                    });

            } else {

                this.props.history.replace('/ReportView/' + this.state.ALLIslandEDtallId + '/' + res.data.lockedVersionIdAllIslandED)


            }
            console.log("button"+this.state.showButtons);


        })
            .catch((error) => console.log(error));
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    // Report handling for PRE 41  Non postal vote
    handleChangePRE41 = event => {
        this.setState({selected: event.target.value, name: event.target.name});
        console.log("PRE41 Counting " + event.target.value)

        axios.get('/tally-sheet?limit=20&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=PRE-41', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
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
            this.setState({
                reportId: res.data[0].tallySheetId
            })
        })
            .catch((error) => console.log(error));

    };

    // Report handling for PRE 41pv postal vote
    handleChangePRE41pv = event => {
        this.setState({selectedPRE41PV: event.target.value, name: event.target.name});
        console.log("PRE41 Pv Counting " + event.target.value)


        axios.get('/tally-sheet?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_Postal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=PRE-41', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
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
            this.setState({
                reportIdPRE41Pv: res.data[0].tallySheetId
            })
        })
            .catch((error) => console.log(error));

    };

    // Report handling for CE 201 Non postal vote
    handleChangeCE201 = event => {
        this.setState({selectedCE201: event.target.value, name: event.target.name});

        axios.get('/tally-sheet?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=CE-201', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
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
            this.setState({
                reportIdCE201: res.data[0].tallySheetId
            })
        })
            .catch((error) => console.log(error));
    };


    // Report handling for CE 201 postal vote
    handleChangeCE201pv = event => {
        this.setState({selectedCE201PV: event.target.value, name: event.target.name});

        axios.get('/tally-sheet?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=CE-201-PV', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log(res.data[0].latestVersionId)
            this.setState({
                reportversionCE201pv: res.data[0].latestVersionId
            })
            this.setState({
                reportIdCE201pv: res.data[0].tallySheetId
            })
        })
            .catch((error) => console.log(error));
    };


    // Event for PRE 30 PD
    PD30 = event => {
        this.setState({selectedPD30: event.target.value, name: event.target.name});
        console.log(event.target.value);
        this.setState({btnPRE30PD:true});

        axios.get('/tally-sheet?limit=20&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=PRE-30-PD', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                reportversionPD30: res.data[0].tallySheetId
            })
            this.setState({
                latestVersionIdPD30: res.data[0].lockedVersionId
            })

            console.log(this.state.latestVersionIdPD30);

            if (this.state.latestVersionIdPD30 == null){

            } else {
                this.setState({btnPRE30PD:true});
                this.setState({isLokedPRE30PD:true});

            }
            console.log("button"+this.state.showButtons);

            //latestVersionIdPD30
        })
            .catch((error) => console.log(error));
    };


    handleDivision = event => {
        this.setState({selected2: event.target.value, name: event.target.name});
        axios.get('/tally-sheet?limit=20&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=PRE-30-ED', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
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
            this.setState({
                lockedVersionId30ED: res.data[0].lockedVersionId
            })

            console.log(this.state.lockedVersionId30ED);

            if (this.state.lockedVersionId30ED == null){



            } else {


            }

        })
            .catch((error) => console.log(error));
    };


    //PRE 30-Pv
    handleDivisionPv = event => {
        this.setState({selectedPRE30PV: event.target.value, name: event.target.name});

        console.log(event.target.value);

        axios.get('/tally-sheet?limit=20&offset=0&electionId=' + localStorage.getItem('electionType_Postal_Id') + '&areaId=' + event.target.value + '&tallySheetCode=PRE-30-PD', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].tallySheetId)
            this.setState({
                report30pdpv: res.data[0].tallySheetId
            })

        })
            .catch((error) => console.log(error));

    };


    /** District Centre **/
    handleChange = event => {
        console.log(event.target)
        if (event.target.name == 'vals') {
            this.setState({selectedED1: event.target.value, name: event.target.name},);
        } else {
            this.setState({selectedED2: event.target.value, name: event.target.name},);
        }

        console.log("District Centre :" + event.target.value)
        axios.get('/area?limit=20&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&associatedAreaId=' + event.target.value + '&areaType=PollingDivision', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
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


    /** District Centre postal **/
    handleChangepostal = event => {
        console.log(event.target.value)
        if (event.target.name == 'selectedCE201PV1') {
            this.setState({selectedCE201PV1: event.target.value, name: event.target.name},);
        } else {
            this.setState({selectedCE201PV2: event.target.value, name: event.target.name},);
        }

        console.log("District Centre :" + event.target.value)
        axios.get('/area?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_Postal_Id') + '&associatedAreaId=' + event.target.value + '&areaType=CountingCentre', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].areaName)
            this.setState({
                PollingDivisionpostal: res.data
            })

        })
            .catch((error) => console.log(error));
    };


    /** Polling Division **/
    handlePollingDivision = event => {
        console.log(event.target)
        if (event.target.name == 'selectedCE201PD') {
            this.setState({selectedCE201PD: event.target.value, name: event.target.name},);
        } else {
            this.setState({selectedCE201PD1: event.target.value, name: event.target.name},);
        }


        console.log(event.target.value)
        axios.get('/area?limit=20&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&associatedAreaId=' + event.target.value + '&areaType=CountingCentre', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                countingCenter: res.data.sort(function (a, b) {
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


    componentDidMount() {
        console.log("Election Result Test")
        axios.get('/area?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaType=CountingCentre', {
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
                areas: res.data.sort(function (a, b) {
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
        axios.get('/area?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_Postal_Id') + '&areaType=CountingCentre', {
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
                areasPv: res.data.sort(function (a, b) {
                    if (parseInt(a.areaName) > parseInt(b.areaName)) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            })
        })
            .catch((error) => console.log(error));

        axios.get('/area?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaType=PollingDivision', {
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
                pollingStation: res.data
            })
        })
            .catch((error) => console.log(error));

        // Polling division postal
        axios.get('/area?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_Postal_Id') + '&areaType=PollingDivision', {
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
                pollingStationpv: res.data
            })
        })
            .catch((error) => console.log(error));


        // Get electoral District

        axios.get('/area?limit=1000&offset=0&electionId=' + localStorage.getItem('electionType_NonPostal_Id') + '&areaType=ElectoralDistrict', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
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


        // Electrorial for postal votes
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
            <div style={{margin: '3%', marginRight: '8%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}} separator="/"
                                     aria-label="breadcrumb">
                            <Link color="inherit" href="/Election">
                                Home
                            </Link>
                            <Link color="inherit" href="/Main">
                                Presidential Election
                            </Link>
                            <Link color="inherit">
                                Reports
                            </Link>
                        </Breadcrumbs>

                        <Typography variant="h5" gutterBottom>
                            Ordinary Votes Reports
                        </Typography>
                    </div>

                    <Paper style={{margin: '3%'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*CE 201*/}
                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>CE 201</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Electoral District
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedED1} name={"vals"}
                                                    onChange={this.handleChange}>
                                                {this.state.districtCentres.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>

                                        </FormControl>
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedCE201PD}
                                                    name={"selectedCE201PD"}
                                                    onChange={this.handlePollingDivision}>
                                                {this.state.PollingDivision.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>

                                        </FormControl>
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedCE201}
                                                    onChange={this.handleChangeCE201}>
                                                {this.state.countingCenter.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>

                                        </FormControl>
                                    </TableCell>


                                    {this.state.btnCE201 === false &&
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                disabled={true}
                                                onClick={this.handleClickPD30}
                                                className="button1">Generate</Button>
                                    </TableCell>
                                    }
                                    {this.state.btnCE201 === true &&
                                    <TableCell>
                                        <Button

                                            style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                            onClick={this.handleClickOpenCE201}
                                            className="button">View</Button>}
                                    </TableCell>
                                    }
                                </TableRow>
                                {/*PRE 41*/}
                                <TableRow>
                                    <TableCell style={{width: '40%', fontSize: 13, fontWeight: 'bold',}}>PRE
                                        41</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Electoral District
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedED2} name={"val2"}
                                                    onChange={this.handleChange}>
                                                {this.state.districtCentres.map((CountingCenter, idx) => (
                                                    <MenuItem
                                                        value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedCE201PD1}
                                                    name={"selectedCE201PD1"}
                                                    onChange={this.handlePollingDivision}>
                                                {this.state.PollingDivision.map((CountingCenter, idx) => (
                                                    <MenuItem
                                                        value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selected}
                                                    onChange={this.handleChangePRE41}>
                                                {this.state.countingCenter.map((CountingCenter, idx) => (
                                                    <MenuItem
                                                        value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    {this.state.btnPRE41 === false &&
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                disabled={true}
                                                onClick={this.handleClickPD30}
                                                className="button1">Generate</Button>
                                    </TableCell>
                                    }
                                    {this.state.btnPRE41 === true &&
                                    <TableCell>
                                        <Button

                                            style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                            onClick={this.handleClickOpenPRE41}
                                            className="button">View</Button>}
                                    </TableCell>
                                    }



                                </TableRow>
                                {/*PRE 30 PD*/}
                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>PRE 30 PD</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Polling Division
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedPD30}
                                                    onChange={this.PD30}>
                                                {this.state.pollingStation.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    {this.state.btnPRE30PD === false &&
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                disabled={true}
                                                onClick={this.handleClickPD30}
                                                className="button1">Generate</Button>
                                    </TableCell>
                                    }
                                    {this.state.btnPRE30PD === true &&
                                    <TableCell>
                                        {this.state.isLokedPRE30PD === false &&
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}

                                                onClick={this.handleClickPD30}
                                                className="button">Generate</Button>}

                                        {this.state.isLokedPRE30PD === true && <Button

                                            style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                            onClick={this.handleClickPD30View}
                                            className="button">View</Button>}
                                    </TableCell>
                                    }

                                </TableRow>

                                {/*<TableRow>*/}
                                {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 21</TableCell>*/}
                                {/*<TableCell style={{fontSize: 13}}>*/}
                                {/*<FormControl variant="outlined" margin="dense">*/}
                                {/*<InputLabel>*/}
                                {/*Counting Center*/}
                                {/*</InputLabel>*/}
                                {/*<Select className="width50" value={this.state.selectedPRE21} onChange={this.handleChangePRE21}>*/}
                                {/*{this.state.areas.map((districtCentre, idx) => (*/}
                                {/*<MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>*/}
                                {/*))}*/}
                                {/*</Select>*/}
                                {/*</FormControl>*/}
                                {/*</TableCell>*/}
                                {/*<TableCell>*/}
                                {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE21}*/}
                                {/*className="button">Generate</Button>*/}
                                {/*</TableCell>*/}
                                {/*</TableRow>*/}

                            </TableBody>
                        </Table>
                    </Paper>
                </div>


                <div>
                    <div style={{marginTop: '5%',marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Postal Votes Reports
                        </Typography>
                    </div>

                    <Paper style={{margin: '3%'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>CE 201 PV</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Electoral District
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedCE201PV1}
                                                    name={'selectedCE201PV1'}
                                                    onChange={this.handleChangepostal}>
                                                {this.state.electionDivision.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedCE201PV}
                                                    onChange={this.handleChangeCE201pv}>
                                                {this.state.PollingDivisionpostal.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.handleClickOpenCE201pv}
                                                className="button">Generate</Button>
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '40%', fontSize: 13, fontWeight: 'bold',}}>PRE 41
                                        PV</TableCell>

                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Electoral District
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedCE201PV2}
                                                    name={'selectedCE201PV2'}
                                                    onChange={this.handleChangepostal}>
                                                {this.state.electionDivision.map((districtCentre, idx) => (
                                                    <MenuItem
                                                        value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Counting Center
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedPRE41PV}
                                                    onChange={this.handleChangePRE41pv}>
                                                {this.state.PollingDivisionpostal.map((CountingCenter, idx) => (
                                                    <MenuItem
                                                        value={CountingCenter.areaId}>{CountingCenter.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.handleClickOpenPRE41Pv}
                                                className="button">Generate</Button>
                                    </TableCell>

                                </TableRow>
                                {/*<TableRow>*/}
                                {/*<TableCell style={{fontSize: 13,fontWeight: 'bold'}}>PRE 21 PV</TableCell>*/}
                                {/*<TableCell style={{fontSize: 13}}>*/}
                                {/*<FormControl variant="outlined" margin="dense">*/}
                                {/*<InputLabel>*/}
                                {/*Counting Center*/}
                                {/*</InputLabel>*/}
                                {/*<Select className="width50" value={this.state.selectedPRE21PV} onChange={this.handleChangePRE21pv}>*/}
                                {/*{this.state.areasPv.map((districtCentre, idx) => (*/}
                                {/*<MenuItem value={districtCentre.areaId}>{districtCentre.areaName}</MenuItem>*/}
                                {/*))}*/}
                                {/*</Select>*/}
                                {/*</FormControl>*/}
                                {/*</TableCell>*/}
                                {/*<TableCell>*/}
                                {/*<Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpenPRE21pv}*/}
                                {/*className="button">Generate</Button>*/}
                                {/*</TableCell>*/}
                                {/*</TableRow>*/}
                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>PRE 30 PV</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Electoral District
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selectedPRE30PV}
                                                    onChange={this.handleDivisionPv}>
                                                {this.state.electionDivision.map((electralDivision, idx) => (
                                                    <MenuItem
                                                        value={electralDivision.areaId}>{electralDivision.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.handleClickOpenPRE30Pv}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div>
                    <div style={{marginTop: '5%',marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Overall Reports
                        </Typography>

                    </div>

                    <Paper style={{margin: '3%'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>PRE 30 ED</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <FormControl variant="outlined" margin="dense">
                                            <InputLabel>
                                                Electoral District
                                            </InputLabel>
                                            <Select className="width50" value={this.state.selected2}
                                                    onChange={this.handleDivision}>
                                                {this.state.electionDivision.map((electralDivision, idx) => (
                                                    <MenuItem
                                                        value={electralDivision.areaId}>{electralDivision.areaName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.handleClickOpenElectorate}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>All Island ED</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.handleClickAllIslandED}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>All Island</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.handleClickAllIsland}
                                                className="button">Generate</Button>
                                    </TableCell>
                                </TableRow>



                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                <div style={{marginLeft: '89%', marginTop: '4%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                </div>
            </div>
        )
    }
}

export default ReportsEntry;
