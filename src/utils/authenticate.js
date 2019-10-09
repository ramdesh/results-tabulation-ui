/**
 * Update sessionStorage with location history path
 *
 * @param {string} location - history path.
 */
export const updateAuthenticationCallbackUrl = (location) => {
    window.sessionStorage.setItem("auth_callback_url", location);
};
/**
 * Get location history path from sessionStorage
 *
 * @return {string} location - history path.
 */
export const getAuthenticationCallbackUrl = () => {
    return window.sessionStorage.getItem("auth_callback_url");
};
