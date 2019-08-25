import React, {Component} from 'react'
import axios from 'axios';
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
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: false,
            election: [],
            offices: [],
            selected: 'Select',
            setOpen: false,

            votes1:null,
            votes2:null,
            votes3:null,
            votes4:null,
            votes5:null,

            votesWords1:null,
            votesWords2:null,
            votesWords3:null,
            votesWords4:null,
            votesWords5:null,
            agent1:null,
            agent2:null,
            agent3:null,
            agent4:null,
            agent5:null,
        };
    }

    handleSubmit = (event) => {
        console.log(this.state.votes1+" "+this.state.votesWords1)
        event.preventDefault()
        if (this.state.votes1 === null || this.state.votes2 === 0) {
            alert("Please Fill the necessary fields !")

        } else {
            // alert("new!")
            axios.post(`https://cors-anywhere.herokuapp.com/https://dev.tabulation.ecdev.opensource.lk/tally-sheet/PRE-41/14/version`,  {
                "tallySheetContent": [
                    {
                        "candidateId": 1,
                        "count": parseInt(this.state.votes1),
                        "countInWords": this.state.votesWords1
                    },
                    {
                        "candidateId": 2,
                        "count": parseInt(this.state.votes2),
                        "countInWords": this.state.votesWords2
                    },
                    {
                        "candidateId": 3,
                        "count": parseInt(this.state.votes3),
                        "countInWords": this.state.votesWords3
                    },
                    {
                        "candidateId": 4,
                        "count": parseInt(this.state.votes4),
                        "countInWords": this.state.votesWords4
                    }
                ]
            })
            .then(res => {
                    console.log(res);
                    console.log("mmlmkmk"+res.data);
            })
        }
    }

    handleInputChange = (event) => {
        console.log("open",event.target.name)
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log("No of votes 1",this.state.votes1)
        console.log("No of votes 2",this.state.votes2)
        console.log("No of votes Words 1",this.state.votesWords1)
        console.log("No of agent 1",this.state.agent1)
    }

    handleClickOpen() {
        console.log("open")
        this.setState({open: true});
    }

    handleBack() {
        this.props.history.replace('/PRE41')
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };

    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://dev.tabulation.ecdev.opensource.lk/election?limit=20&offset=0', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].parties)
            this.setState({
                election: res.data[0].parties
            })
        }).catch((error) => console.log(error));
        // axios.post(`https://cors-anywhere.herokuapp.com/https://dev.tabulation.ecdev.opensource.lk/tally-sheet/PRE-41/10/version`,  {
        //     "tallySheetContent": [
        //         {
        //             "candidateId": 3,
        //             "count": 100,
        //             "countInWords": "One Hundreas"
        //         }
        //     ]
        // })
        //     .then(res => {
        //         console.log(res);
        //         console.log(""+res.data);
        //     })
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Presidential Election 2019 - Party-Wise Count ( PRE-41 ) - Polling Station : A
                        </Typography>

                    </div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize:13,fontWeight:'bold'}}>Symbol</TableCell>
                                    <TableCell style={{fontSize:13,fontWeight:'bold'}}>Name of Candidate</TableCell>
                                    <TableCell style={{fontSize:13,fontWeight:'bold'}}>No of votes in words</TableCell>
                                    <TableCell style={{fontSize:13,fontWeight:'bold'}}>No of votes in figures</TableCell>
                                    <TableCell style={{fontSize:13,fontWeight:'bold'}}>Agent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.election.map((party, idx) => (
                                    <TableRow>
                                        <TableCell style={{fontSize: 13}}>{party.partyName}</TableCell>

                                        <TableCell
                                            style={{fontSize: 13}}>{party.candidates[0].candidateName}</TableCell>

                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="No of Votes"
                                                name={'votes'+(idx+1)}
                                                onChange={this.handleInputChange}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                name={'votesWords'+(idx+1)}
                                                onChange={this.handleInputChange}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                name={'agent'+(idx+1)}
                                                onChange={this.handleInputChange}
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
