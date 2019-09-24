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

class HomeSelection extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickOpen1 = this.handleClickOpen1.bind(this);
        this.open1 = this.open1.bind(this);
        this.open2 = this.open2.bind(this);
        this.open3 = this.open3.bind(this);
        this.open4 = this.open4.bind(this);
        this.open5 = this.open5.bind(this);
        this.open6 = this.open6.bind(this);
        this.open7= this.open7.bind(this);
        this.open8 = this.open8.bind(this);
        this.open9 = this.open9.bind(this);
        this.open10 = this.open10.bind(this);
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

    open7() {
        this.props.history.replace('/PRE21PV')
    }
    open8() {
        this.props.history.replace('/PRE41PV')
    }
    open9() {
        this.props.history.replace('/PRE21PV')
    }
    open10() {
        this.props.history.replace('/PRE34COPV')
    }
    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleClickOpen (){
        this.props.history.replace('/Home')
    }

    handleClickOpen1 (){
        this.props.history.replace('/ReportsEntry')
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}} separator="/"
                                     aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                Home
                            </Link>
                            <Link color="inherit">
                                Presidential Election
                            </Link>


                            {/*<Typography color="textPrimary"></Typography>*/}
                        </Breadcrumbs>
                        <Typography align={"center"} variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>

                    </div>
                    <div style={{marginLeft: '33%', marginRight: '33%'}}>
                        <Button align={"center"}
                                style={{borderRadius: 18, color: 'white', width: '100%', marginTop: '6%'}}
                                onClick={this.handleClickOpen} className="button">Data Entry</Button>
                        <Button align={"center"}
                                style={{borderRadius: 18, color: 'white', width: '100%', marginTop: '6%'}}
                                onClick={this.handleClickOpen1} className="button">Reports</Button>
                    </div>

                </div>


            </div>
        )
    }
}

export default HomeSelection;
