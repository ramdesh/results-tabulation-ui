import React, {Component} from 'react'
import {
    Typography,
    Button
} from '@material-ui/core';
import axios from "../../axios-base";

import {
    AuthenticateSessionUtil,
    AuthenticateTokenKeys,
    OPConfigurationUtil,
    SignInUtil,
    SignOutUtil
} from "../../lib";
// import { setSignIn, setSignOut } from "../actions";
import { AppConfig, RESOURCE_ENDPOINTS } from "../../configs";
import { getAuthenticationCallbackUrl, history } from "../../utils";
// import { SEND_SIGN_IN_REQUEST, SEND_SIGN_OUT_REQUEST } from "../actions/types";

const appConfig = new AppConfig();

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


    /** loginSuccessRedirect  **/
    loginSuccessRedirect () {
        const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
        const location = ((!AuthenticationCallbackUrl)
            || (AuthenticationCallbackUrl === appConfig.loginPath)) ? appConfig.homePath : AuthenticationCallbackUrl;

        history.push(location);
    };


    /** sendSignInRequest**/
    sendSignInRequest(){
        const requestParams = {
            clientHost: appConfig.clientHost,
            clientId: appConfig.clientID,
            clientSecret: null,
            enablePKCE: true,
            redirectUri: appConfig.loginCallbackURL,
            scope: null,
        };

        if (SignInUtil.hasAuthorizationCode()) {
            SignInUtil.sendTokenRequest(requestParams)
                .then((response) => {
                    AuthenticateSessionUtil.initUserSession(response,
                        SignInUtil.getAuthenticatedUser(response.idToken));
                    // dispatch(setSignIn());
                    this.loginSuccessRedirect();
                }).catch((error) => {
                throw error;
            });
        } else {
            SignInUtil.sendAuthorizationRequest(requestParams);
        }
    }





    handleClickOpen(type, subElection) {
        // Saves user token to localStorage
        console.log("Sub Elections ", subElection)

        let postalId = subElection.filter(sub => sub.voteType == "Postal");
        console.log("Sub Postal  ", postalId[0].electionId)

        let nonPostalId = subElection.filter(sub => sub.voteType == "NonPostal");
        console.log("Sub NonPostal  ", nonPostalId[0].electionId)
        localStorage.setItem('electionType_Postal_Id', postalId[0].electionId)
        localStorage.setItem('electionType_NonPostal_Id', nonPostalId[0].electionId)
        localStorage.setItem('electionType', type)
        /** set user token **/
        localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcmVhQXNzaWdubWVudC9kYXRhRWRpdG9yIjpbeyJh" +
            "cmVhSWQiOjcsImFyZWFOYW1lIjoiMSJ9LHsiYXJlYUlkIjoxMCwiYXJlYU5hbWUiOiIyIn0seyJhcmVhSWQiOjEzLCJhcmVhTmFtZSI6IjQ" +
            "ifSx7ImFyZWFJZCI6MTYsImFyZWFOYW1lIjoiMyJ9LHsiYXJlYUlkIjoxOSwiYXJlYU5hbWUiOiI2In0seyJhcmVhSWQiOjIyLCJhcmVhTm" +
            "FtZSI6IjUifSx7ImFyZWFJZCI6MjUsImFyZWFOYW1lIjoiNyJ9LHsiYXJlYUlkIjozMiwiYXJlYU5hbWUiOiI4In0seyJhcmVhSWQiOjY0L" +
            "CJhcmVhTmFtZSI6IjkifSx7ImFyZWFJZCI6MTc1LCJhcmVhTmFtZSI6IjEwIn0seyJhcmVhSWQiOjE3OCwiYXJlYU5hbWUiOiIxMSJ9LHsi" +
            "YXJlYUlkIjoxODMsImFyZWFOYW1lIjoiMTMifSx7ImFyZWFJZCI6MTg2LCJhcmVhTmFtZSI6IjEyIn0seyJhcmVhSWQiOjE5MywiYXJlYU5" +
            "hbWUiOiIxNCJ9LHsiYXJlYUlkIjoxOTYsImFyZWFOYW1lIjoiMTYifSx7ImFyZWFJZCI6MjEzLCJhcmVhTmFtZSI6IjE1In0seyJhcmVhSW" +
            "QiOjIxOCwiYXJlYU5hbWUiOiIxNyJ9LHsiYXJlYUlkIjozNjgsImFyZWFOYW1lIjoiMjUifSx7ImFyZWFJZCI6MzczLCJhcmVhTmFtZSI6I" +
            "jE4In0seyJhcmVhSWQiOjM3OCwiYXJlYU5hbWUiOiIyMCJ9LHsiYXJlYUlkIjozODEsImFyZWFOYW1lIjoiMjMifSx7ImFyZWFJZCI6Mzg0" +
            "LCJhcmVhTmFtZSI6IjIyIn0seyJhcmVhSWQiOjM4OSwiYXJlYU5hbWUiOiIyNCJ9LHsiYXJlYUlkIjozOTQsImFyZWFOYW1lIjoiMTkifSx" +
            "7ImFyZWFJZCI6NDA1LCJhcmVhTmFtZSI6IjIxIn0seyJhcmVhSWQiOjU0MywiYXJlYU5hbWUiOiIyNiJ9LHsiYXJlYUlkIjo1NDgsImFyZW" +
            "FOYW1lIjoiMjcifSx7ImFyZWFJZCI6NTUxLCJhcmVhTmFtZSI6IjI4In0seyJhcmVhSWQiOjU1NCwiYXJlYU5hbWUiOiIyOSJ9LHsiYXJlY" +
            "UlkIjo1NTcsImFyZWFOYW1lIjoiMzAifSx7ImFyZWFJZCI6NTYwLCJhcmVhTmFtZSI6IjMxIn0seyJhcmVhSWQiOjU3NywiYXJlYU5hbWUi" +
            "OiIzMiJ9LHsiYXJlYUlkIjo2ODAsImFyZWFOYW1lIjoiMzMifSx7ImFyZWFJZCI6NjgzLCJhcmVhTmFtZSI6IjM0In0seyJhcmVhSWQiOjY" +
            "4OCwiYXJlYU5hbWUiOiIzNSJ9LHsiYXJlYUlkIjo2OTEsImFyZWFOYW1lIjoiMzYifSx7ImFyZWFJZCI6Njk2LCJhcmVhTmFtZSI6IjM3In" +
            "0seyJhcmVhSWQiOjcxMywiYXJlYU5hbWUiOiIzOCJ9LHsiYXJlYUlkIjo3MTgsImFyZWFOYW1lIjoiNDAifSx7ImFyZWFJZCI6NzM5LCJhc" +
            "mVhTmFtZSI6IjM5In0seyJhcmVhSWQiOjgzOCwiYXJlYU5hbWUiOiJQViA0MSJ9LHsiYXJlYUlkIjo4MzksImFyZWFOYW1lIjoiUFYgNDIi" +
            "fSx7ImFyZWFJZCI6ODQwLCJhcmVhTmFtZSI6IlBWIDQzIn0seyJhcmVhSWQiOjg0MSwiYXJlYU5hbWUiOiJQViA0NCJ9LHsiYXJlYUlkIjo" +
            "4NDIsImFyZWFOYW1lIjoiUFYgNDUifSx7ImFyZWFJZCI6ODQzLCJhcmVhTmFtZSI6IlBWIDQ2In1dLCJhcmVhQXNzaWdubWVudC9wb2xsaW" +
            "5nRGl2aXNpb25SZXBvcnRWaWV3ZXIiOlt7ImFyZWFJZCI6MywiYXJlYU5hbWUiOiJBLVB1dHRhbGFtIn0seyJhcmVhSWQiOjE3MywiYXJlY" +
            "U5hbWUiOiJCLUFuYW1hZHV3YSJ9LHsiYXJlYUlkIjozNjYsImFyZWFOYW1lIjoiQy1DaGlsYXcifSx7ImFyZWFJZCI6NTQxLCJhcmVhTmFt" +
            "ZSI6IkQtTmF0aHRoYW5kaXlhIn0seyJhcmVhSWQiOjY3OCwiYXJlYU5hbWUiOiJFLVdlbm5hcHB1d2EifSx7ImFyZWFJZCI6ODM3LCJhcmV" +
            "hTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubWVudC9wb2xsaW5nRGl2aXNpb25SZXBvcnRHZW5lcmF0b3IiOlt7ImFyZWFJZCI6My" +
            "wiYXJlYU5hbWUiOiJBLVB1dHRhbGFtIn0seyJhcmVhSWQiOjE3MywiYXJlYU5hbWUiOiJCLUFuYW1hZHV3YSJ9LHsiYXJlYUlkIjozNjYsI" +
            "mFyZWFOYW1lIjoiQy1DaGlsYXcifSx7ImFyZWFJZCI6NTQxLCJhcmVhTmFtZSI6IkQtTmF0aHRoYW5kaXlhIn0seyJhcmVhSWQiOjY3OCwi" +
            "YXJlYU5hbWUiOiJFLVdlbm5hcHB1d2EifSx7ImFyZWFJZCI6ODM3LCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubWVudC9" +
            "lbGVjdG9yYWxEaXN0cmljdFJlcG9ydFZpZXdlciI6W3siYXJlYUlkIjoyLCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubW" +
            "VudC9lbGVjdG9yYWxEaXN0cmljdFJlcG9ydEdlbmVyYXRvciI6W3siYXJlYUlkIjoyLCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQ" +
            "XNzaWdubWVudC9uYXRpb25hbFJlcG9ydFZpZXdlciI6W3siYXJlYUlkIjoxLCJhcmVhTmFtZSI6IlNyaSBMYW5rYSJ9XSwiYXJlYUFzc2ln" +
            "bm1lbnQvRUNMZWFkZXJzaGlwIjpbXX0.15bYz1mPtuP1JI6jhb6vPPMcndwAkrfryC_NElI0l4s")
        this.props.history.replace('/Main')
    }

    handleClickOpen1() {
        this.props.history.replace('/ReportsEntry')
    }


    componentDidMount() {
        // this.sendSignInRequest()
        localStorage.removeItem('electionType')
        localStorage.removeItem('electionType_Postal_Id')
        localStorage.removeItem('electionType_NonPostal_Id')
        axios.get('/election?limit=20&offset=0', {
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcmVhQXNzaWdubWVudC9kYXRhRWRpdG9yIjpbeyJhcmVhSWQiOjcsImFyZWFOYW1lIjoiMSJ9LHsiYXJlYUlkIjoxMCwiYXJlYU5hbWUiOiIyIn0seyJhcmVhSWQiOjEzLCJhcmVhTmFtZSI6IjQifSx7ImFyZWFJZCI6MTYsImFyZWFOYW1lIjoiMyJ9LHsiYXJlYUlkIjoxOSwiYXJlYU5hbWUiOiI2In0seyJhcmVhSWQiOjIyLCJhcmVhTmFtZSI6IjUifSx7ImFyZWFJZCI6MjUsImFyZWFOYW1lIjoiNyJ9LHsiYXJlYUlkIjozMiwiYXJlYU5hbWUiOiI4In0seyJhcmVhSWQiOjY0LCJhcmVhTmFtZSI6IjkifSx7ImFyZWFJZCI6MTc1LCJhcmVhTmFtZSI6IjEwIn0seyJhcmVhSWQiOjE3OCwiYXJlYU5hbWUiOiIxMSJ9LHsiYXJlYUlkIjoxODMsImFyZWFOYW1lIjoiMTMifSx7ImFyZWFJZCI6MTg2LCJhcmVhTmFtZSI6IjEyIn0seyJhcmVhSWQiOjE5MywiYXJlYU5hbWUiOiIxNCJ9LHsiYXJlYUlkIjoxOTYsImFyZWFOYW1lIjoiMTYifSx7ImFyZWFJZCI6MjEzLCJhcmVhTmFtZSI6IjE1In0seyJhcmVhSWQiOjIxOCwiYXJlYU5hbWUiOiIxNyJ9LHsiYXJlYUlkIjozNjgsImFyZWFOYW1lIjoiMjUifSx7ImFyZWFJZCI6MzczLCJhcmVhTmFtZSI6IjE4In0seyJhcmVhSWQiOjM3OCwiYXJlYU5hbWUiOiIyMCJ9LHsiYXJlYUlkIjozODEsImFyZWFOYW1lIjoiMjMifSx7ImFyZWFJZCI6Mzg0LCJhcmVhTmFtZSI6IjIyIn0seyJhcmVhSWQiOjM4OSwiYXJlYU5hbWUiOiIyNCJ9LHsiYXJlYUlkIjozOTQsImFyZWFOYW1lIjoiMTkifSx7ImFyZWFJZCI6NDA1LCJhcmVhTmFtZSI6IjIxIn0seyJhcmVhSWQiOjU0MywiYXJlYU5hbWUiOiIyNiJ9LHsiYXJlYUlkIjo1NDgsImFyZWFOYW1lIjoiMjcifSx7ImFyZWFJZCI6NTUxLCJhcmVhTmFtZSI6IjI4In0seyJhcmVhSWQiOjU1NCwiYXJlYU5hbWUiOiIyOSJ9LHsiYXJlYUlkIjo1NTcsImFyZWFOYW1lIjoiMzAifSx7ImFyZWFJZCI6NTYwLCJhcmVhTmFtZSI6IjMxIn0seyJhcmVhSWQiOjU3NywiYXJlYU5hbWUiOiIzMiJ9LHsiYXJlYUlkIjo2ODAsImFyZWFOYW1lIjoiMzMifSx7ImFyZWFJZCI6NjgzLCJhcmVhTmFtZSI6IjM0In0seyJhcmVhSWQiOjY4OCwiYXJlYU5hbWUiOiIzNSJ9LHsiYXJlYUlkIjo2OTEsImFyZWFOYW1lIjoiMzYifSx7ImFyZWFJZCI6Njk2LCJhcmVhTmFtZSI6IjM3In0seyJhcmVhSWQiOjcxMywiYXJlYU5hbWUiOiIzOCJ9LHsiYXJlYUlkIjo3MTgsImFyZWFOYW1lIjoiNDAifSx7ImFyZWFJZCI6NzM5LCJhcmVhTmFtZSI6IjM5In0seyJhcmVhSWQiOjgzOCwiYXJlYU5hbWUiOiJQViA0MSJ9LHsiYXJlYUlkIjo4MzksImFyZWFOYW1lIjoiUFYgNDIifSx7ImFyZWFJZCI6ODQwLCJhcmVhTmFtZSI6IlBWIDQzIn0seyJhcmVhSWQiOjg0MSwiYXJlYU5hbWUiOiJQViA0NCJ9LHsiYXJlYUlkIjo4NDIsImFyZWFOYW1lIjoiUFYgNDUifSx7ImFyZWFJZCI6ODQzLCJhcmVhTmFtZSI6IlBWIDQ2In1dLCJhcmVhQXNzaWdubWVudC9wb2xsaW5nRGl2aXNpb25SZXBvcnRWaWV3ZXIiOlt7ImFyZWFJZCI6MywiYXJlYU5hbWUiOiJBLVB1dHRhbGFtIn0seyJhcmVhSWQiOjE3MywiYXJlYU5hbWUiOiJCLUFuYW1hZHV3YSJ9LHsiYXJlYUlkIjozNjYsImFyZWFOYW1lIjoiQy1DaGlsYXcifSx7ImFyZWFJZCI6NTQxLCJhcmVhTmFtZSI6IkQtTmF0aHRoYW5kaXlhIn0seyJhcmVhSWQiOjY3OCwiYXJlYU5hbWUiOiJFLVdlbm5hcHB1d2EifSx7ImFyZWFJZCI6ODM3LCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubWVudC9wb2xsaW5nRGl2aXNpb25SZXBvcnRHZW5lcmF0b3IiOlt7ImFyZWFJZCI6MywiYXJlYU5hbWUiOiJBLVB1dHRhbGFtIn0seyJhcmVhSWQiOjE3MywiYXJlYU5hbWUiOiJCLUFuYW1hZHV3YSJ9LHsiYXJlYUlkIjozNjYsImFyZWFOYW1lIjoiQy1DaGlsYXcifSx7ImFyZWFJZCI6NTQxLCJhcmVhTmFtZSI6IkQtTmF0aHRoYW5kaXlhIn0seyJhcmVhSWQiOjY3OCwiYXJlYU5hbWUiOiJFLVdlbm5hcHB1d2EifSx7ImFyZWFJZCI6ODM3LCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubWVudC9lbGVjdG9yYWxEaXN0cmljdFJlcG9ydFZpZXdlciI6W3siYXJlYUlkIjoyLCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubWVudC9lbGVjdG9yYWxEaXN0cmljdFJlcG9ydEdlbmVyYXRvciI6W3siYXJlYUlkIjoyLCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhQXNzaWdubWVudC9uYXRpb25hbFJlcG9ydFZpZXdlciI6W3siYXJlYUlkIjoxLCJhcmVhTmFtZSI6IlNyaSBMYW5rYSJ9XSwiYXJlYUFzc2lnbm1lbnQvRUNMZWFkZXJzaGlwIjpbXX0.15bYz1mPtuP1JI6jhb6vPPMcndwAkrfryC_NElI0l4s",
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
                    {/*<iframe src="https://dev.tabulation.ecdev.opensource.lk/tally-sheet/6/version/4/html"></iframe>*/}

                    <div style={{marginLeft: '33%', marginRight: '33%'}}>

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
