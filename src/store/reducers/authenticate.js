import {AuthenticateSessionUtil, AuthenticateTokenKeys, AuthenticateUserKeys} from "../../lib";
import {authenticateActionTypes} from "../actions/types";
import {AppConfig} from "../../configs";

const appConfig = new AppConfig();

/**
 * Initial authenticate state.
 */
const authenticateInitialState = {
    displayName: "",
    emails: "",
    isAuth: false,
    location: appConfig.homePath,
    loginInit: false,
    logoutInit: false,
    profileInfo: {},
    username: ""
};

/**
 * Reducer to handle the state of authentication related actions.
 *
 * @param state - Previous state
 * @param action - Action type
 * @returns The new state
 */
const authenticateReducer = (state = authenticateInitialState, action) => {
    switch (action.type) {
        case authenticateActionTypes.SET_SIGN_IN:
            if (AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.ACCESS_TOKEN)) {
                return {
                    ...state,
                    displayName: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.DISPLAY_NAME),
                    emails: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.EMAIL),
                    isAuth: true,
                    loginInit: true,
                    logoutInit: false,
                    username: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.USERNAME),
                };
            }
        case authenticateActionTypes.SET_SIGN_OUT:
            return {
                ...state,
                loginInit: false,
                logoutInit: true
            };
        case authenticateActionTypes.RESET_AUTHENTICATION:
            return {
                ...authenticateInitialState
            };
        case authenticateActionTypes.SET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.payload
            };
        default:
            return state;
    }
};

export {
    authenticateInitialState,
    authenticateReducer
};
