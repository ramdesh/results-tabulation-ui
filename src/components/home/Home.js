import React, {Component} from 'react'
import axios from '../../axios-base';
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

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.open1 = this.open1.bind(this);
        this.open2 = this.open2.bind(this);
        this.open3 = this.open3.bind(this);
        this.open4 = this.open4.bind(this);
        this.open5 = this.open5.bind(this);
        this.open6 = this.open6.bind(this);

        this.state = {
            open: false,
            value: 0
        };
    }

    open1() {
        this.props.history.replace('/PRE41')
    }
    open2() {
        this.props.history.replace('/PRE21')
    }
    open3() {
        this.props.history.replace('/CE201')
    }
    open4() {
        this.props.history.replace('/PRE34CO')
    }
    open5() {
        this.props.history.replace('/PRE28')
    }
    open6() {
        this.props.history.replace('/PRE28A')
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    render() {
        return (
            <div style={{margin: '3%',marginRight:'8%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <div style={{marginBottom: '3%'}}>
                            <Typography variant="h4" gutterBottom>
                                Presidential Election 2019
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Tally Sheets
                            </Typography>
                        </div>
                    </div>

                    <Paper style={{margin: '3%'}}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    {/*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                <TableRow>
                                    <TableCell style={{width:'40%',fontSize: 13,fontWeight: 'bold',}}>Tally Sheet : PRE 28</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.open5}
                                                className="button">Open</Button>
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>Tally Sheet : PRE 28A</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.open6}
                                                className="button">Open</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>Tally Sheet : CE 201</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.open3}
                                                className="button">Open</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{width:'40%',fontSize: 13,fontWeight: 'bold',}}>Tally Sheet : PRE 41</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.open1}
                                                className="button">Open</Button>
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>Tally Sheet : PRE 21</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.open2}
                                                className="button">Open</Button>
                                    </TableCell>

                                </TableRow>



                                <TableRow>
                                    <TableCell style={{fontSize: 13,fontWeight: 'bold'}}>TallySheet : PRE 34 CO</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.open4}
                                                className="button">Open</Button>
                                    </TableCell>
                                </TableRow>





                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>



        )
    }
}

export default Home;
