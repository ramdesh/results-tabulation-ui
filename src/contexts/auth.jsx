import React, {createContext, useEffect, useReducer} from "react";
import {authenticateInitialState, authenticateReducer} from "../store/reducers";
import {getAuthenticationCallbackUrl, history} from "../utils";
import {AuthenticateSessionUtil, AuthenticateTokenKeys, OPConfigurationUtil, SignInUtil, SignOutUtil} from "../lib";
import {setSignIn, setSignOut} from "../store/actions";
import {AppConfig, RESOURCE_ENDPOINTS} from "../configs";

const appConfig = new AppConfig();

export const AuthContext = createContext({
    dispatch: (() => 0),
    signIn: () => {
    },
    signOut: () => {
    },
    state: authenticateInitialState
});

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authenticateReducer, authenticateInitialState);

    const signIn = () => {
        const loginSuccessRedirect = () => {
            const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
            const location = ((!AuthenticationCallbackUrl)
                || (AuthenticationCallbackUrl === appConfig.loginPath)) ? appConfig.homePath : AuthenticationCallbackUrl;

            history.push(location);
        };

        const sendSignInRequest = () => {
            const requestParams = {
                clientHost: appConfig.clientHost,
                clientId: appConfig.clientID,
                clientSecret: null,
                enablePKCE: true,
                redirectUri: appConfig.loginCallbackURL,
                scope: null
            };
            if (SignInUtil.hasAuthorizationCode()) {
                SignInUtil.sendTokenRequest(requestParams)
                    .then((response) => {
                        AuthenticateSessionUtil.initUserSession(response,
                            SignInUtil.getAuthenticatedUser(response.idToken));
                        dispatch(setSignIn());
                        loginSuccessRedirect();
                    }).catch((error) => {
                    throw error;
                });
            } else {
                SignInUtil.sendAuthorizationRequest(requestParams);
            }
        };

        if (AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.ACCESS_TOKEN)) {
            dispatch(setSignIn());
            loginSuccessRedirect();
        } else {
            OPConfigurationUtil.initOPConfiguration(RESOURCE_ENDPOINTS.wellKnown, false)
                .then(() => {
                    sendSignInRequest();
                }).catch(() => {
                OPConfigurationUtil.setAuthorizeEndpoint(RESOURCE_ENDPOINTS.authorize);
                OPConfigurationUtil.setTokenEndpoint(RESOURCE_ENDPOINTS.token);
                OPConfigurationUtil.setRevokeTokenEndpoint(RESOURCE_ENDPOINTS.revoke);
                OPConfigurationUtil.setEndSessionEndpoint(RESOURCE_ENDPOINTS.logout);
                OPConfigurationUtil.setJwksUri(RESOURCE_ENDPOINTS.jwks);
                OPConfigurationUtil.setOPConfigInitiated();

                sendSignInRequest();
            });
        }
    };

    const signOut = () => {
        if (!state.logoutInit) {
            SignOutUtil.sendSignOutRequest(appConfig.loginCallbackURL).then(() => {
                dispatch(setSignOut());
                AuthenticateSessionUtil.endAuthenticatedSession();
                OPConfigurationUtil.resetOPConfiguration();
            }).catch(
                // TODO show error page.
            );
        } else {
            history.push(appConfig.loginPath);
        }
    };

    /**
     * Update authentication state on app load
     */
    useEffect(() => {
        signIn();
    }, []);

    /**
     * Render state, dispatch and special case actions
     */
    return (
        <AuthContext.Provider value={ {state, dispatch, signIn, signOut} }>
            { children }
        </AuthContext.Provider>
    );
};
