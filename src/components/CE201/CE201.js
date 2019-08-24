import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {
    Typography,
    Button,
    FormControl,
    TextField,
    InputLabel,
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
import MenuItem from '@material-ui/core/MenuItem';

class CE201 extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            open: false,
            allUsers: [],
            offices: [],
            selected: 'Select',
            setOpen: false,
            election: []
        };
    }

    // dialog controllers
    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
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
        })
            .catch((error) => console.log(error));

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
                           Ballot Count ( CE-201 )
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            This is to be filled at the counting centres. It's the 2nd and 3rd Preferences counted in
                            favour of the each of the
                            remaining two candidates.
                        </Typography>
                    </div>

                    <Grid container spacing={3} style={{marginBottom: '2%'}}>
                        <Grid item xs={6} sm={3}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    District Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                    {this.state.offices.map((office, idx) => (
                                        <MenuItem value={office.officeName}>{office.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    Counting Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                    {this.state.offices.map((day1, idx) => (
                                        <MenuItem value={day1.officeName}>{day1.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/*<h3>Selected Country - {this.state.selected}</h3>*/}
                    </Grid>

                    <Grid container spacing={1} style={{marginBottom: '1%'}}>
                        <Grid item xs={3.5}>
                            <Typography variant="h6" gutterBottom>
                                2nd and 3rd Preferences in favour of ( Candidate No 1 ) :
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
                </div>
                <div style={{marginTop: '2%', marginBottom: '2%'}}>
                    <Typography variant="body2" gutterBottom>
                        The Total no of 2nd and 3rd Preferences in favor of Candidate No 2 :
                    </Typography>
                </div>
                <div style={{align: 'right'}}>
                    <Button style={{margin: '1%'}} onClick={this.handleClickOpen} className="button">Save</Button>
                    <Button className="button">Submit</Button>
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

export default CE201;
