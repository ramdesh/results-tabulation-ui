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

class PRE41PVEntry extends Component {
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
            setOpen: false
        };
    }

    handleClickOpen() {
        console.log("open")
        this.setState({open: true});
    }

    handleBack() {
        this.props.history.replace('/PRE41PV')
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
        console.log("Election Result Test")
        // let token = localStorage.getItem('id_token');
        axios.get('https://cors-anywhere.herokuapp.com/https://dev.tabulation.ecdev.opensource.lk/office?limit=20&offset=0&electionId=1', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data)
            this.setState({
                offices: res.data
            })
        })
            .catch((error) => console.log(error));
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h5" gutterBottom>
                            Presidential Election 2019 - Party-Wise Count ( PRE-41 ) : Postal Votes - Polling Station : A
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
                                <TableRow>
                                    <TableCell style={{fontSize:13}}>Elephant</TableCell>
                                    <TableCell style={{fontSize:13}}>ABC Perera</TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontSize:13}}>Swan</TableCell>
                                    <TableCell style={{fontSize:13}}>DLU Ramanayake</TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize:13}}>Bell</TableCell>
                                    <TableCell style={{fontSize:13}}>JKL Fernando</TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize:13}}>Tree</TableCell>
                                    <TableCell style={{fontSize:13}}>MRKG Perera</TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize:13}}>Chair</TableCell>
                                    <TableCell style={{fontSize:13}}>DSW Silva</TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell style={{fontSize:13}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div style={{marginLeft: '80%', marginTop: '2%'}}>
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

export default PRE41PVEntry;
