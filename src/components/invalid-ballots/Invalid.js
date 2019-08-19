import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import clsx from 'clsx';
import {
    Typography,
    Button,
    FormControl,
    TextField,
    InputLabel,
    Select,
    OutlinedInput,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper
} from '@material-ui/core';

class Invalid extends Component {
    // state = {
    //     courses: [],
    //     searchString: ''
    // }

    constructor(props, context) {
        super(props, context);
        this.state = {
            allUsers: []
        };
    }

    // constructor() {
    //     super()
    //     // this.getCourses()
    // }

    componentDidMount() {
        console.log("djkdj")
        // let token = localStorage.getItem('id_token');
        axios.get('https://dev.tabulation.ecdev.opensource.lk/tally-sheet?limit=20&offset=0', {
            headers: {
                 'Access-Control-Allow-Origin' : '*'
            }
        }).then(res => {
            console.error("djkdj"+res)
            // const allUsers = res.data
            // this.setState({allUsers});
        })

    }

    // getCourses = () => {
    //     client.getEntries({
    //         content_type: 'course',
    //         query: this.state.searchString
    //     })
    //         .then((response) => {
    //             this.setState({courses: response.items})
    //             console.log(this.state.courses)
    //         })
    //         .catch((error) => {
    //             console.log("Error occurred while fetching Entries")
    //             console.error(error)
    //         })
    // }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCourses()
    }
    render() {
        return (
            <div style={{margin:'3%'}}>
                    <div>
                        <div style={{marginBottom:'3%'}}>
                            <Typography variant="h5" gutterBottom>
                                Invalid Ballot Count
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                This is to be filled at the counting centre before counting the valid votes.
                                Please Select the District Centre and Counting Center at first.
                            </Typography>
                        </div>
                        {/*<Grid container spacing={24} style={{padding: 24}}>*/}

                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>Ground For Rejection</TableCell>
                                            <TableCell style={{fontSize:13,fontWeight:'bold'}}>No of Ballot Papers Rejected</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{fontSize:13}}>Does not bear the official mark</TableCell>
                                            <TableCell style={{fontSize:13}}>
                                                <TextField
                                                    id="outlined-dense"
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{fontSize:13}}>Voted for more than one candidate</TableCell>
                                            <TableCell style={{fontSize:13}}>
                                                <TextField
                                                    id="outlined-dense"
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{fontSize:13}}>Specified a second preference or a third preference only both such preference only</TableCell>
                                            <TableCell style={{fontSize:13}}>
                                                <TextField
                                                    id="outlined-dense"
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{fontSize:13}}>Something is written or marked by which the voter can be identified</TableCell>
                                            <TableCell style={{fontSize:13}}>
                                                <TextField
                                                    id="outlined-dense"
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{fontSize:13}}>Unmarked</TableCell>
                                            <TableCell style={{fontSize:13}}>
                                                <TextField
                                                    id="outlined-dense"
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{fontSize:13}}>Void for Uncertainty</TableCell>
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

                        {/*</Grid>*/}
                    </div>

            </div>
        )
    }
}
export default Invalid;
