import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { history, updateAuthenticationCallbackUrl } from "../../utils";
import { AppConfig } from "../../configs";

const appConfig = new AppConfig();

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AuthContext);

    /**
     * Update existing location path in the state to recall upon page refresh or authentication callback.
     */
    if (history.location.pathname !== appConfig.loginPath) {
        updateAuthenticationCallbackUrl(history.location.pathname);
    }

    return (
        <Route
            render={(props) =>
                state.isAuth ?
                    <Component {...props} /> :
                    <Redirect to={appConfig.loginPath} />
            }
            {...rest}
        />
    );
};
