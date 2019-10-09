"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enc_base64_1 = require("crypto-js/enc-base64");
const lib_typedarrays_1 = require("crypto-js/lib-typedarrays");
const sha256_1 = require("crypto-js/sha256");
const jsrsasign_1 = require("jsrsasign");
const constants_1 = require("../constants");
exports.getCodeVerifier = () => {
    return exports.base64URLEncode(lib_typedarrays_1.default.random(32));
};
exports.getCodeChallenge = (verifier) => {
    return exports.base64URLEncode(sha256_1.default(verifier));
};
exports.base64URLEncode = (value) => {
    return enc_base64_1.default.stringify(value)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
};
exports.getSupportedSignatureAlgorithms = () => {
    return ["RS256", "RS512", "RS384", "PS256"];
};
exports.getJWKForTheIdToken = (jwtHeader, keys) => {
    const headerJSON = JSON.parse(atob(jwtHeader));
    for (const key of keys) {
        if (headerJSON.kid === key.kid) {
            return jsrsasign_1.KEYUTIL.getKey({ kty: key.kty, e: key.e, n: key.n });
        }
    }
    throw new Error("Failed to find the 'kid' specified in the id_token. 'kid' found in the header : "
        + headerJSON.kid + ", Expected values: " + keys.map((key) => key.kid).join(", "));
};
exports.isValidIdToken = (idToken, jwk, clientID) => {
    return jsrsasign_1.KJUR.jws.JWS.verifyJWT(idToken, jwk, {
        alg: exports.getSupportedSignatureAlgorithms(),
        aud: [clientID],
        gracePeriod: 3600,
        iss: [constants_1.SERVICE_RESOURCES.token]
    });
};
