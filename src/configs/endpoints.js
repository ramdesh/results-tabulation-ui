import { AppConfig } from "./app";

const appConfig = new AppConfig();

const IS_ENDPOINT = appConfig.ISEndpoint;

export const RESOURCE_ENDPOINTS = {
    authorize: `${IS_ENDPOINT}/oauth2/authorize`,
    jwks: `${IS_ENDPOINT}/oauth2/jwks`,
    logout: `${IS_ENDPOINT}/oidc/logout`,
    users: `${IS_ENDPOINT}/scim2/Users`,
    groups: `${IS_ENDPOINT}/scim2/Groups`,
    revoke: `${IS_ENDPOINT}/oauth2/revoke`,
    token: `${IS_ENDPOINT}/oauth2/token`,
    wellKnown: `${IS_ENDPOINT}/oauth2/oidcdiscovery/.well-known/openid-configuration`,
};
