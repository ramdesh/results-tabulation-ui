import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {
    Button,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class Reports extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
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
                <h1>Reports</h1>
                <Grid container spacing={3} style={{marginBottom: '2%'}}>
                    <Grid item lg={4} sm={3}>
                        <FormControl variant="outlined" margin="dense">
                            <InputLabel>
                                Electional District
                            </InputLabel>
                            <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                {this.state.offices.map((office, idx) => (
                                    <MenuItem value={office.officeName}>{office.officeName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} sm={3}>
                        <FormControl variant="outlined" margin="dense">
                            <InputLabel>
                                Polling Division
                            </InputLabel>
                            <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
                                {this.state.offices.map((day1, idx) => (
                                    <MenuItem value={day1.officeName}>{day1.officeName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} sm={3}>
                        <FormControl variant="outlined" margin="dense">

                            <Button color="primary">
                                Generate
                            </Button>
                        </FormControl>
                    </Grid>

                </Grid>
            </div>

        )
    }
}

export default Reports;
