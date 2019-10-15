import React, {Component} from 'react'
import {
    Typography,
    Button
} from '@material-ui/core';
import axios from "../../axios-base";
import {
    AuthenticateSessionUtil,
    SignInUtil,
} from "../../lib";
// import { setSignIn, setSignOut } from "../actions";
import {AppConfig, RESOURCE_ENDPOINTS} from "../../configs";
import {getAuthenticationCallbackUrl, history} from "../../utils";
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
    loginSuccessRedirect() {
        const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
        const location = ((!AuthenticationCallbackUrl)
            || (AuthenticationCallbackUrl === appConfig.loginPath)) ? appConfig.homePath : AuthenticationCallbackUrl;

        history.push(location);
    };

    /** sendSignInRequest**/
    sendSignInRequest() {
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
        localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW5ha0BjYXJib24uc3VwZXIiLCJhcmVhX2Fzc2lnbl9kYXRhX2VkaXRvciI6W3siYXJlYUlkIjo4MzcsImFyZWFOYW1lIjoiUFYgNDEifSx7ImFyZWFJZCI6ODM4LCJhcmVhTmFtZSI6IlBWIDQyIn0seyJhcmVhSWQiOjgzOSwiYXJlYU5hbWUiOiJQViA0MyJ9LHsiYXJlYUlkIjo4NDAsImFyZWFOYW1lIjoiUFYgNDQifSx7ImFyZWFJZCI6ODQxLCJhcmVhTmFtZSI6IlBWIDQ1In0seyJhcmVhSWQiOjg0MiwiYXJlYU5hbWUiOiJQViA0NiJ9LHsiYXJlYUlkIjo3LCJhcmVhTmFtZSI6IjEifSx7ImFyZWFJZCI6MTAsImFyZWFOYW1lIjoiMiJ9LHsiYXJlYUlkIjoxMywiYXJlYU5hbWUiOiI0In0seyJhcmVhSWQiOjE2LCJhcmVhTmFtZSI6IjMifSx7ImFyZWFJZCI6MTksImFyZWFOYW1lIjoiNiJ9LHsiYXJlYUlkIjoyMiwiYXJlYU5hbWUiOiI1In0seyJhcmVhSWQiOjI1LCJhcmVhTmFtZSI6IjcifSx7ImFyZWFJZCI6MzIsImFyZWFOYW1lIjoiOCJ9LHsiYXJlYUlkIjo2NCwiYXJlYU5hbWUiOiI5In0seyJhcmVhSWQiOjE3NSwiYXJlYU5hbWUiOiIxMCJ9LHsiYXJlYUlkIjoxNzgsImFyZWFOYW1lIjoiMTEifSx7ImFyZWFJZCI6MTgzLCJhcmVhTmFtZSI6IjEzIn0seyJhcmVhSWQiOjE4NiwiYXJlYU5hbWUiOiIxMiJ9LHsiYXJlYUlkIjoxOTMsImFyZWFOYW1lIjoiMTQifSx7ImFyZWFJZCI6MTk2LCJhcmVhTmFtZSI6IjE2In0seyJhcmVhSWQiOjIxMywiYXJlYU5hbWUiOiIxNSJ9LHsiYXJlYUlkIjoyMTgsImFyZWFOYW1lIjoiMTcifSx7ImFyZWFJZCI6MzY4LCJhcmVhTmFtZSI6IjI1In0seyJhcmVhSWQiOjM3MywiYXJlYU5hbWUiOiIxOCJ9LHsiYXJlYUlkIjozNzgsImFyZWFOYW1lIjoiMjAifSx7ImFyZWFJZCI6MzgxLCJhcmVhTmFtZSI6IjIzIn0seyJhcmVhSWQiOjM4NCwiYXJlYU5hbWUiOiIyMiJ9LHsiYXJlYUlkIjozODksImFyZWFOYW1lIjoiMjQifSx7ImFyZWFJZCI6Mzk0LCJhcmVhTmFtZSI6IjE5In0seyJhcmVhSWQiOjQwNSwiYXJlYU5hbWUiOiIyMSJ9LHsiYXJlYUlkIjo1NDMsImFyZWFOYW1lIjoiMjYifSx7ImFyZWFJZCI6NTQ4LCJhcmVhTmFtZSI6IjI3In0seyJhcmVhSWQiOjU1MSwiYXJlYU5hbWUiOiIyOCJ9LHsiYXJlYUlkIjo1NTQsImFyZWFOYW1lIjoiMjkifSx7ImFyZWFJZCI6NTU3LCJhcmVhTmFtZSI6IjMwIn0seyJhcmVhSWQiOjU2MCwiYXJlYU5hbWUiOiIzMSJ9LHsiYXJlYUlkIjo1NzcsImFyZWFOYW1lIjoiMzIifSx7ImFyZWFJZCI6NjgwLCJhcmVhTmFtZSI6IjMzIn0seyJhcmVhSWQiOjY4MywiYXJlYU5hbWUiOiIzNCJ9LHsiYXJlYUlkIjo2ODgsImFyZWFOYW1lIjoiMzUifSx7ImFyZWFJZCI6NjkxLCJhcmVhTmFtZSI6IjM2In0seyJhcmVhSWQiOjY5NiwiYXJlYU5hbWUiOiIzNyJ9LHsiYXJlYUlkIjo3MTMsImFyZWFOYW1lIjoiMzgifSx7ImFyZWFJZCI6NzE4LCJhcmVhTmFtZSI6IjQwIn0seyJhcmVhSWQiOjczOSwiYXJlYU5hbWUiOiIzOSJ9XSwiYXJlYV9hc3NpZ25fcG9sX2Rpdl9yZXBfdmlldyI6W3siYXJlYUlkIjozLCJhcmVhTmFtZSI6IkEtUHV0dGFsYW0ifSx7ImFyZWFJZCI6MTczLCJhcmVhTmFtZSI6IkItQW5hbWFkdXdhIn0seyJhcmVhSWQiOjM2NiwiYXJlYU5hbWUiOiJDLUNoaWxhdyJ9LHsiYXJlYUlkIjo1NDEsImFyZWFOYW1lIjoiRC1OYXRodGhhbmRpeWEifSx7ImFyZWFJZCI6Njc4LCJhcmVhTmFtZSI6IkUtV2VubmFwcHV3YSJ9XSwiYXJlYV9hc3NpZ25fcG9sX2Rpdl9yZXBfdmVyZiI6W3siYXJlYUlkIjozLCJhcmVhTmFtZSI6IkEtUHV0dGFsYW0ifSx7ImFyZWFJZCI6MTczLCJhcmVhTmFtZSI6IkItQW5hbWFkdXdhIn0seyJhcmVhSWQiOjM2NiwiYXJlYU5hbWUiOiJDLUNoaWxhdyJ9LHsiYXJlYUlkIjo1NDEsImFyZWFOYW1lIjoiRC1OYXRodGhhbmRpeWEifSx7ImFyZWFJZCI6Njc4LCJhcmVhTmFtZSI6IkUtV2VubmFwcHV3YSJ9XSwiYXJlYV9hc3NpZ25fZWxjX2Rpc19yZXBfdmlldyI6W3siYXJlYUlkIjoyLCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhX2Fzc2lnbl9lbGNfZGlzX3JlcF92ZXJmIjpbeyJhcmVhSWQiOjIsImFyZWFOYW1lIjoiUHV0dGFsYW0ifV0sImFyZWFfYXNzaWduX25hdF9kaXNfcmVwX3ZpZXciOltdLCJhcmVhX2Fzc2lnbl9uYXRfZGlzX3JlcF92ZXJmIjpbXSwiYXJlYV9hc3NpZ25fZWNfbGVhZGVyc2hpcCI6W119.Km8Je1mgofxSp9A_xnbiTbfqZu8UgJr5IgPTat6rIVg")
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

                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW5ha0BjYXJib24uc3VwZXIiLCJhcmVhX2Fzc2lnbl9kYXRhX2VkaXRvciI6W3siYXJlYUlkIjo4MzcsImFyZWFOYW1lIjoiUFYgNDEifSx7ImFyZWFJZCI6ODM4LCJhcmVhTmFtZSI6IlBWIDQyIn0seyJhcmVhSWQiOjgzOSwiYXJlYU5hbWUiOiJQViA0MyJ9LHsiYXJlYUlkIjo4NDAsImFyZWFOYW1lIjoiUFYgNDQifSx7ImFyZWFJZCI6ODQxLCJhcmVhTmFtZSI6IlBWIDQ1In0seyJhcmVhSWQiOjg0MiwiYXJlYU5hbWUiOiJQViA0NiJ9LHsiYXJlYUlkIjo3LCJhcmVhTmFtZSI6IjEifSx7ImFyZWFJZCI6MTAsImFyZWFOYW1lIjoiMiJ9LHsiYXJlYUlkIjoxMywiYXJlYU5hbWUiOiI0In0seyJhcmVhSWQiOjE2LCJhcmVhTmFtZSI6IjMifSx7ImFyZWFJZCI6MTksImFyZWFOYW1lIjoiNiJ9LHsiYXJlYUlkIjoyMiwiYXJlYU5hbWUiOiI1In0seyJhcmVhSWQiOjI1LCJhcmVhTmFtZSI6IjcifSx7ImFyZWFJZCI6MzIsImFyZWFOYW1lIjoiOCJ9LHsiYXJlYUlkIjo2NCwiYXJlYU5hbWUiOiI5In0seyJhcmVhSWQiOjE3NSwiYXJlYU5hbWUiOiIxMCJ9LHsiYXJlYUlkIjoxNzgsImFyZWFOYW1lIjoiMTEifSx7ImFyZWFJZCI6MTgzLCJhcmVhTmFtZSI6IjEzIn0seyJhcmVhSWQiOjE4NiwiYXJlYU5hbWUiOiIxMiJ9LHsiYXJlYUlkIjoxOTMsImFyZWFOYW1lIjoiMTQifSx7ImFyZWFJZCI6MTk2LCJhcmVhTmFtZSI6IjE2In0seyJhcmVhSWQiOjIxMywiYXJlYU5hbWUiOiIxNSJ9LHsiYXJlYUlkIjoyMTgsImFyZWFOYW1lIjoiMTcifSx7ImFyZWFJZCI6MzY4LCJhcmVhTmFtZSI6IjI1In0seyJhcmVhSWQiOjM3MywiYXJlYU5hbWUiOiIxOCJ9LHsiYXJlYUlkIjozNzgsImFyZWFOYW1lIjoiMjAifSx7ImFyZWFJZCI6MzgxLCJhcmVhTmFtZSI6IjIzIn0seyJhcmVhSWQiOjM4NCwiYXJlYU5hbWUiOiIyMiJ9LHsiYXJlYUlkIjozODksImFyZWFOYW1lIjoiMjQifSx7ImFyZWFJZCI6Mzk0LCJhcmVhTmFtZSI6IjE5In0seyJhcmVhSWQiOjQwNSwiYXJlYU5hbWUiOiIyMSJ9LHsiYXJlYUlkIjo1NDMsImFyZWFOYW1lIjoiMjYifSx7ImFyZWFJZCI6NTQ4LCJhcmVhTmFtZSI6IjI3In0seyJhcmVhSWQiOjU1MSwiYXJlYU5hbWUiOiIyOCJ9LHsiYXJlYUlkIjo1NTQsImFyZWFOYW1lIjoiMjkifSx7ImFyZWFJZCI6NTU3LCJhcmVhTmFtZSI6IjMwIn0seyJhcmVhSWQiOjU2MCwiYXJlYU5hbWUiOiIzMSJ9LHsiYXJlYUlkIjo1NzcsImFyZWFOYW1lIjoiMzIifSx7ImFyZWFJZCI6NjgwLCJhcmVhTmFtZSI6IjMzIn0seyJhcmVhSWQiOjY4MywiYXJlYU5hbWUiOiIzNCJ9LHsiYXJlYUlkIjo2ODgsImFyZWFOYW1lIjoiMzUifSx7ImFyZWFJZCI6NjkxLCJhcmVhTmFtZSI6IjM2In0seyJhcmVhSWQiOjY5NiwiYXJlYU5hbWUiOiIzNyJ9LHsiYXJlYUlkIjo3MTMsImFyZWFOYW1lIjoiMzgifSx7ImFyZWFJZCI6NzE4LCJhcmVhTmFtZSI6IjQwIn0seyJhcmVhSWQiOjczOSwiYXJlYU5hbWUiOiIzOSJ9XSwiYXJlYV9hc3NpZ25fcG9sX2Rpdl9yZXBfdmlldyI6W3siYXJlYUlkIjozLCJhcmVhTmFtZSI6IkEtUHV0dGFsYW0ifSx7ImFyZWFJZCI6MTczLCJhcmVhTmFtZSI6IkItQW5hbWFkdXdhIn0seyJhcmVhSWQiOjM2NiwiYXJlYU5hbWUiOiJDLUNoaWxhdyJ9LHsiYXJlYUlkIjo1NDEsImFyZWFOYW1lIjoiRC1OYXRodGhhbmRpeWEifSx7ImFyZWFJZCI6Njc4LCJhcmVhTmFtZSI6IkUtV2VubmFwcHV3YSJ9XSwiYXJlYV9hc3NpZ25fcG9sX2Rpdl9yZXBfdmVyZiI6W3siYXJlYUlkIjozLCJhcmVhTmFtZSI6IkEtUHV0dGFsYW0ifSx7ImFyZWFJZCI6MTczLCJhcmVhTmFtZSI6IkItQW5hbWFkdXdhIn0seyJhcmVhSWQiOjM2NiwiYXJlYU5hbWUiOiJDLUNoaWxhdyJ9LHsiYXJlYUlkIjo1NDEsImFyZWFOYW1lIjoiRC1OYXRodGhhbmRpeWEifSx7ImFyZWFJZCI6Njc4LCJhcmVhTmFtZSI6IkUtV2VubmFwcHV3YSJ9XSwiYXJlYV9hc3NpZ25fZWxjX2Rpc19yZXBfdmlldyI6W3siYXJlYUlkIjoyLCJhcmVhTmFtZSI6IlB1dHRhbGFtIn1dLCJhcmVhX2Fzc2lnbl9lbGNfZGlzX3JlcF92ZXJmIjpbeyJhcmVhSWQiOjIsImFyZWFOYW1lIjoiUHV0dGFsYW0ifV0sImFyZWFfYXNzaWduX25hdF9kaXNfcmVwX3ZpZXciOltdLCJhcmVhX2Fzc2lnbl9uYXRfZGlzX3JlcF92ZXJmIjpbXSwiYXJlYV9hc3NpZ25fZWNfbGVhZGVyc2hpcCI6W119.Km8Je1mgofxSp9A_xnbiTbfqZu8UgJr5IgPTat6rIVg",
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
