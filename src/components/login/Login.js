import React, {Component} from 'react'
import {
    Typography,
    Button,
    TextField,
} from '@material-ui/core';

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            open: false,
        };
    }

    handleClickOpen() {
        this.props.history.replace('/Home')
    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <div style={{marginBottom: '3%'}}>
                        <Typography align={"center"} variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>

                    </div>
                    <div style={{marginLeft: '33%', marginRight: '33%'}}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button align={"center"}
                                style={{borderRadius: 18, color: 'white', width: '100%', marginTop: '6%'}}
                                onClick={this.handleClickOpen} className="button">Log In</Button>
                    </div>

                </div>


            </div>
        )
    }
}

export default Login;
