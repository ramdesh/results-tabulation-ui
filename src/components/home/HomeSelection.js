import React, {Component} from 'react'
import {
    Typography,
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
        this.state = {
            open: false,
            value: 0
        };
    }

    // modal controllers
    handleClose() {
        this.setState({open: false});
    }

    handleClickOpen() {
        this.props.history.push('/Home')
    }

    handleClickOpen1() {
        this.props.history.push('/ReportsEntry')
    }

    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Breadcrumbs style={{marginLeft: '0.2%', marginBottom: '2%', fontSize: '14px'}} separator="/"
                                     aria-label="breadcrumb">
                            <Link color="inherit" href="/Election">
                                Home
                            </Link>
                            <Link color="inherit">
                                Presidential Election
                            </Link>

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
