/**
 * Action type to handle the sign in requests
 *
 * @type {string}
 */
const SET_SIGN_IN = "SET_SIGN_IN";

/**
 * Action type to handle the sign out requests
 *
 * @type {string}
 */
const SET_SIGN_OUT = "SET_SIGN_OUT";

/**
 * Action type to handle the reset authentication requests
 *
 * @type {string}
 */
const RESET_AUTHENTICATION = "RESET_AUTHENTICATION";

/**
 * Action type to set the profile info
 *
 * @type {string}
 */
const SET_PROFILE_INFO = "SET_PROFILE_INFO";

/**
 * Export action types
 *
 * @type {object}
 */
export const authenticateActionTypes = {
    RESET_AUTHENTICATION,
    SET_PROFILE_INFO,
    SET_SIGN_IN,
    SET_SIGN_OUT
};
