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
    Paper
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PRE41Entry extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.setElection = this.setElection.bind(this);
        this.state = {
            open: false,
            selected: 'Select',
            tallySheetID: 24,
            candidatesList: [],
            candidatesMap: {},
            content: {}
        };
    }

    setElection(election) {
        var parties = election.parties;
        var candidateMap = {};
        var content = {};
        var candidatesList = parties.map((party) => {
            var candidate = party.candidates[0];
            candidate.partyName = party.partyName;

            candidateMap[candidate.candidateId] = candidate;
            content[candidate.candidateId] = {
                "candidateId": candidate.candidateId,
                "count": null,
                "countInWords": null
            };
            return candidate.candidateId
        })
        this.setState({
            candidatesList,
            candidateMap,
            content
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.content[1].count === null || this.state.content[2].count === null ||
            this.state.content[3].count === null || this.state.content[4].count === null ||
            this.state.content[1].countInWords === null || this.state.content[2].countInWords === null ||
            this.state.content[3].countInWords === null || this.state.content[4].countInWords === null) {
            alert("Please Enter the necessary fields !")

        } else {
            axios.post('/tally-sheet/PRE-41/' + this.state.tallySheetID + '/version', {
                "content": this.state.candidatesList.map((candidateId) => {
                    return {
                        "candidateId": candidateId,
                        "count": parseInt(this.state.content[candidateId].count),
                        "countInWords": this.state.content[candidateId].countInWords
                    }
                })
            })
                .then(res => {
                    console.log(res);
                    console.log("Result Test" + res.data);
                    alert("Successfully Created the TallySheet - PRE41")
                    axios.post('/report/5/version')
                        .then(res => {
                            console.log(res);
                            console.log("Result NEW " + res.data.reportFile.urlInline);
                            const link = res.data.reportFile.urlInline
                            window.open(res.data.reportFile.urlInline, "_blank")
                            // this.props.history.replace('/Main')
                        })

                })
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleBack() {
        this.props.history.replace('/PRE41')
    }

    // modal controllers
    handleClose() {
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };

    handleInputChange = (candidateId, property) => (event) => {
        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                [candidateId]: {
                    ...this.state.content[candidateId],
                    [property]: event.target.value
                }
            }
        })
    }

    componentDidMount() {
        const {name} = this.props.match.params
        console.log("ld", name)
        axios.get('/election?limit=20&offset=0', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].parties)
            this.setElection(res.data[0])
        }).catch((error) => console.log(error));
    }

    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Party-Wise Count ( PRE-41 ) - Polling Station ID : {this.props.match.params.name}
                        </Typography>
                    </div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{color:'black',fontSize: 13, fontWeight: 'bold'}}>Symbol</TableCell>
                                    <TableCell style={{color:'black',fontSize: 13, fontWeight: 'bold'}}>Name of Candidate</TableCell>
                                    <TableCell style={{color:'black',fontSize: 13, fontWeight: 'bold'}}>No of votes in
                                        figures</TableCell>
                                    <TableCell style={{color:'black',fontSize: 13, fontWeight: 'bold'}}>No of votes in
                                        words</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.candidatesList.map((candidateId, idx) => {

                                    var candidate = this.state.candidateMap[candidateId];

                                    return <TableRow>
                                        <TableCell style={{fontSize: 13}}>{candidate.partyName}</TableCell>

                                        <TableCell
                                            style={{fontSize: 13}}>{candidate.candidateName}</TableCell>

                                        <TableCell style={{width:'30%',fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="No of votes"
                                                name={'votes' + (idx + 1)}
                                                onChange={this.handleInputChange(candidateId, "count")}
                                            />
                                        </TableCell>
                                        <TableCell style={{width:'40%',fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="No of votes in words"
                                                name={'votesWords' + (idx + 1)}
                                                onChange={this.handleInputChange(candidateId, "countInWords")}
                                            />
                                        </TableCell>
                                    </TableRow>
                                })}

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

export default PRE41Entry;
