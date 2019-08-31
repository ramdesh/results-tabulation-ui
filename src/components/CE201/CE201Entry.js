import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
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

class CE201Entry extends Component {
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

            pollingStations : [],
            tallySheetId: 0,
            reportId:0,
            officeId:0
        };
    }

    handleClickOpen() {
        alert("Successfully Created the TallySheet - CE201")
        this.props.history.replace('/Home')
    }

    handleBack() {
        this.props.history.replace('/CE201')
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
        const {name} = this.props.match.params
        console.log("TallySheet ID : ", name)
        this.setState({
            tallySheetId: name
        })
        const {name2} = this.props.match.params
        console.log("Id office :", name2)
        this.setState({
            officeId: name2
        })

        axios.get('/office?limit=1000&offset=0&parentOfficeId='+name2, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Test" + res.data[0])
            this.setState({
                pollingStations: res.data
            })
            // this.setElection(res.data[0])
        }).catch((error) => console.log(error));
    }

    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            CE-201 - Tally Sheet ID : {this.props.match.params.name}
                        </Typography>
                    </div>


                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Polling Station</TableCell>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Ballot Box IDs</TableCell>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Invalid Ballot Paper Count</TableCell>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Issued Ballot Paper Count</TableCell>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Received Ballot P.C.</TableCell>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Ordinary Ballot Paper Count</TableCell>
                                    <TableCell style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>Tender Ballot Paper Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pollingStations.map((station, idx) => (
                                    <TableRow>
                                    <TableCell style={{fontSize: 13}}>
                                        {station.officeName}
                                    </TableCell>
                                    <TableCell style={{fontSize: 13 ,width: '13%'}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Box Id"
                                            placeholderTextSize = "8px"
                                        />
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Box Id"
                                        />
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Box Id"
                                        />
                                    </TableCell>
                                        <TableCell style={{fontSize: 13 ,width: '11%'}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Count"
                                        />
                                    </TableCell>
                                        <TableCell style={{fontSize: 13 ,width: '11%'}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Count"
                                        />
                                    </TableCell>
                                        <TableCell style={{fontSize: 13 ,width: '11%'}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Count"
                                        />
                                    </TableCell>
                                        <TableCell style={{fontSize: 13 ,width: '18%'}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Ballot Paper Account"
                                        />
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Box Count"
                                        />
                                    </TableCell>
                                        <TableCell style={{fontSize: 13 ,width: '18%'}}>
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Ballot Paper Account"
                                        />
                                        <TextField
                                            id="outlined-dense"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Box Count"
                                        />
                                    </TableCell>
                                </TableRow>
                                ))}

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
                    <Button style={{borderRadius: 18,color:'white'}}  onClick={this.handleClickOpen} className="button">Submit</Button>
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

export default CE201Entry;
