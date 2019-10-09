"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const constants_1 = require("../constants");
const session_1 = require("./session");
exports.initOPConfiguration = (wellKnownEndpoint, forceInit) => {
    if (!forceInit && exports.isOPConfigInitiated()) {
        return Promise.resolve("success");
    }
    if (!wellKnownEndpoint || wellKnownEndpoint.trim().length === 0) {
        return Promise.reject("OpenID provider configuration endpoint is not defined.");
    }
    return axios_1.default.get(wellKnownEndpoint)
        .then((response) => {
        if (response.status !== 200) {
            return Promise.reject("Failed to load OpenID provider configuration from: "
                + wellKnownEndpoint);
        }
        session_1.setSessionParameter(constants_1.AUTHORIZATION_ENDPOINT, response.data.authorization_endpoint);
        session_1.setSessionParameter(constants_1.TOKEN_ENDPOINT, response.data.token_endpoint);
        session_1.setSessionParameter(constants_1.END_SESSION_ENDPOINT, response.data.end_session_endpoint);
        session_1.setSessionParameter(constants_1.JWKS_ENDPOINT, response.data.jwks_uri);
        session_1.setSessionParameter(constants_1.REVOKE_TOKEN_ENDPOINT, response.data.token_endpoint
            .substring(0, response.data.token_endpoint.lastIndexOf("token")) + "revoke");
        session_1.setSessionParameter(constants_1.OP_CONFIG_INITIATED, "true");
        return Promise.resolve("success");
    }).catch((error) => {
        return Promise.reject(error);
    });
};
exports.resetOPConfiguration = () => {
    session_1.removeSessionParameter(constants_1.AUTHORIZATION_ENDPOINT);
    session_1.removeSessionParameter(constants_1.TOKEN_ENDPOINT);
    session_1.removeSessionParameter(constants_1.END_SESSION_ENDPOINT);
    session_1.removeSessionParameter(constants_1.JWKS_ENDPOINT);
    session_1.removeSessionParameter(constants_1.REVOKE_TOKEN_ENDPOINT);
    session_1.removeSessionParameter(constants_1.OP_CONFIG_INITIATED);
};
exports.getAuthorizeEndpoint = () => {
    return session_1.getSessionParameter(constants_1.AUTHORIZATION_ENDPOINT);
};
exports.setAuthorizeEndpoint = (authorizationEndpoint) => {
    session_1.setSessionParameter(constants_1.AUTHORIZATION_ENDPOINT, authorizationEndpoint);
};
exports.getTokenEndpoint = () => {
    return session_1.getSessionParameter(constants_1.TOKEN_ENDPOINT);
};
exports.setTokenEndpoint = (tokenEndpoint) => {
    session_1.setSessionParameter(constants_1.TOKEN_ENDPOINT, tokenEndpoint);
};
exports.getRevokeTokenEndpoint = () => {
    return session_1.getSessionParameter(constants_1.REVOKE_TOKEN_ENDPOINT);
};
exports.setRevokeTokenEndpoint = (revokeTokenEndpoint) => {
    session_1.setSessionParameter(constants_1.REVOKE_TOKEN_ENDPOINT, revokeTokenEndpoint);
};
exports.getEndSessionEndpoint = () => {
    return session_1.getSessionParameter(constants_1.END_SESSION_ENDPOINT);
};
exports.setEndSessionEndpoint = (endSessionEndpoint) => {
    session_1.setSessionParameter(constants_1.END_SESSION_ENDPOINT, endSessionEndpoint);
};
exports.getJwksUri = () => {
    return session_1.getSessionParameter(constants_1.JWKS_ENDPOINT);
};
exports.setJwksUri = (jwksEndpoint) => {
    session_1.setSessionParameter(constants_1.JWKS_ENDPOINT, jwksEndpoint);
};
exports.isOPConfigInitiated = () => {
    return session_1.getSessionParameter(constants_1.OP_CONFIG_INITIATED) && "true" === session_1.getSessionParameter(constants_1.OP_CONFIG_INITIATED);
};
exports.setOPConfigInitiated = () => {
    session_1.setSessionParameter(constants_1.OP_CONFIG_INITIATED, "true");
};
