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

class PRE21Entry extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: false,
            allUsers: [],
            offices: [],
            selected: 'Select',
            setOpen: false,

            invalidTypesList: [],
            invalidTypesMap: {},
            content: {},
            tallySheetId: 0,
            reportId: 0,
            officeId: 0,
            sum: 0,
            errorText:''

        };
        this.calculation = [0];

    }

    setElection(election) {
        var invalidTypes = election.invalidVoteCategories;
        var invalidTypesMap = {};
        var content = {};
        console.log("Check", invalidTypes)

        var invalidTypesList = invalidTypes.map((invalidType) => {
            // var invalidType = invalidType.candidates[0];
            // candidate.partyName = invalidType.partyName;
            console.log("Loop", invalidType)

            invalidTypesMap[invalidType.invalidVoteCategoryId] = invalidType;
            content[invalidTypes.invalidVoteCategoryId] = {
                "count": null,
                "invalidVoteCategoryId": invalidType.invalidVoteCategoryId,
            };
            return invalidType.invalidVoteCategoryId
        })

        this.setState({
            invalidTypesList,
            invalidTypesMap,
            content
        })
    }

    handleClickOpen() {
        alert("Successfully Created the TallySheet - PRE21")
        this.props.history.replace('/Home')
    }

    handleBack() {
        this.props.history.replace('/PRE21')
    }

    // modal controllers
    handleClose() {
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };


    componentDidMount() {
        const {name} = this.props.match.params
        console.log("Id URL >>> ", name)
        this.setState({
            tallySheetId: name
        })
        const {name2} = this.props.match.params
        console.log("Id office >>> ", name2)
        this.setState({
            officeId: name2
        })
        console.log("Set >>> ", this.state.tallySheetId)
        console.log("Set >>> ", this.state.officeId)

        axios.get('/election?limit=1000&offset=0', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election NEW" + res.data[0].invalidVoteCategories)
            this.setElection(res.data[0])
        }).catch((error) => console.log(error));
    }

    /** submit the form data **/
    handleSubmit = (event) => {
        const {name} = this.props.match.params
        const {name2} = this.props.match.params
        console.log("Id office >>> ", name2)
        console.log("TALLY SHEET >>> ", name)
        event.preventDefault()
        // console.log("Content1" ,this.state.content[1])
        // console.log("Content2" ,this.state.content[2])

        if ( this.state.content[1] === undefined || this.state.content[2] === undefined ||
            this.state.content[4] === undefined || this.state.content[5] === undefined || this.state.content[6] === undefined )
        {
            alert("Please Enter the necessary fields !")
        } else {
            axios.post('/tally-sheet/PRE-21/' + name + '/version', {
                "content": this.state.invalidTypesList.map((invalidTypeId) => {
                    return {
                        "count": parseInt(this.state.content[invalidTypeId].count),
                        "invalidVoteCategoryId": invalidTypeId,
                    }
                })
            })
                .then(res => {
                    console.log("URL" + res.data.htmlUrl);
                    console.log("Result" + res.data[0]);
                    alert("Successfully Created the TallySheet - PRE 21")
                    const htmlURL = res.data.htmlUrl
                    window.open(htmlURL, "_blank")
                    this.props.history.replace('/Home')

                }).catch((error) => console.log(error));

        }
    }

    handleInputChange = (invalidTypeId, property) => (event) => {
        this.calculation[invalidTypeId] = parseInt(event.target.value);
        console.log(this.calculation);

        if (isNaN(event.target.value)) {
            console.log('Please Check the value for INT')
            this.setState({ errorText: 'Invalid format: ###-###-####' })
            alert('Value Allows only Numericals')
        }

        this.setState({
            ...this.state,
            content: {
                ...this.state.content,
                [invalidTypeId]: {
                    ...this.state.content[invalidTypeId],
                    [property]: event.target.value
                }
            }
        })

        this.setState({
            sum: this.calculation.reduce((total, amount) => total + amount)
        })
    }

    render() {
        const {name} = this.props.match.params
        return (
            <div style={{margin: '3%', marginRight: '8%'}}>
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
                                Votes - PRE 21
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
                            Invalid Ballot Count ( PRE-21 ) - Counting Hall No : {this.props.match.params.name2}
                        </Typography>
                    </div>


                    <Paper style={{margin: '3%'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header"
                                               style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>No</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>Ground For
                                        Rejection</TableCell>
                                    <TableCell className="header"
                                               style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>No of Ballot
                                        Papers
                                        Rejected</TableCell>
                                </TableRow>
                            </TableHead>

                            < TableBody>
                                {this.state.invalidTypesList.map((invalidType, idx) => {
                                    var invalid = this.state.invalidTypesMap[invalidType];
                                    // var candidate = this.state.candidateMap[candidateId];

                                    return <TableRow>
                                        <TableCell style={{fontSize: 13}}>{idx + 1}
                                            {/*{invalid.invalidVoteCategoryId}*/}
                                        </TableCell>
                                        <TableCell
                                            style={{fontSize: 13}}>{invalid.categoryDescription}</TableCell>

                                        <TableCell style={{width: '30%', fontSize: 13}}>
                                            <TextField
                                                id="invalidCategoryCount"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Count"
                                                onChange={this.handleInputChange(invalid.invalidVoteCategoryId, "count")}
                                            />

                                        </TableCell>

                                    </TableRow>
                                })}
                                <TableRow>
                                    <TableCell style={{fontSize: 13}}></TableCell>
                                    <TableCell style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>Total Rejected
                                        Ballot
                                        Count</TableCell>
                                    {this.state.sum > 0 && <TableCell
                                        style={{paddingLeft: '2%', width: '30%', fontSize: 16, fontWeight: 'bold'}}>
                                        {this.state.sum}
                                    </TableCell>}
                                    {/*<TableCell style={{paddingLeft:'2%',width: '30%', fontSize: 16,fontWeight: 'bold'}}>*/}
                                    {/*{this.state.sum}*/}
                                    {/*</TableCell>*/}
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div style={{marginLeft: '69%', marginTop: '2%'}}>
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

export default PRE21Entry;
