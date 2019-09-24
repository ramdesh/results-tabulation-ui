import React, {Component} from 'react'
import {
    Typography,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    Button
} from '@material-ui/core';
import axios from "../../axios-base";

class HomeElection extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickOpen1 = this.handleClickOpen1.bind(this);

        this.state = {
            elections: [],
            open: false,
            value: 0
        };
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleClickOpen(type,subElection) {
        // Saves user token to localStorage
        console.log("Sub Elections ",subElection)

        let postalId = subElection.filter(sub => sub.voteType == "Postal");
        console.log("Sub Postal  ",postalId[0].electionId)

        let nonPostalId = subElection.filter(sub => sub.voteType == "NonPostal");
        console.log("Sub NonPostal  ",nonPostalId[0].electionId)
        localStorage.setItem('electionType_Postal_Id', postalId[0].electionId)
        localStorage.setItem('electionType_NonPostal_Id', nonPostalId[0].electionId)
        localStorage.setItem('electionType', type)
        this.props.history.replace('/Main')
    }

    handleClickOpen1 (){
        this.props.history.replace('/ReportsEntry')
    }

    componentDidMount() {
        localStorage.removeItem('electionType')
        localStorage.removeItem('electionType_Postal_Id')
        localStorage.removeItem('electionType_NonPostal_Id')
        axios.get('/election?limit=20&offset=0', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election Types" + res.data[0].electionName)

            this.setState({
                elections: res.data
            })
        })
            .catch((error) => console.log(error));
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography align={"center"} variant="h4" gutterBottom>
                            Election Result Tabulation
                        </Typography>

                    </div>
                    <div style={{marginLeft: '33%', marginRight: '33%'}}>

                        {/*{this.state.PollingDivision.map((pollingDivision, idx) => (*/}
                            {/*<MenuItem value={pollingDivision.areaId}>{pollingDivision.areaName}</MenuItem>*/}
                        {/*))}*/}

                        {this.state.elections.map((election, idx) => (
                        <Button align={"center"}
                                style={{borderRadius: 18, color: 'white', width: '100%', marginTop: '6%'}}

                                onClick={() => this.handleClickOpen(election.electionId, election.subElections)}
                                 className="button">{election.electionName}</Button>
                        ))}
                    </div>

                </div>


            </div>
        )
    }
}

export default HomeElection;
