"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const sign_in_1 = require("./sign-in");
exports.initUserSession = (tokenResponse, authenticatedUser) => {
    exports.endAuthenticatedSession();
    sessionStorage.setItem(constants_1.ACCESS_TOKEN, tokenResponse.accessToken);
    sessionStorage.setItem(constants_1.ACCESS_TOKEN_EXPIRE_IN, tokenResponse.expiresIn);
    sessionStorage.setItem(constants_1.ACCESS_TOKEN_ISSUED_AT, (Date.now() / 1000).toString());
    sessionStorage.setItem(constants_1.DISPLAY_NAME, authenticatedUser.displayName);
    sessionStorage.setItem(constants_1.EMAIL, authenticatedUser.email);
    sessionStorage.setItem(constants_1.ID_TOKEN, tokenResponse.idToken);
    sessionStorage.setItem(constants_1.SCOPE, tokenResponse.scope);
    sessionStorage.setItem(constants_1.REFRESH_TOKEN, tokenResponse.refreshToken);
    sessionStorage.setItem(constants_1.TOKEN_TYPE, tokenResponse.tokenType);
    sessionStorage.setItem(constants_1.USERNAME, authenticatedUser.username);
};
exports.endAuthenticatedSession = () => {
    sessionStorage.removeItem(constants_1.ACCESS_TOKEN);
    sessionStorage.removeItem(constants_1.ACCESS_TOKEN_EXPIRE_IN);
    sessionStorage.removeItem(constants_1.ACCESS_TOKEN_ISSUED_AT);
    sessionStorage.removeItem(constants_1.DISPLAY_NAME);
    sessionStorage.removeItem(constants_1.EMAIL);
    sessionStorage.removeItem(constants_1.ID_TOKEN);
    sessionStorage.removeItem(constants_1.REFRESH_TOKEN);
    sessionStorage.removeItem(constants_1.SCOPE);
    sessionStorage.removeItem(constants_1.TOKEN_TYPE);
    sessionStorage.removeItem(constants_1.USERNAME);
};
exports.getAllSessionParameters = () => {
    return {
        accessToken: sessionStorage.getItem(constants_1.ACCESS_TOKEN),
        displayName: sessionStorage.getItem(constants_1.DISPLAY_NAME),
        email: sessionStorage.getItem(constants_1.EMAIL),
        expiresIn: sessionStorage.getItem(constants_1.ACCESS_TOKEN_ISSUED_AT),
        idToken: sessionStorage.getItem(constants_1.ID_TOKEN),
        refreshToken: sessionStorage.getItem(constants_1.REFRESH_TOKEN),
        scope: sessionStorage.getItem(constants_1.SCOPE),
        tokenType: sessionStorage.getItem(constants_1.TOKEN_TYPE),
        username: sessionStorage.getItem(constants_1.USERNAME)
    };
};
exports.setSessionParameter = (key, value) => {
    sessionStorage.setItem(key, value);
};
exports.getSessionParameter = (key) => {
    return sessionStorage.getItem(key);
};
exports.removeSessionParameter = (key) => {
    sessionStorage.removeItem(key);
};
exports.getAccessToken = () => {
    const accessToken = sessionStorage.getItem(constants_1.ACCESS_TOKEN);
    const expiresIn = sessionStorage.getItem(constants_1.ACCESS_TOKEN_EXPIRE_IN);
    const issuedAt = sessionStorage.getItem(constants_1.ACCESS_TOKEN_ISSUED_AT);
    if (!accessToken || accessToken.trim().length === 0 || !expiresIn || expiresIn.length === 0 || !issuedAt
        || issuedAt.length === 0) {
        exports.endAuthenticatedSession();
        Promise.reject("Invalid user session.");
    }
    const validityPeriod = (parseInt(issuedAt, 10) + parseInt(expiresIn, 10)) - Math.floor(Date.now() / 1000);
    if (validityPeriod <= 300) {
        const requestParams = JSON.parse(exports.getSessionParameter(constants_1.REQUEST_PARAMS));
        sign_in_1.sendRefreshTokenRequest(requestParams, exports.getSessionParameter(constants_1.REFRESH_TOKEN)).then((tokenResponse) => {
            const authenticatedUser = sign_in_1.getAuthenticatedUser(tokenResponse.idToken);
            exports.initUserSession(tokenResponse, authenticatedUser);
            return Promise.resolve(tokenResponse.accessToken);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    else {
        return Promise.resolve(accessToken);
    }
    return Promise.reject("Something went wrong while retriving the access token.");
};
