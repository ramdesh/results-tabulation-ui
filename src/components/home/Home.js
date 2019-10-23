import React, {Component} from 'react'
import {
    Typography,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    Button,
    Breadcrumbs,
    Link
} from '@material-ui/core';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.open1 = this.open1.bind(this);
        this.open2 = this.open2.bind(this);
        this.open3 = this.open3.bind(this);
        this.open4 = this.open4.bind(this);
        this.open5 = this.open5.bind(this);
        this.open6 = this.open6.bind(this);
        this.open7 = this.open7.bind(this);
        this.open8 = this.open8.bind(this);
        this.open9 = this.open9.bind(this);
        this.open10 = this.open10.bind(this);
        this.state = {
            value: 0
        };
    }

    open1() {
        this.props.history.push('/PRE41')
    }

    open2() {
        this.props.history.push('/PRE21')
    }

    open3() {
        this.props.history.push('/CE201')
    }

    open4() {
        this.props.history.push('/PRE34CO')
    }

    open5() {
        this.props.history.push('/PRE28')
    }

    open6() {
        this.props.history.push('/PRE28A')
    }

    open7() {
        this.props.history.push('/CE201PV')
    }

    open8() {
        this.props.history.push('/PRE41PV')
    }

    open9() {
        this.props.history.push('/PRE21PV')
    }

    open10() {
        this.props.history.push('/PRE34COPV')
    }

    render() {
        return (
            <div style={{margin: '3%', marginRight: '16%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <div style={{marginBottom: '3%'}}>
                            <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}}
                                         separator="/"
                                         aria-label="breadcrumb">
                                <Link color="inherit" href="/Election">
                                    Home
                                </Link>
                                <Link color="inherit" href="/Main">
                                    Presidential Election
                                </Link>
                                <Link color="inherit">
                                    Data Entry
                                </Link>
                            </Breadcrumbs>
                            <Typography variant="h4" gutterBottom>
                                Presidential Election 2019
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Votes - Tally Sheets
                            </Typography>
                        </div>
                    </div>
                    <Paper style={{margin: '3%', marginLeft: '5%'}}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/*<TableCell style={{fontSize: 14, color:'black',fontWeight: 'bold'}}>Report Type</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Tally Sheet : CE
                                        201</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.open3}
                                                className="button">Open</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{width: '40%', fontSize: 13, fontWeight: 'bold',}}>Tally Sheet :
                                        PRE 41</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.open1}
                                                className="button">Open</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div>
                    <div style={{marginTop: '5%', marginBottom: '3%'}}>
                        <div style={{marginBottom: '3%'}}>
                            <Typography variant="h6" gutterBottom>
                                Postal Votes - Tally Sheets
                            </Typography>
                        </div>
                    </div>
                    <Paper style={{margin: '3%', marginLeft: '5%'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell style={{fontSize: 13, fontWeight: 'bold'}}>Tally Sheet : CE 201
                                        PV</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.open7}
                                                className="button">Open</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{width: '40%', fontSize: 13, fontWeight: 'bold',}}>Tally Sheet :
                                        PRE 41 PV</TableCell>
                                    <TableCell>
                                        <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}}
                                                onClick={this.open8}
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
