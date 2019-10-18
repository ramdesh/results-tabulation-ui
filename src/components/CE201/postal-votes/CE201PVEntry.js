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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            setOpen: false
        };
    }

    handleClickOpen() {
        this.setState({open: true});
    }
    handleBack() {
        this.props.history.goBack()
    }

    // submit the form data
    handleSubmit = (event) => {
         alert("Successfully Created the TallySheet - CE 201 PV")
         this.props.history.push('/Home')
    }

    // modal controllers
    handleClose() {
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selected: event.target.value, name: event.target.name});
    };

    componentDidMount() {
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

                    {/*<div style={{marginBottom: '3%'}}>*/}
                        {/*<Typography variant="h4" gutterBottom>*/}
                            {/*Presidential Election 2019*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="h6" gutterBottom>*/}
                            {/*CE-201 - Counting Hall No : {this.props.match.params.name2}*/}
                            {/*/!*CE-201 - Tally Sheet ID : {this.props.match.params.name}*!/*/}
                        {/*</Typography>*/}
                    {/*</div>*/}
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            CE 201 - Postal Votes / Counting Hall No : {this.props.match.params.tallySheetVersionId}
                        </Typography>

                    </div>


                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
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
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                        Total No of PV-A packets found in the boxes :
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        {/*<TextField*/}
                                            {/*id="outlined-dense"*/}
                                            {/*margin="dense"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                        Total No packets rejected on various grounds after opening A covers :
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        {/*<TextField*/}
                                        {/*id="outlined-dense"*/}
                                        {/*margin="dense"*/}
                                        {/*variant="outlined"*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                        Total No packets rejected on various grounds after opening B covers in accepted ballot papers
                                        receptacle :
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        {/*<TextField*/}
                                        {/*id="outlined-dense"*/}
                                        {/*margin="dense"*/}
                                        {/*variant="outlined"*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold',fontSize: 14}}>

                                        No of postal ballot papers for the count in the receptable for accepted ballot papers
                                        :
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        {/*<TextField*/}
                                        {/*id="outlined-dense"*/}
                                        {/*margin="dense"*/}
                                        {/*variant="outlined"*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell style={{fontSize: 13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            autoComplete='off'
                                        />
                                    </TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>

                </div>
                {/*<div style={{marginTop: '2%', marginBottom: '2%'}}>*/}
                {/*<Typography variant="body2" gutterBottom>*/}
                {/*The Total 2 :*/}
                {/*</Typography>*/}
                {/*</div>*/}
                <div style={{marginLeft:'80%',marginTop:'2%'}}>

                    <Button style={{borderRadius: 18,color:'white',marginRight: '4%'}}   onClick={this.handleBack} className="button">Back</Button>
                    <Button style={{borderRadius: 18, color: 'white'}} onClick={this.handleSubmit}
                            className="button">Submit</Button>
                </div>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                {/*Open alert dialog*/}
                {/*</Button>*/}
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

export default CE201PVEntry;
