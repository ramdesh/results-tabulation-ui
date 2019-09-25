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
    Paper,FormControl,MenuItem,InputLabel
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CE201Entry extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: false,
            selected: 'Select',

            // selectedbox1: 'Select',

            pollingStationsList: [],
            pollingStationsMap: {},
            content: {},

            pollingStations: [],
            tallySheetId: 0,
            reportId: 0,
            countingName: 0,
            countingId: 0,

            // ballotBoxes:[]
        };
    }

    setElection(pollingStations) {
        var pollingStationsMap = {};
        var content = {};
        console.log("List : ", pollingStations)
        var pollingStationsList = pollingStations.map((pollingStation) => {

            pollingStationsMap[pollingStation.officeId] = pollingStation;
            content[pollingStation.officeId] = {
                "areaId": pollingStation.officeId,
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
            return pollingStation.officeId
        })
        this.setState({
            pollingStationsList,
            pollingStationsMap,
            content
        })
    }

    handleBack() {
        this.props.history.replace('/CE201')
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };

    handleBoxes = event => {

        this.setState({selectedbox1: event.target.value, name: event.target.name});
        console.log("Boxes"+ event.target.value)
    };



    componentDidMount() {
        console.log("NEW Test : ")
        const {name} = this.props.match.params
        console.log("TallySheet ID : ", name)
        this.setState({
            tallySheetId: name
        })
        const {name2} = this.props.match.params
        console.log("Id office :", name2)
        this.setState({
            countingName: name2
        })

        const {countingId} = this.props.match.params
        console.log("TallySheet ID : ", countingId)
        this.setState({
            countingId: countingId
        })

        axios.get('/office?limit=1000&offset=0&parentOfficeId=' + countingId, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("New" + res.data[0])
            this.setState({
                pollingStations: res.data
            })
            this.setElection(res.data)
            // this.setElection(res.data[0])
        }).catch((error) => console.log(error));

        /** get box data **/

        axios.get('/ballot-box?limit=1000&offset=0&electionId='+localStorage.getItem('electionType') , {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Boxes >>" + res.data)
            this.setState({
               ballotBoxes: res.data
            })
            // this.setElection(res.data)
            // this.setElection(res.data[0])
        }).catch((error) => console.log(error));


    }

    /** submit the form data **/
    handleSubmit = (event) => {
        const {name} = this.props.match.params
        const {name2} = this.props.match.params
        console.log("Id office >>> ", name2)
        event.preventDefault()
        // if (this.state.content[1].count === null || this.state.content[2].count === null ||
        //     this.state.content[1].countInWords === null || this.state.content[2].countInWords === null) {
        //     alert("Please Enter the necessary fields !")
        //
        // } else {
        axios.post('/tally-sheet/CE-201/' + name + '/version', {
            "content": this.state.pollingStationsList.map((pollingId) => {
                return {
                    "areaId": pollingId,
                    "ballotBoxesIssued": [
                        1
                    ],
                    "ballotBoxesReceived": [
                        1
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
        })
            .then(res => {
                console.log("URL" + res.data.htmlUrl);
                console.log("Result" + res.data[0]);
                alert("Successfully Created the TallySheet - CE 201")
                const htmlURL = res.data.htmlUrl
                window.open(htmlURL, "_blank")
                this.props.history.replace('/Home')

            }).catch((error) => console.log(error));

    }

    handleInputChange = (pollingId, property) => (event) => {
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
            <div style={{margin: '3%'}}>
                <div>
                    <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}} separator="/"
                                 aria-label="breadcrumb">
                        <Link color="inherit" href="/">
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
                        <Typography variant="h6" gutterBottom>
                            CE-201 - Counting Hall No : {this.props.match.params.name2}
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
                                            {idx}
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '5%'}}>
                                            {pollingStation.officeName}
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '13%'}}>

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
                                                placeholder="Box Id"
                                            />
                                            <TextField
                                                id="box-id2"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Box Id"
                                            />
                                            <TextField
                                                id="box-id3"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Box Id"
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-received"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Count"
                                                onChange={this.handleInputChange(pollingStation.officeId, "ballotsReceived")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-spoilt"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Count"
                                                onChange={this.handleInputChange(pollingStation.officeId, "ballotsSpoilt")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-issued"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Count"
                                                onChange={this.handleInputChange(pollingStation.officeId, "ballotsIssued")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '11%'}}>
                                            <TextField
                                                id="ballots-unused"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Count"
                                                onChange={this.handleInputChange(pollingStation.officeId, "ballotsUnused")}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '19%'}}>
                                            <TextField
                                                id="ordinaryBallotCountFromBallotPaperAccount"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Ballot Paper A."
                                                onChange={this.handleInputChange(pollingStation.officeId, "ordinaryBallotCountFromBallotPaperAccount")}
                                            />
                                            <TextField
                                                id="ordinaryBallotCountFromBoxCount"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Box Count"
                                                onChange={this.handleInputChange(pollingStation.officeId, "ordinaryBallotCountFromBoxCount")}
                                            />
                                            {/*<TextField*/}
                                                {/*id="outlined-dense"*/}
                                                {/*margin="dense"*/}
                                                {/*variant="outlined"*/}
                                                {/*placeholder="Difference"*/}

                                            {/*/>*/}
                                        </TableCell>
                                        <TableCell style={{fontSize: 13, width: '20%'}}>
                                            <TextField
                                                id="tenderedBallotCountFromBallotPaperAccount"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Ballot Paper A."
                                                onChange={this.handleInputChange(pollingStation.officeId, "tenderedBallotCountFromBallotPaperAccount")}
                                            />
                                            <TextField
                                                id="tenderedBallotCountFromBoxCount"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Box Count"
                                                onChange={this.handleInputChange(pollingStation.officeId, "tenderedBallotCountFromBoxCount")}
                                            />
                                            {/*<TextField*/}
                                                {/*id="outlined-dense"*/}
                                                {/*margin="dense"*/}
                                                {/*variant="outlined"*/}
                                                {/*placeholder="Difference"*/}
                                            {/*/>*/}
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
                            className="button">Submit</Button>
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

export default CE201Entry;
