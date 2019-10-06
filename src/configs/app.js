const DEFAULT_CONFIG = {
    BASE_PATH: "admin",
    HOME_PATH: "/overview",
    LOGIN_PATH: "/login",
    LOGOUT_PATH: "/logout",
    IS_ENDPOINT: "https://localhost:9443",
    TABULATION_API_ENDPOINT: "https://api.tabulation.ecstag.opensource.lk",
    CLIENT_ID: "ECLK_ADMIN_APP",
    CLIENT_HOST: "https://localhost:9000",
    LOGIN_CALLBACK_URL: "https://localhost:9000/login",
    LOGOUT_CALLBACK_URL: "https://localhost:9000/logout"
};
/**
 * App configuration provider class.
 * Reads the environment variables and returns the corresponding environment values
 * or falls back to the defaults.
 */
export class AppConfig {
    /**
     * Returns the app base path.
     *
     * @return {string}
     */
    get basePath() {
        return process.env.REACT_APP_BASE_PATH
            ? process.env.REACT_APP_BASE_PATH
            : DEFAULT_CONFIG.BASE_PATH;
    }
    /**
     * Returns the app home path.
     *
     * @return {string}
     */
    get homePath() {
        return process.env.REACT_APP_HOME_PATH
            ? process.env.REACT_APP_HOME_PATH
            : DEFAULT_CONFIG.HOME_PATH;
    }
    /**
     * Returns the app login path.
     *
     * @return {string}
     */
    get loginPath() {
        return process.env.REACT_APP_LOGIN_PATH
            ? process.env.REACT_APP_LOGIN_PATH
            : DEFAULT_CONFIG.LOGIN_PATH;
    }
    /**
     * Returns the app logout path.
     *
     * @return {string}
     */
    get logoutPath() {
        return process.env.REACT_APP_LOGOUT_PATH
            ? process.env.REACT_APP_LOGOUT_PATH
            : DEFAULT_CONFIG.LOGOUT_PATH;
    }
    /**
     * Returns the IS server endpoint.
     *
     * @return {string}
     */
    get ISEndpoint() {
        return process.env.REACT_APP_IS_ENDPOINT
            ? process.env.REACT_APP_IS_ENDPOINT
            : DEFAULT_CONFIG.IS_ENDPOINT;
    }
    /**
     * Returns the tabulation API endpoint.
     *
     * @return {string}
     */
    get tabulationAPIEndpoint() {
        return process.env.REACT_APP_TABULATION_API_ENDPOINT
            ? process.env.REACT_APP_TABULATION_API_ENDPOINT
            : DEFAULT_CONFIG.TABULATION_API_ENDPOINT;
    }
    /**
     * Returns the client id.
     *
     * @return {string}
     */
    get clientID() {
        return process.env.REACT_APP_CLIENT_ID
            ? process.env.REACT_APP_CLIENT_ID
            : DEFAULT_CONFIG.CLIENT_ID;
    }
    /**
     * Returns the client host.
     *
     * @return {string}
     */
    get clientHost() {
        return process.env.REACT_APP_CLIENT_HOST
            ? process.env.REACT_APP_CLIENT_HOST
            : DEFAULT_CONFIG.CLIENT_HOST;
    }
    /**
     * Returns the login callback url.
     *
     * @return {string}
     */
    get loginCallbackURL() {
        return process.env.REACT_APP_LOGIN_CALLBACK_URL
            ? process.env.REACT_APP_LOGIN_CALLBACK_URL
            : DEFAULT_CONFIG.LOGIN_CALLBACK_URL;
    }
    /**
     * Returns the logout callback url.
     *
     * @return {string}
     */
    get logoutCallbackURL() {
        return process.env.REACT_APP_LOGOUT_CALLBACK_URL
            ? process.env.REACT_APP_LOGOUT_CALLBACK_URL
            : DEFAULT_CONFIG.LOGOUT_CALLBACK_URL;
    }
}
