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

class PRE41New extends Component {
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
            areaId: 0,

            rejected: 0,
            rejectedVotes: 0,
            grandTotal: 0,
            sum: 0,
            vals: 0,
            tallySheetVersionId: 0,
            latestVersionId: 0,
            // filledData:[]
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
                "count": undefined,
                "countInWords": undefined
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
        const {tallySheetId} = this.props.match.params
        console.log("tallySheet ID :", tallySheetId)
        event.preventDefault()
        // if (this.state.content[1].count === null || this.state.content[2].count === null ||
        //     this.state.content[1].countInWords === null || this.state.content[2].countInWords === null) {
        //     alert("Please Enter the necessary fields !")
        //
        // } else {
        axios.post('/tally-sheet/PRE-41/' + tallySheetId + '/version', {
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
                    'authorization': "Bearer " + localStorage.getItem('token'),
                }
            }
        )
            .then(res => {
                console.log("Result" + res.data.latestVersionId);
                console.log(res.data.htmlUrl);
                // alert("Successfully Created the TallySheet - PRE41")
                this.props.history.push('/PRE41Report/' + this.state.tallySheetId + '/' + res.data.tallySheetVersionId)


            }).catch((error) => console.log(error));
        //}
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleBack() {
        this.props.history.push('/PRE41')

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

    getInputValue(candidateId, property) {
        const value = this.state.content[candidateId][property];
        if (!value) {
            return undefined
        } else {
            return value
        }
    }

    setInputValue(candidateId, property, value) {
        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                [candidateId]: {
                    ...this.state.content[candidateId],
                    [property]: value
                }
            }
        })
    }


    handleInputChange = (candidateId, property) => (event) => {
        const value = event.target.value
        this.setInputValue(candidateId, property, value)

        // console.log("NN",event.target.name);
        // if ((name) === "votes"+candidateId){
        //     this.calculation[candidateId] = parseInt(event.target.value);
        //     console.log(this.calculation);
        // }else{
        //     console.log("NaN");
        // }
        // this.setState({
        //     ...this.state,
        //     content: {
        //         ...this.state.content,
        //         [candidateId]: {
        //             ...this.state.content[candidateId],
        //             [property]: event.target.value
        //         }
        //     }
        // })
        //
        // this.setState({
        //     sum: this.calculation.reduce((total, amount) => total + amount)
        // })
    }

    componentDidMount() {
        const {tallySheetId} = this.props.match.params
        console.log("tally sheet Id ", tallySheetId)
        this.setState({
            tallySheetId: tallySheetId
        })

        // const {tallySheetVersionId} = this.props.match.params
        // console.log("tally sheet version Id ", tallySheetVersionId)
        // this.setState({
        //     tallySheetVersionId: tallySheetVersionId
        // })
        // const {countingId} = this.props.match.params
        // console.log("Counting Hall No (Name) ", countingId)
        // this.setState({
        //     areaId: countingId
        // })

        // console.log("Set >>> ", this.state.tallySheetId)
        // console.log("Set >>> ", this.state.areaId)
        // console.log("Token added")


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
            console.log("New tally VERSION", res.data.latestVersionId)
            this.setState({
                latestVersionId: res.data.latestVersionId
            })
            if (res.data.latestVersionId === "null") {
                // alert("No Latest version for here !")
            } else {

                axios.get('/election?limit=1000&offset=0', {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token'),
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then(res => {
                    console.log("Election" + res.data[0].parties)
                    this.setElection(res.data[0])

                    axios.get('/tally-sheet/PRE-41/' + tallySheetId + '/version/' + this.state.latestVersionId, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token'),
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then(res => {
                        // console.log("get PRE 41 > >" + res.data.htmlUrl)
                        // console.log("get PRE 41 nndd > >" + res.data.content)
                        // this.setState({
                        //     filledData: res.data.content
                        // })

                        const candidateWiseCounts = res.data.content;
                        for (var i = 0; i < candidateWiseCounts.length; i++) {
                            let candidateWiseCount = candidateWiseCounts[i];
                            this.setInputValue(candidateWiseCount.candidateId, "count", candidateWiseCount.count);
                            this.setInputValue(candidateWiseCount.candidateId, "countInWords", candidateWiseCount.countInWords);
                        }
                        // debugger;
                        // console.log("filled data> >" + this.state.filledData)
                    }).catch((error) => console.log(error));

                }).catch((error) => console.log(error));

            }
        })
            .catch((error) => console.log(error));


    }

    render() {
        return (
            <div style={{backgroundColor: '#fff8e8', padding: '3%'}}>
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
                                            style={{width: '4%', fontSize: 13}}>{idx + 1}</TableCell>
                                        <TableCell
                                            style={{width: '20%', fontSize: 13}}>{candidate.partyName}</TableCell>
                                        <TableCell
                                            style={{width: '30%', fontSize: 13}}>{candidate.candidateName}</TableCell>

                                        <TableCell style={{width: '30%', fontSize: 13}}>

                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                // label={this.state.filledData[idx].count}
                                                // name={'votesWords' + (idx + 1)}
                                                //defaultValue={this.state.filledData[idx].countInWords}
                                                // placeholder={this.state.filledData[idx].countInWords}
                                                value={this.getInputValue(candidateId, "countInWords")}
                                                autoComplete='off'
                                                onChange={this.handleInputChange(candidateId, "countInWords")}
                                            />
                                        </TableCell>
                                        <TableCell style={{width: '25%', fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                //label="No of votes"
                                                // name={'votes' + (idx + 1)}
                                                autoComplete='off'
                                                //defaultValue={this.state.filledData[idx].count}
                                                value={this.getInputValue(candidateId, "count")}
                                                // defaultValue={this.state.vals}
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
                                        style={{fontSize: 14,}}>
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
                                    <TableCell style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>Grand Total
                                        :</TableCell>


                                    {(this.state.sum + parseInt(this.state.rejected)) > 0 && <TableCell
                                        style={{paddingLeft: '2%', width: '30%', fontSize: 16, fontWeight: 'bold'}}>
                                        {(this.state.sum + parseInt(this.state.rejected))}
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

            </div>
        )
    }
}

export default PRE41New;
