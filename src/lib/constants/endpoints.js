"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICE_ENDPOINT = "https://localhost:9443";
exports.SERVICE_RESOURCES = {
    jwks: `${exports.SERVICE_ENDPOINT}/oauth2/jwks`,
    token: `${exports.SERVICE_ENDPOINT}/oauth2/token`
};
exports.AUTHORIZATION_ENDPOINT = "authorization_endpoint";
exports.TOKEN_ENDPOINT = "token_endpoint";
exports.REVOKE_TOKEN_ENDPOINT = "revoke_token_endpoint";
exports.END_SESSION_ENDPOINT = "end_session_endpoint";
exports.JWKS_ENDPOINT = "jwks_uri";
exports.OP_CONFIG_INITIATED = "op_config_initiated";
