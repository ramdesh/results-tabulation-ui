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
    Paper, Grid
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PRE34COEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            open: false,
            offices: [],
            selected: 'Select',
            election: []
        };
    }

    // modal controllers
    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleBack() {
        this.props.history.replace('/PRE34CO')
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
            console.log("Election" + res.data[0].parties)
            this.setState({
                election: res.data[0].parties
            })
        }).catch((error) => console.log(error));
    }

    render() {
        const {name} = this.props.match.params
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Preferences ( PRE-34-CO ) - Polling Station : {this.props.match.params.name}
                        </Typography>
                    </div>

                    <Grid container spacing={1} style={{marginBottom: '1%'}}>
                        <Grid item xs={3.5}>
                            <Typography variant="h6" gutterBottom>
                                2nd and 3rd Preferences in favour of ( Candidate No 1 ) :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            />
                        </Grid></Grid>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Symbol</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Name of Candidate</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>No of 2nd
                                        Preferences</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>No of 3rd
                                        Preferences</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Not Counted</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Total</TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>

                    <Typography variant="body2" gutterBottom style={{marginTop: '2%'}}>
                        The Total no of 2nd and 3rd Preferences in favor of Candidate No 1 :
                    </Typography>
                    <Grid container spacing={1} style={{marginTop: '4%', marginBottom: '1%'}}>
                        <Grid item xs={3.5}>
                            <Typography variant="h6" gutterBottom>
                                2nd and 3rd Preferences in favour of ( Candidate No 2 ) :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            /></Grid></Grid>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Symbol</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Name of Candidate</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>No of 2nd
                                        Preferences</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>No of 3rd
                                        Preferences</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Not Counted</TableCell>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Total</TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 13}}>
                                            <TextField
                                                id="outlined-dense"
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>

                    <Typography variant="body2" gutterBottom style={{marginTop: '2%'}}>
                        The Total no of 2nd and 3rd Preferences in favor of Candidate No 2 :
                    </Typography>
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

export default PRE34COEntry;
