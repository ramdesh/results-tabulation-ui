"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const constants_1 = require("../constants");
const crypto_1 = require("./crypto");
const op_config_1 = require("./op-config");
const session_1 = require("./session");
exports.hasAuthorizationCode = () => {
    return !!new URL(window.location.href).searchParams.get(constants_1.AUTHORIZATION_CODE);
};
exports.sendAuthorizationRequest = (requestParams) => {
    const authorizeEndpoint = op_config_1.getAuthorizeEndpoint();
    if (!authorizeEndpoint || authorizeEndpoint.trim().length === 0) {
        throw new Error("Invalid authorize endpoint found.");
    }
    let authorizeRequest = authorizeEndpoint + "?response_type=code&client_id="
        + requestParams.clientId;
    let scope = constants_1.OIDC_SCOPE;
    if (requestParams.scope && requestParams.scope.length > 0) {
        if (!requestParams.scope.includes(constants_1.OIDC_SCOPE)) {
            requestParams.scope.push(constants_1.OIDC_SCOPE);
        }
        scope = requestParams.scope.join(" ");
    }
    authorizeRequest += "&scope=" + scope;
    authorizeRequest += "&redirect_uri=" + requestParams.redirectUri;
    if (requestParams.enablePKCE) {
        const codeVerifier = crypto_1.getCodeVerifier();
        const codeChallenge = crypto_1.getCodeChallenge(codeVerifier);
        session_1.setSessionParameter(constants_1.PKCE_CODE_VERIFIER, codeVerifier);
        authorizeRequest += "&code_challenge_method=S256&code_challenge=" + codeChallenge;
    }
    window.location.href = authorizeRequest;
};
exports.sendTokenRequest = (requestParams) => {
    const tokenEndpoint = op_config_1.getTokenEndpoint();
    if (!tokenEndpoint || tokenEndpoint.trim().length === 0) {
        return Promise.reject("Invalid token endpoint found.");
    }
    const code = new URL(window.location.href).searchParams.get(constants_1.AUTHORIZATION_CODE);
    const body = [];
    body.push(`client_id=${requestParams.clientId}`);
    if (requestParams.clientSecret && requestParams.clientSecret.trim().length > 0) {
        body.push(`client_secret=${requestParams.clientSecret}`);
    }
    body.push(`code=${code}`);
    body.push("grant_type=authorization_code");
    body.push(`redirect_uri=${requestParams.redirectUri}`);
    if (requestParams.enablePKCE) {
        body.push(`code_verifier=${session_1.getSessionParameter(constants_1.PKCE_CODE_VERIFIER)}`);
        session_1.removeSessionParameter(constants_1.PKCE_CODE_VERIFIER);
    }
    return axios_1.default.post(tokenEndpoint, body.join("&"), getTokenRequestHeaders(requestParams.clientHost))
        .then((response) => {
        if (response.status !== 200) {
            return Promise.reject("Invalid status code received in the token response: "
                + response.status);
        }
        return validateIdToken(requestParams, response.data.id_token).then((valid) => {
            if (valid) {
                session_1.setSessionParameter(constants_1.REQUEST_PARAMS, JSON.stringify(requestParams));
                const tokenResponse = {
                    accessToken: response.data.access_token,
                    expiresIn: response.data.expires_in,
                    idToken: response.data.id_token,
                    refreshToken: response.data.refresh_token,
                    scope: response.data.scope,
                    tokenType: response.data.token_type
                };
                return Promise.resolve(tokenResponse);
            }
            return Promise.reject("Invalid id_token in the token response: " + response.data.id_token);
        });
    }).catch((error) => {
        return Promise.reject(error);
    });
};
exports.sendRefreshTokenRequest = (requestParams, refreshToken) => {
    const tokenEndpoint = op_config_1.getTokenEndpoint();
    if (!tokenEndpoint || tokenEndpoint.trim().length === 0) {
        return Promise.reject("Invalid token endpoint found.");
    }
    const body = [];
    body.push(`client_id=${requestParams.clientId}`);
    body.push(`refresh_token=${refreshToken}`);
    body.push("grant_type=refresh_token");
    return axios_1.default.post(tokenEndpoint, body.join("&"), getTokenRequestHeaders(requestParams.clientHost))
        .then((response) => {
        if (response.status !== 200) {
            return Promise.reject("Invalid status code received in the refresh token response: "
                + response.status);
        }
        return validateIdToken(requestParams, response.data.id_token)
            .then((valid) => {
            if (valid) {
                const tokenResponse = {
                    accessToken: response.data.access_token,
                    expiresIn: response.data.expires_in,
                    idToken: response.data.id_token,
                    refreshToken: response.data.refresh_token,
                    scope: response.data.scope,
                    tokenType: response.data.token_type
                };
                return Promise.resolve(tokenResponse);
            }
            return Promise.reject("Invalid id_token in the token response: " +
                response.data.id_token);
        });
    }).catch((error) => {
        return Promise.reject(error);
    });
};
exports.sendRevokeTokenRequest = (requestParams, accessToken) => {
    const revokeTokenEndpoint = op_config_1.getRevokeTokenEndpoint();
    if (!revokeTokenEndpoint || revokeTokenEndpoint.trim().length === 0) {
        return Promise.reject("Invalid revoke token endpoint found.");
    }
    const body = [];
    body.push(`client_id=${requestParams.clientId}`);
    body.push(`token=${sessionStorage.getItem(accessToken)}`);
    body.push("token_type_hint=access_token");
    return axios_1.default.post(revokeTokenEndpoint, body.join("&"), getTokenRequestHeaders(requestParams.clientHost))
        .then((response) => {
        if (response.status !== 200) {
            return Promise.reject("Invalid status code received in the revoke token response: "
                + response.status);
        }
        return Promise.resolve("success");
    }).catch((error) => {
        return Promise.reject(error);
    });
};
exports.getAuthenticatedUser = (idToken) => {
    const payload = JSON.parse(atob(idToken.split(".")[1]));
    return {
        displayName: payload.preferred_username ? payload.preferred_username : payload.sub,
        email: payload.email ? payload.email : null,
        username: payload.sub,
    };
};
const validateIdToken = (requestParams, idToken) => {
    const jwksEndpoint = op_config_1.getJwksUri();
    if (!jwksEndpoint || jwksEndpoint.trim().length === 0) {
        return Promise.reject("Invalid JWKS URI found.");
    }
    return axios_1.default.get(jwksEndpoint)
        .then((response) => {
        if (response.status !== 200) {
            return Promise.reject("Failed to load public keys from JWKS URI: "
                + jwksEndpoint);
        }
        const jwk = crypto_1.getJWKForTheIdToken(idToken.split(".")[0], response.data.keys);
        return Promise.resolve(crypto_1.isValidIdToken(idToken, jwk, requestParams.clientId));
    }).catch((error) => {
        return Promise.reject(error);
    });
};
const getTokenRequestHeaders = (clientHost) => {
    return {
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
};
