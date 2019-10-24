import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import {} from "../config";
import {API_ACCESS_TOKEN_KEY, AUTH_APP_SIGN_IN_URL_PATH} from "./constants";
import {AUTH_APP_URL} from "../config";


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export function getAuthAppSignInUrl() {
    return `${AUTH_APP_URL}${AUTH_APP_SIGN_IN_URL_PATH}`;
}

export function getAccessToken() {
    const tabulationAccessToken = getCookie(API_ACCESS_TOKEN_KEY);
    localStorage.setItem('token', tabulationAccessToken);

    return tabulationAccessToken;
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


export class ProtectedRoute extends Component {
    constructor(props) {
        super(props)
    }

    isAuthenticated() {
        return hasValidToken()
    }

    render() {
        if (!this.isAuthenticated()) {
            redirectToLogin();
            return null;
        } else {
            return <Route
                {...this.props}
            />
        }

    }
}
