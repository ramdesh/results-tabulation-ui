import React, {Component} from 'react'
import {
    Typography,
    Button,
    Breadcrumbs,
    Link
} from '@material-ui/core';

class ReportsNew extends Component {
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
                            <Link color="inherit" href="/Main">
                                Presidential Election
                            </Link>
                            <Link color="inherit" >
                                Reports
                            </Link>

                            {/*<Typography color="textPrimary"></Typography>*/}
                        </Breadcrumbs>
                        <Typography align={"center"} variant="h4" gutterBottom>
                           Reports
                        </Typography>

                    </div>


                </div>


            </div>
        )
    }
}

export default ReportsNew;
