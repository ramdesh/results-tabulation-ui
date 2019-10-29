import React, {Component} from 'react'
import axios from '../../axios-base';
import {
    Typography,
    Button,
    TextField,
    Select,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Breadcrumbs,
    Link,
    Paper,
    Grid
} from '@material-ui/core';
import {getNumOrZero} from "../../utils";

class CE201New extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleBack = this.handleBack.bind(this);
        this.setElection = this.setElection.bind(this);
        this.state = {
            selected: 'Select',
            pollingStationsList: [],
            pollingStationsMap: {},
            content: {},

            pollingStations: [],
            tallySheetId: 0,
            reportId: 0,
            countingName: 0,
            countingId: 0,

            area: null,
            areaId: 0,
            pollingDivision: null,
            electoralDistrict: null,
            latestVersionId: 0,
        };
    }

    getCountingCentreName() {
        if (this.state.area) {
            return this.state.area.areaName;
        }
        return null
    }

    /** get Input value **/
    getInputValue(pollingStationId, property) {
        console.log("Check 1", pollingStationId, property)
        const value = this.state.content[pollingStationId][property];
        console.log("Check 2", value)
        if (value === null || value === undefined) {
            return undefined
        } else {
            return value
        }
    }

    setInputValue(pollingStationId, property, value) {
        console.log("set state" + pollingStationId, property, value)
        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                [pollingStationId]: {
                    ...this.state.content[pollingStationId],
                    [property]: value
                }
            }
        })
    }

    setElection(pollingStations) {
        var pollingStationsMap = {};
        var content = {};
        console.log("List : ", pollingStations)
        var pollingStationsList = pollingStations.map((pollingStation) => {

            pollingStationsMap[pollingStation.areaId] = pollingStation;
            content[pollingStation.areaId] = {
                "areaId": pollingStation.areaId,
                "ballotBoxesIssued": [
                    "string"
                ],
                "ballotBoxesReceived": [],
                "ballotsIssued": 0,
                "ballotsReceived": 0,
                "ballotsSpoilt": 0,
                "ballotsUnused": 0,
                "ordinaryBallotCountFromBallotPaperAccount": 0,
                "ordinaryBallotCountFromBoxCount": 0,
                "tenderedBallotCountFromBallotPaperAccount": 0,
                "tenderedBallotCountFromBoxCount": 0
            };
            return pollingStation.areaId
        })
        this.setState({
            pollingStationsList,
            pollingStationsMap,
            content
        })
    }

    handleBack() {
        this.props.history.goBack()
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };

    componentDidMount() {
        const {tallySheetId} = this.props.match.params
        console.log("tally sheet Id ", tallySheetId)
        this.setState({
            tallySheetId: tallySheetId
        })

        /** get tallysheet by ID **/
        axios.get('/tally-sheet/' + tallySheetId, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("New tally VERSION CE201", res.data.latestVersionId)
            this.setState({
                latestVersionId: res.data.latestVersionId,
                area: res.data.area,
                areaId: res.data.area.areaId
            })


            /** get electoral district name **/
            axios.get('/area?limit=1000&offset=0&associatedAreaId=' + this.state.areaId + '&areaType=ElectoralDistrict', {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                this.setState({
                    electoralDistrict: res.data[0].areaName
                })
            }).catch((error) => console.log(error));

            /** get polling division name **/
            axios.get('/area?limit=1000&offset=0&associatedAreaId=' + this.state.areaId + '&areaType=PollingDivision', {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                this.setState({
                    pollingDivision: res.data[0].areaName
                })
            }).catch((error) => console.log(error));


            if (res.data.latestVersionId === "null") {

            } else {
                const {tallySheetVersionId} = this.props.match.params
                console.log("counting center Id : ", tallySheetVersionId)
                // this.setState({
                //     countingId: tallySheetVersionId
                // })

                /** To get the Polling Stations **/
                axios.get('/area?limit=1000&offset=0&associatedAreaId=' + this.state.areaId + '&areaType=PollingStation', {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token'),
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then(res => {
                    console.log("New polling" + res.data.length)
                    console.log("New polling" + res.data[0])
                    this.setState({
                        pollingStations: res.data
                    })
                    this.setElection(res.data);

                    // const candidateWiseCounts = res.data.length;

                    axios.get('/tally-sheet/CE-201/' + tallySheetId + '/version/' + this.state.latestVersionId, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token'),
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then(res => {
                        console.log("201 RES" + res.data.content)

                        const pollingStationWiseCounts = res.data.content;
                        for (var i = 0; i < pollingStationWiseCounts.length; i++) {
                            let pollingStationWiseCount = pollingStationWiseCounts [i];
                            this.setInputValue(pollingStationWiseCount.areaId, "ordinaryBallotCountFromBoxCount", pollingStationWiseCount.ordinaryBallotCountFromBoxCount);
                        }
                    }).catch((error) => console.log(error));

                }).catch((error) => console.log(error));

            }
        })
            .catch((error) => console.log(error));

    }

    /** submit the form data **/
    handleSubmit = (event) => {
        const {tallySheetId} = this.props.match.params
        console.log("tallySheet ID :", tallySheetId)

        event.preventDefault()
        // if (this.state.content[1].count === null || this.state.content[2].count === null ||
        //     this.state.content[1].countInWords === null || this.state.content[2].countInWords === null) {
        //     alert("Please Enter the necessary fields !")
        //
        // } else {
        axios.post('/tally-sheet/CE-201/' + tallySheetId + '/version', {
                "content": this.state.pollingStationsList.map((pollingId) => {
                    return {
                        "areaId": pollingId,
                        "ballotBoxesIssued": [
                            ""
                        ],
                        "ballotBoxesReceived": [],
                        "ballotsIssued": parseInt(this.state.content[pollingId].ballotsIssued),
                        "ballotsReceived": parseInt(this.state.content[pollingId].ballotsReceived),
                        "ballotsSpoilt": parseInt(this.state.content[pollingId].ballotsSpoilt),
                        "ballotsUnused": parseInt(this.state.content[pollingId].ballotsUnused),
                        "ordinaryBallotCountFromBallotPaperAccount": parseInt(this.state.content[pollingId].ordinaryBallotCountFromBallotPaperAccount),
                        "ordinaryBallotCountFromBoxCount": parseInt(this.state.content[pollingId].ordinaryBallotCountFromBoxCount),
                        "tenderedBallotCountFromBallotPaperAccount": parseInt(this.state.content[pollingId].tenderedBallotCountFromBallotPaperAccount),
                        "tenderedBallotCountFromBoxCount": parseInt(this.state.content[pollingId].tenderedBallotCountFromBoxCount),
                    }
                })
            },
            {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                // console.log("Result data" + res.data);
                console.log("Result" + res.data.tallySheetVersionId);

                // console.log("URL" + res.data.htmlUrl);
                // console.log("Result" + res.data[0]);
                // console.log("Version" + res.data.tallySheetVersionId);

                // alert("Successfully Created the TallySheet - CE 201")
                this.props.history.push('/CE201Report/' + this.state.tallySheetId + '/' + res.data.tallySheetVersionId)

            }).catch((error) => console.log(error));

    }

    getBoxCountTotal() {
        let validVoteCountTotal = 0;

        for (var pollingStationIndex = 0; pollingStationIndex < this.state.pollingStationsList.length; pollingStationIndex++) {
            let pollingId = this.state.pollingStationsList[pollingStationIndex];
            let validVoteCount = this.getInputValue(pollingId, "ordinaryBallotCountFromBoxCount");
            validVoteCount = getNumOrZero(validVoteCount);
            validVoteCountTotal += validVoteCount;
        }

        return validVoteCountTotal
    }

    handleInputChange = (pollingId, property) => (event) => {

        console.log("Polling ID", pollingId)
        console.log("value", property)
        console.log("number", event.target.value)

        /** Addition **/
        const value = event.target.value
        this.setInputValue(pollingId, property, value)

        // this.setState({
        //     ...this.state,
        //     content: {
        //         ...this.state.content,
        //         [pollingId]: {
        //             ...this.state.content[pollingId],
        //             [property]: event.target.value
        //         }
        //     }
        // })
    }

    render() {
        return (
            <div style={{backgroundColor: '#EAF4F8', padding: '3%'}}>
                <div>
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
                        <Link color="inherit">
                            Tally Sheet
                        </Link>
                        {/*<Typography color="textPrimary"></Typography>*/}
                    </Breadcrumbs>


                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            CE 201
                        </Typography>
                        <br/>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Typography style={{fontWeight: 'bold'}} variant="h5" gutterBottom>
                                    Electoral District : {this.state.electoralDistrict}
                                </Typography>
                            </Grid>
                            {this.state.pollingDivision !== null && <Grid item xs={4}>
                                <Typography style={{fontWeight: 'bold'}} variant="h5" gutterBottom>
                                    Polling Division : {this.state.pollingDivision}
                                </Typography>
                            </Grid>}
                            <Grid item xs={4}>
                                <Typography style={{fontWeight: 'bold'}} variant="h5" gutterBottom>
                                    Counting Hall No : {this.getCountingCentreName()}
                                </Typography>
                            </Grid>
                        </Grid>

                    </div>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Polling
                                        District No</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Polling
                                        Station</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Ordinary
                                        Ballot Paper Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*{this.state.pollingStations.map((pollingStation, idx) => (*/}

                                {this.state.pollingStationsList.map((pollingId, idx) => {

                                    // var candidate = this.state.candidateMap[candidateId];
                                    var pollingStation = this.state.pollingStationsMap[pollingId];

                                    return <TableRow style={idx % 2 ? {background: "white"} : {background: "#f6f6f6"}}>

                                        <TableCell style={{fontSize: 13, width: '10%'}}>
                                            {/*{pollingStation.pollingDistricts[0].areaId}*/}
                                            {
                                                pollingStation.pollingDistricts.map((member, index) => {
                                                    return <p key={index}>{member.areaName}</p>
                                                })
                                            }

                                        </TableCell>

                                        <TableCell style={{fontSize: 13, width: '50%'}}>
                                            {pollingStation.areaName}
                                        </TableCell>

                                        <TableCell style={{fontSize: 13, width: '20%'}}>

                                            <TextField
                                                id="ordinaryBallotCountFromBoxCount"
                                                margin="dense"
                                                variant="outlined"
                                                label="Box Count"
                                                type="number"
                                                value={this.getInputValue(pollingStation.areaId, "ordinaryBallotCountFromBoxCount")}
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ordinaryBallotCountFromBoxCount")}
                                            />
                                        </TableCell>
                                    </TableRow>
                                })}

                                <TableRow style={{background: "#f6f6f6"}}>
                                    <TableCell></TableCell>
                                    <TableCell
                                        style={{marginLeft: '30% ', fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                                        මුළු එකතුව / Total Box Count : </TableCell>
                                    <TableCell
                                        style={{paddingLeft: '2%', width: '30%', fontSize: 16, fontWeight: 'bold'}}>
                                        {this.getBoxCountTotal()}
                                    </TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div style={{textAlign: 'right', marginTop: '2%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '10px'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white'}} onClick={this.handleSubmit}
                            className="button">Next</Button>
                </div>

            </div>
        )
    }
}

export default CE201New;
