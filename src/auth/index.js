import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import {} from "../config";
import {
    API_ACCESS_TOKEN_KEY,
    API_USER_INFO_KEY,
    API_USER_INFO_USERNAME_KEY,
    AUTH_APP_SIGN_IN_URL_PATH
} from "./constants";
import {AUTH_APP_URL} from "../config";
import Cookies from 'js-cookie';


export function getAuthAppSignInUrl() {
    return `${AUTH_APP_URL}${AUTH_APP_SIGN_IN_URL_PATH}`;
}

export function getAccessToken() {
    const tabulationAccessToken = Cookies.get(API_ACCESS_TOKEN_KEY);
    localStorage.setItem('token', tabulationAccessToken);

    return tabulationAccessToken;
}

export function getUserInfo() {
    let userInfo = Cookies.get(API_USER_INFO_KEY)
    if (userInfo !== undefined) {
        try {
            userInfo = JSON.parse(userInfo);
        } catch (e) {
            userInfo = {};
        }
    } else {
        userInfo = {};
    }

    return userInfo
}

export function getUserName() {
    const userInfo = getUserInfo();
    return userInfo[API_USER_INFO_USERNAME_KEY]
}

export function hasValidToken() {
    const tabulationAccessToken = getAccessToken();
    if (tabulationAccessToken) {
        return true;
    } else {
        return false;
    }
}

export function redirectToLogin() {
    window.location.href = getAuthAppSignInUrl();
}

export function logout() {

    //TODO: notify api to revoke access token

    Cookies.remove('userinfo');
    Cookies.remove('tabulation_access_token');

    localStorage.clear();
    window.location.reload();
}


export class ProtectedRoute extends Component {
    constructor(props) {
        super(props)
    }

    static isAuthenticated() {
        return hasValidToken()
    }

    render() {
        if (!ProtectedRoute.isAuthenticated()) {
            redirectToLogin();
            return null;
        } else {
            return <Route
                {...this.props}
            />
        }

    }
}
