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
    Paper
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CE201New extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: false,
            selected: 'Select',
            pollingStationsList: [],
            pollingStationsMap: {},
            content: {},

            pollingStations: [],
            tallySheetId: 0,
            reportId: 0,
            countingName: 0,
            countingId: 0,

            latestVersionId:0,
            // ballotBoxes:[]
            // tallySheetVersionId: 1,
        };
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
                "ballotBoxesReceived": [
                    "string"
                ],
                "ballotsIssued": null,
                "ballotsReceived": null,
                "ballotsSpoilt": null,
                "ballotsUnused": null,
                "ordinaryBallotCountFromBallotPaperAccount": null,
                "ordinaryBallotCountFromBoxCount": null,
                "tenderedBallotCountFromBallotPaperAccount": null,
                "tenderedBallotCountFromBoxCount": null
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

    // modal controllers
    handleClose() {
        this.setState({open: false});
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
                latestVersionId: res.data.latestVersionId
            })
            if (res.data.latestVersionId === "null") {

            } else {
                const {tallySheetVersionId} = this.props.match.params
                console.log("counting center Id : ", tallySheetVersionId)
                // this.setState({
                //     countingId: tallySheetVersionId
                // })

                /** To get the Polling Stations **/
                axios.get('/area?limit=1000&offset=0&associatedAreaId='+tallySheetVersionId+'&areaType=PollingStation', {
                    headers: {
                        'Authorization': "Bearer "+localStorage.getItem('token'),
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then(res => {
                    console.log("New man" + res.data[0].pollingDistricts)
                    this.setState({
                        pollingStations: res.data
                    })
                    this.setElection(res.data)


                    axios.get('/tally-sheet/CE-201/' + tallySheetId + '/version/' + this.state.latestVersionId, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token'),
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then(res => {
                        console.log("201" + res)
                        // const candidateWiseCounts = res.data.content;
                        // for (var i = 0; i < candidateWiseCounts.length; i++) {
                        //     let candidateWiseCount = candidateWiseCounts[i];
                        //     this.setInputValue(candidateWiseCount.candidateId, "count", candidateWiseCount.count);
                        //     this.setInputValue(candidateWiseCount.candidateId, "countInWords", candidateWiseCount.countInWords);
                        // }
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
                        "ballotBoxesReceived": [
                            (this.state.content[pollingId].ballotBoxesReceived),
                        ],
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
                    'authorization': "Bearer "+localStorage.getItem('token'),
                }
            })
            .then(res => {
                // console.log("Result data" + res.data);
                console.log("Result" + res.data.tallySheetVersionId);

                // console.log("URL" + res.data.htmlUrl);
                // console.log("Result" + res.data[0]);
                // console.log("Version" + res.data.tallySheetVersionId);

                // alert("Successfully Created the TallySheet - CE 201")
                this.props.history.push('/CE201Report/'+this.state.tallySheetId+'/'+ res.data.tallySheetVersionId)

            }).catch((error) => console.log(error));

    }

    handleInputChange = (pollingId, property) => (event) => {

        console.log("Polling ID",pollingId)
        console.log("value",property)

        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                [pollingId]: {
                    ...this.state.content[pollingId],
                    [property]: event.target.value
                }
            }
        })
    }

    render() {
        return (
            <div style={{backgroundColor:'#EAF4F8', padding: '3%'}}>
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
                            CE-201 - Counting Hall No : {this.props.match.params.tallySheetVersionId}
                            {/*CE-201 - Tally Sheet ID : {this.props.match.params.name}*/}
                        </Typography>
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
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Ballot Box
                                        IDs</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>No of Ballot
                                        Papers Received</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>No of Spoilt
                                        Ballots </TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>No of Issued
                                        Ballots</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>No of Unused
                                        Ballots</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Ordinary
                                        Ballot Paper Count</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Tender Ballot
                                        Paper Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pollingStations.map((pollingStation, idx) => (
                                    <TableRow>
                                        <TableCell style={{fontSize: 13, width: '1%'}}>
                                            {/*{pollingStation.pollingDistricts[0].areaId}*/}
                                            {
                                                pollingStation.pollingDistricts.map((member, index) => {
                                                    return <p key={index}>{ member.areaId }</p>
                                                })
                                            }

                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '5%'}}>
                                            {pollingStation.areaName}
                                        </TableCell>

                                        <TableCell style={{fontSize: 13, width: '14%'}}>

                                            {/*<FormControl variant="outlined" margin="dense">*/}

                                            {/*<InputLabel style={{fontSize:'12px',marginLeft: '-5%'}}>*/}
                                            {/*Box ID*/}
                                            {/*</InputLabel>*/}

                                            {/*<Select className="width40" value={this.state.selectedbox1}*/}
                                            {/*onChange={this.handleBoxes} >*/}
                                            {/*{this.state.ballotBoxes.map((ballotbox, idx) => (*/}
                                            {/*<MenuItem value={ballotbox.ballotBoxId}>{ballotbox.ballotBoxId}</MenuItem>*/}
                                            {/*))}*/}
                                            {/*</Select>*/}
                                            {/*</FormControl>*/}

                                            <TextField
                                                id="box-id1"
                                                margin="dense"
                                                variant="outlined"
                                                label="Box Id"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotBoxesReceived")}
                                            />
                                            <TextField
                                                id="box-id2"
                                                margin="dense"
                                                variant="outlined"
                                                label="Box Id"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotBoxesReceived")}
                                            />
                                            <TextField
                                                id="box-id3"
                                                margin="dense"
                                                variant="outlined"
                                                label="Box Id"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotBoxesReceived")}
                                            />
                                        </TableCell>

                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-received"
                                                margin="dense"
                                                variant="outlined"
                                                label="Count"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotsReceived")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-spoilt"
                                                margin="dense"
                                                variant="outlined"
                                                label="Count"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotsSpoilt")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-issued"
                                                margin="dense"
                                                variant="outlined"
                                                label="Count"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotsIssued")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-unused"
                                                margin="dense"
                                                variant="outlined"
                                                label="Count"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ballotsUnused")}
                                            />
                                        </TableCell>
                                        <TableCell style={{backgroundColor:'#f2f2f2',fontSize: 13, width: '19%'}}>
                                            <TextField
                                                id="ordinaryBallotCountFromBallotPaperAccount"
                                                margin="dense"
                                                variant="outlined"
                                                label="Ballot Paper A."
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ordinaryBallotCountFromBallotPaperAccount")}
                                            />
                                            <TextField
                                                id="ordinaryBallotCountFromBoxCount"
                                                margin="dense"
                                                variant="outlined"
                                                label="Box Count"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "ordinaryBallotCountFromBoxCount")}
                                            />
                                            <TextField
                                                label="Difference"
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                autoComplete='off'

                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '20%'}}>
                                            <TextField
                                                id="tenderedBallotCountFromBallotPaperAccount"
                                                margin="dense"
                                                variant="outlined"
                                                label="Ballot Paper A."
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "tenderedBallotCountFromBallotPaperAccount")}
                                            />
                                            <TextField
                                                id="tenderedBallotCountFromBoxCount"
                                                margin="dense"
                                                variant="outlined"
                                                label="Box Count"
                                                autoComplete='off'
                                                onChange={this.handleInputChange(pollingStation.areaId, "tenderedBallotCountFromBoxCount")}
                                            />
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                label="Difference"
                                                autoComplete='off'
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div style={{marginLeft: '80%', marginTop: '2%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white'}} onClick={this.handleSubmit}
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

export default CE201New;
