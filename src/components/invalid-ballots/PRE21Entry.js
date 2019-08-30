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

            candidatesList: [],
            candidatesMap: {},
            content: {},

            invalidTypesList : [],
            invalidTypesMap : {},

        };
    }

    setElection1(election) {
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

    setElection(election) {
        var invalidTypes = election.invalidVoteCategories;
        var invalidTypesMap = {};
        var content = {};
        console.log("Check",invalidTypes)

        var invalidTypesList = invalidTypes.map((invalidType) => {
            // var invalidType = invalidType.candidates[0];
            // candidate.partyName = invalidType.partyName;
            console.log("Loop",invalidType)

            invalidTypesMap[invalidType.invalidVoteCategoryId] = invalidType;
            content[invalidTypes.invalidVoteCategoryId] = {
                "invalidVoteCategoryId":  invalidType.invalidVoteCategoryId,
                "count" : null
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
        this.setState({open: true});
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
        axios.get('/election?limit=20&offset=0', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0].invalidVoteCategories)
            this.setElection(res.data[0])
        }).catch((error) => console.log(error));
    }


    // componentDidMount() {
    //     console.log("Election Result Test")
    //     // let token = localStorage.getItem('id_token');
    //     axios.get('/office?limit=20&offset=0&electionId=1', {
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET',
    //             'Access-Control-Allow-Headers': 'Content-Type',
    //             'X-Requested-With': 'XMLHttpRequest'
    //         }
    //     }).then(res => {
    //         console.log("Election" + res.data)
    //         this.setState({
    //             offices: res.data
    //         })
    //     })
    //         .catch((error) => console.log(error));
    // }

    render() {
        const {name} = this.props.match.params
        console.log("ff",this.state.invalidTypesMap)
        return (
            <div style={{margin: '3%',marginRight:'8%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <div style={{marginBottom: '3%'}}>
                            <Typography variant="h4" gutterBottom>
                                Presidential Election 2019
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Invalid Ballot Count ( PRE-21 ) - Polling Station ID : {this.props.match.params.name}
                            </Typography>
                        </div>

                    </div>


                    <Paper style={{margin: '3%'}}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>No</TableCell>
                                    <TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Ground For
                                        Rejection</TableCell>
                                    <TableCell style={{fontSize: 14,color:'black', fontWeight: 'bold'}}>No of Ballot Papers
                                        Rejected</TableCell>
                                </TableRow>
                            </TableHead>

                            < TableBody>
                                {this.state.invalidTypesList.map((invalidType, idx) => {
                                    var invalid = this.state.invalidTypesMap[invalidType];
                                    // var candidate = this.state.candidateMap[candidateId];

                                    return <TableRow>
                                        <TableCell style={{fontSize: 13}}>{invalid.invalidVoteCategoryId}</TableCell>

                                        <TableCell
                                            style={{fontSize: 13}}>{invalid.categoryDescription}</TableCell>

                                        <TableCell style={{width:'30%',fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="No of papers"
                                                name={'votes' + (idx + 1)}
                                                // onChange={this.handleInputChange(invalidType, "count")}

                                            />
                                        </TableCell>

                                    </TableRow>
                                })}
                                <TableRow>
                                    <TableCell style={{fontSize: 13}}></TableCell>
                                    <TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Total Rejected Ballot Count</TableCell>
                                <TableCell style={{width:'30%',fontSize: 13}}>
                                    <TextField
                                        id="outlined-dense"
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="Total"

                                    />
                                </TableCell>
                                </TableRow>

                            </TableBody>

                            {/*<TableBody>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{width:'70%',fontSize: 13}}>Does not bear the official mark</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}

                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13}}>Voted for more than one candidate</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}

                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13}}>Specified a second preference or a third*/}
                                        {/*preference only both such preference only</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13}}>Something is written or marked by which the voter*/}
                                        {/*can be identified</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}

                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13}}>Unmarked</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontSize: 13}}>Void for Uncertainty</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableCell style={{fontWeight:'bold',fontSize: 14}}>Total Rejected Ballot Count :</TableCell>*/}
                                    {/*<TableCell style={{fontSize: 13}}>*/}
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    {/*</TableCell>*/}
                                {/*</TableRow>*/}
                            {/*</TableBody>*/}
                        </Table>
                    </Paper>
                </div>

                <div style={{marginLeft: '69%', marginTop: '2%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleBack}
                            className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white'}} onClick={this.handleClickOpen}
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
