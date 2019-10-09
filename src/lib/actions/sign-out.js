"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const op_config_1 = require("./op-config");
const session_1 = require("./session");
exports.sendSignOutRequest = (redirectUri) => {
    const logoutEndpoint = op_config_1.getEndSessionEndpoint();
    if (!logoutEndpoint || logoutEndpoint.trim().length === 0) {
        return Promise.reject("Invalid logout endpoint found.");
    }
    const idToken = session_1.getSessionParameter(constants_1.ID_TOKEN);
    if (!idToken || idToken.trim().length === 0) {
        return Promise.reject("Invalid id_token found.");
    }
    window.location.href = `${logoutEndpoint}?` + `id_token_hint=${idToken}` +
        `&post_logout_redirect_uri=${redirectUri}`;
    return Promise.resolve("success");
};
