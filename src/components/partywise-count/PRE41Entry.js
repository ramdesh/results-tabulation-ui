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
    Paper,
    Breadcrumbs,
    Link
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

            candidatesList: [],
            candidatesMap: {},
            content: {},
            tallySheetId: 0,
            reportId: 0,
            officeId: 0,

            rejected:0,
            rejectedVotes:0,
            grandTotal :0,
            sum:0,
            vals:0,
            tallySheetVersionId: 1,
        };
        this.calculation = [0];
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

    // submit the form data
    handleSubmit = (event) => {
        const {name} = this.props.match.params
        const {name2} = this.props.match.params
        console.log("Id office >>> ", name2)

        event.preventDefault()
        if (this.state.content[1].count === null || this.state.content[2].count === null ||
            this.state.content[1].countInWords === null || this.state.content[2].countInWords === null) {
            alert("Please Enter the necessary fields !")

        } else {
            axios.post('/tally-sheet/PRE-41/' + name + '/version', {
                "content": this.state.candidatesList.map((candidateId) => {
                    return {
                        "candidateId": candidateId,
                        "count": parseInt(this.state.content[candidateId].count),
                        "countInWords": this.state.content[candidateId].countInWords
                    }
                }),
                    "summary": {
                        "rejectedVoteCount": parseInt(this.state.rejected)
                    }
            },
                {
                    headers: {
                        'authorization': "Bearer "+localStorage.getItem('token'),
                    }
                }
            )
                .then(res => {
                    console.log(res);
                    console.log("Result Test" + res.data.htmlUrl);
                    console.log("Result Test1" + res.data[0]);
                    // alert("Successfully Created the TallySheet - PRE41")
                    // const htmlURL = res.data.htmlUrl
                    // window.open(htmlURL, "_blank")
                    this.props.history.replace('/PRE41Report/'+this.state.tallySheetId+'/'+ this.state.tallySheetVersionId)


                }).catch((error) => console.log(error));
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

    // handleInputChange = (invalidTypeId, property) => (event) => {
    //     this.calculation[invalidTypeId] = parseInt(event.target.value);
    //     console.log(this.calculation);
    //
    //     this.setState({
    //         ...this.state,
    //         content: {
    //             ...this.state.content,
    //             [invalidTypeId]: {
    //                 ...this.state.content[invalidTypeId],
    //                 [property]: event.target.value
    //             }
    //         }
    //     })
    //
    //     this.setState({
    //         sum: this.calculation.reduce((total, amount) => total + amount)
    //     })
    // }

    /** Rejected **/
    handleRejected = event => {
        this.setState({rejected: event.target.value, name: event.target.name});
        console.log("Rejected:" + event.target.value)
    }


    handleInputChange = (candidateId, property) => (event) => {
        const name = event.target.name
        console.log("NN",event.target.name);
        if ((name) === "votes"+candidateId){
            this.calculation[candidateId] = parseInt(event.target.value);
            console.log(this.calculation);
        }else{
            console.log("NaN");
        }
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

        this.setState({
            sum: this.calculation.reduce((total, amount) => total + amount)
        })
    }

    componentDidMount() {
        const {name} = this.props.match.params
        console.log("tally sheet Id ", name)
        this.setState({
            tallySheetId: name
        })
        const {name2} = this.props.match.params
        console.log("Counting Hall No (Name) ", name2)
        this.setState({
            officeId: name2
        })
        console.log("Set >>> ", this.state.tallySheetId)
        console.log("Set >>> ", this.state.officeId)
        console.log("Token added")
        axios.get('/election?limit=1000&offset=0', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
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
            <div style={{backgroundColor:'#fff8e8',padding: '3%'}}>
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
                            <Link color="inherit" href="/Home">
                                Data Entry
                            </Link>
                            <Link color="inherit">
                                Votes - PRE 41
                            </Link>
                            <Link color="inherit">
                                Tally Sheet
                            </Link>
                            {/*<Typography color="textPrimary"></Typography>*/}
                        </Breadcrumbs>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            PRE-41 - Counting Hall No : {this.props.match.params.name2}
                            {/*PRE-41 - Tally Sheet ID : {this.props.match.params.name}*/}
                        </Typography>
                    </div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header"
                                               style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
                                        No</TableCell>
                                    <TableCell className="header" style={{
                                        color: 'white',
                                        fontSize: 13,
                                        fontWeight: 'bold'
                                    }}>Symbol</TableCell>
                                    <TableCell className="header"
                                               style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Name of
                                        Candidate</TableCell>

                                    <TableCell className="header"
                                               style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>No of votes in
                                        words</TableCell>
                                    <TableCell className="header"
                                               style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>No of votes in
                                        figures</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.candidatesList.map((candidateId, idx) => {

                                    var candidate = this.state.candidateMap[candidateId];
                                    return <TableRow>
                                        <TableCell
                                            style={{width: '4%', fontSize: 13}}>{idx+1}</TableCell>
                                        <TableCell
                                            style={{width: '20%', fontSize: 13}}>{candidate.partyName}</TableCell>
                                        <TableCell
                                            style={{width: '30%', fontSize: 13}}>{candidate.candidateName}</TableCell>

                                        <TableCell style={{width: '30%', fontSize: 13}}>

                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                label="No of votes in words"
                                                name={'votesWords' + (idx + 1)}
                                                autoComplete='off'
                                                onChange={this.handleInputChange(candidateId, "countInWords")}
                                            />
                                        </TableCell>
                                        <TableCell style={{width: '25%', fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                label="No of votes"
                                                name={'votes' + (idx + 1)}
                                                autoComplete='off'
                                                defaultValue={this.state.vals}
                                                onChange={this.handleInputChange(candidateId, "count")}
                                            />
                                        </TableCell>

                                    </TableRow>
                                })}


                                <TableRow>
                                    <TableCell
                                        style={{width: '4%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{width: '20%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{width: '30%', fontSize: 13}}></TableCell>
                                    <TableCell style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>Total
                                        Votes :</TableCell>

                                    {this.state.sum > 0 && <TableCell
                                        style={{paddingLeft: '2%', width: '30%', fontSize: 16, fontWeight: 'bold'}}>
                                        {this.state.sum}
                                    </TableCell>}

                                    {/*<TableCell style={{paddingLeft:'2%',width: '30%', fontSize: 16,fontWeight: 'bold'}}>*/}
                                    {/*{this.state.sum}*/}
                                    {/*</TableCell>*/}
                                </TableRow>

                                <TableRow>
                                    <TableCell
                                        style={{width: '4%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{width: '20%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{width: '30%', fontSize: 13}}></TableCell>
                                    <TableCell style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>Rejected
                                        Votes :</TableCell>
                                    <TableCell
                                        style={{ fontSize: 14,}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            label="Rejected Votes"
                                            autoComplete='off'
                                            onChange={this.handleRejected}
                                        /></TableCell>
                                    {/*<TableCell style={{paddingLeft:'2%',width: '30%', fontSize: 16,fontWeight: 'bold'}}>*/}
                                    {/*{this.state.sum}*/}
                                    {/*</TableCell>*/}
                                </TableRow>

                                <TableRow>
                                    <TableCell
                                        style={{width: '4%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{width: '20%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{width: '30%', fontSize: 13}}></TableCell>
                                    <TableCell style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>Grand Total :</TableCell>


                                    {(this.state.sum + parseInt(this.state.rejected))> 0 && <TableCell
                                        style={{paddingLeft: '2%', width: '30%', fontSize: 16, fontWeight: 'bold'}}>
                                        { (this.state.sum + parseInt(this.state.rejected)) }
                                    </TableCell>}

                                    {/*<TableCell style={{paddingLeft:'2%',width: '30%', fontSize: 16,fontWeight: 'bold'}}>*/}
                                    {/*{this.state.sum}*/}
                                    {/*</TableCell>*/}
                                </TableRow>

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

export default PRE41Entry;
