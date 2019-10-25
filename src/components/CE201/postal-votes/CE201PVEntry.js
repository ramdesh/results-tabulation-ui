import React, {Component} from 'react'
import axios from '../../../axios-base';
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
class CE201PVEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: false,
            allUsers: [],
            areas: [],
            selected: 'Select',
            setOpen: false,
            tallySheetId:0,


            ballotBoxId1:0,
            ballotBoxId2:0,
            ballotBoxId3:0,
            numberOfAPacketsFound1:0,
            numberOfAPacketsFound2:0,
            numberOfAPacketsFound3:0,
            numberOfPacketsInserted1:0,
            numberOfPacketsInserted2:0,
            numberOfPacketsInserted3:0,

            numberOfACoversRejected:0,
            numberOfBCoversRejected:0,
            numberOfValidBallotPapers:0
        };
    }

    handleClickOpen() {
        this.setState({open: true});
    }
    handleBack() {
        this.props.history.goBack()
    }


    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
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
        axios.post('/tally-sheet/CE-201-PV/' + tallySheetId + '/version',

            {
                "content": [
                    {
                        "ballotBoxId": this.state.ballotBoxId1,
                        "numberOfAPacketsFound": parseInt(this.state.numberOfAPacketsFound1),
                        "numberOfPacketsInserted": parseInt(this.state.numberOfPacketsInserted1)
                    },
                    {
                        "ballotBoxId": this.state.ballotBoxId2,
                        "numberOfAPacketsFound": parseInt(this.state.numberOfAPacketsFound2),
                        "numberOfPacketsInserted": parseInt(this.state.numberOfPacketsInserted2)
                    },
                    {
                        "ballotBoxId": this.state.ballotBoxId3,
                        "numberOfAPacketsFound": parseInt(this.state.numberOfAPacketsFound2),
                        "numberOfPacketsInserted": parseInt(this.state.numberOfPacketsInserted2)
                    }
                ],
                "summary": {
                    "numberOfACoversRejected": parseInt(this.state.numberOfACoversRejected),
                    "numberOfBCoversRejected": parseInt(this.state.numberOfBCoversRejected),
                    "numberOfValidBallotPapers": parseInt(this.state.numberOfValidBallotPapers),
                    "situation": "",
                    "timeOfCommencementOfCount": "2019-10-25T15:21:18.405Z"
                }
            }


            // {
            //     "content": this.state.candidatesList.map((candidateId) => {
            //         return {
            //             "candidateId": candidateId,
            //             "count": parseInt(this.state.content[candidateId].count),
            //             "countInWords": this.state.content[candidateId].countInWords
            //         }
            //     }),
            //     "summary": {
            //         "rejectedVoteCount": parseInt(this.state.summary.rejectedVoteCount)
            //     }
            // }
            //
            //
            ,
            {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token'),
                }
            }
        )
            .then(res => {
                // console.log("Result" + res.data.latestVersionId);
                // console.log(res.data.htmlUrl);
                // alert("Successfully Created the TallySheet - PRE41")
                this.props.history.push('/CE201PVReport/' + this.state.tallySheetId + '/' + res.data.tallySheetVersionId)


            }).catch((error) => console.log(error));
        //}
    }


    // submit the form data
    // handleSubmit = (event) => {
    //      alert("Successfully Created the TallySheet - CE 201 PV")
    //      this.props.history.push('/Home')
    // }

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

        axios.get('/area?limit=20&offset=0&electionId=1', {
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                areas: res.data
            })
        })
            .catch((error) => console.log(error));
    }

    render() {
        const {name} = this.props.match.params
        return (
            <div style={{margin: '3%'}}>
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
                            Postal Votes - CE 201
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
                            CE 201 - Postal Votes / Counting Hall No : {this.props.match.params.tallySheetVersionId}
                        </Typography>
                    </div>


                    <Paper>
                        <Table>
                            <TableHead>

                                <TableRow>
                                    <TableCell className="header"
                                               style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
                                        No</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Serial No of Postal Votes Ballot Box</TableCell>
                                    <TableCell className="header"
                                        style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>No of Packets inserted by the Returning Officer</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>No of PV-A Packets found inside the Ballot Box after the count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}>1</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            name="ballotBoxId1"
                                            onChange={this.handleInputChange}


                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfAPacketsFound1"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfPacketsInserted1"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}>2</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            name="ballotBoxId2"

                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfAPacketsFound2"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfPacketsInserted2"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}>3</TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            name="ballotBoxId3"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfAPacketsFound3"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfPacketsInserted3"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{fontSize: 13}}></TableCell>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>
                                        Total No of PV-A packets found in the boxes :
                                    </TableCell>

                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            name="numberOfACoversRejected"
                                            type="number"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{fontSize: 13}}></TableCell>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                        Total No packets rejected on various grounds after opening A covers :
                                    </TableCell>


                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfBCoversRejected"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{fontSize: 13}}></TableCell>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                        Total No packets rejected on various grounds after opening B covers in accepted ballot papers
                                        receptacle :
                                    </TableCell>

                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                            type="number"
                                            name="numberOfValidBallotPapers"
                                            onChange={this.handleInputChange}
                                        />
                                    </TableCell>

                                </TableRow>

                                {/*<TableRow>*/}
                                    {/*<TableCell*/}
                                        {/*style={{width: '6%', fontSize: 13}}></TableCell>*/}
                                    {/*<TableCell*/}
                                        {/*style={{fontSize: 13}}></TableCell>*/}
                                    {/*<TableCell style={{fontWeight: 'bold',fontSize: 14}}>*/}

                                        {/*No of postal ballot papers for the count in the receptable for accepted ballot papers*/}
                                        {/*:*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}

                                    {/*</TableCell>*/}

                                {/*</TableRow>*/}

                                <TableRow>
                                    <TableCell
                                        style={{width: '6%', fontSize: 13}}></TableCell>
                                    <TableCell
                                        style={{fontSize: 13}}></TableCell>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                     Situation :
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                        id="outlined-dense"
                                        name="lastName"
                                        margin="dense"
                                        variant="outlined"
                                        autoComplete='off'
                                        onChange={this.handleInputChange}
                                        />
                                    </TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>

                </div>

                <div style={{marginLeft:'80%',marginTop:'2%'}}>

                    <Button style={{borderRadius: 18,color:'white',marginRight: '4%'}}   onClick={this.handleBack} className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white'}} onClick={this.handleSubmit}
                            className="button">Submit</Button>
                </div>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                {/*Open alert dialog*/}
                {/*</Button>*/}

            </div>
        )
    }
}

export default CE201PVEntry;
