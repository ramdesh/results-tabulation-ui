// import React, {Component} from 'react'
// import {
//     AuthenticateSessionUtil,
//     AuthenticateTokenKeys,
//     OPConfigurationUtil,
//     SignInUtil,
//     SignOutUtil
// } from "../../libs/authenticate";
// import { setSignIn, setSignOut } from "../actions";
// import { AppConfig, RESOURCE_ENDPOINTS } from "../../configs";
// import { getAuthenticationCallbackUrl, history } from "../../utils";
// import { SEND_SIGN_IN_REQUEST, SEND_SIGN_OUT_REQUEST } from "../actions/types";
//
// const appConfig = new AppConfig();
//
// const loginSuccessRedirect = () => {
//     const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
//     const location = ((!AuthenticationCallbackUrl)
//         || (AuthenticationCallbackUrl === appConfig.loginPath)) ? appConfig.homePath : AuthenticationCallbackUrl;
//
//     history.push(location);
// };
//
// const sendSignInRequest = () => {
//     const requestParams = {
//         clientHost: appConfig.clientHost,
//         clientId: appConfig.clientID,
//         clientSecret: null,
//         enablePKCE: true,
//         redirectUri: appConfig.loginCallbackURL,
//         scope: null,
//     };
//     if (SignInUtil.hasAuthorizationCode()) {
//         SignInUtil.sendTokenRequest(requestParams)
//             .then((response) => {
//                 AuthenticateSessionUtil.initUserSession(response,
//                     SignInUtil.getAuthenticatedUser(response.idToken));
//                 dispatch(setSignIn());
//                 loginSuccessRedirect();
//             }).catch((error) => {
//             throw error;
//         });
//     } else {
//         SignInUtil.sendAuthorizationRequest(requestParams);
//     }
// };

// class Login extends Component {
//     constructor(props, context) {
//         super(props, context);
//         this.handleClickOpen = this.handleClickOpen.bind(this);
//         this.state = {
//             open: false,
//         };
//     }
//
//     handleClickOpen() {
//         this.props.history.replace('/Home')
//     }
//
//     componentDidMount() {
//     }
//
//     loginSuccessRedirect (){
//         const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
//         const location = ((!AuthenticationCallbackUrl)
//             || (AuthenticationCallbackUrl === appConfig.loginPath)) ? appConfig.homePath : AuthenticationCallbackUrl;
//
//         history.push(location);
//     };
//
//     render() {
//         return (
//             <div style={{margin: '3%'}}>
//                 <div>
//                     <div style={{marginBottom: '3%'}}>
//                         <Typography align={"center"} variant="h4" gutterBottom>
//                             Presidential Election 2019
//                         </Typography>
//
//                     </div>
//                     <div style={{marginLeft: '33%', marginRight: '33%'}}>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Username"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                         />
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />
//                         <Button align={"center"}
//                                 style={{borderRadius: 18, color: 'white', width: '100%', marginTop: '6%'}}
//                                 onClick={this.handleClickOpen} className="button">Log In</Button>
//                     </div>
//
//                 </div>
//
//
//             </div>
//         )
//     }
// }
//
// export default Login;
