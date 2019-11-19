import {Route} from "react-router";
import {Redirect} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import Authentication from "./Auth";
import cookies from "./Cookies";

export default function PrivateRoute({children, path}) {
  const username = cookies.get('username');
  const password = cookies.get('password');
  return (
    <Route
      path={path}
      render={({location}) => {
        const isAuthenticated = Authentication.authenticate(token);
        if (isAuthenticated) {
          return children;
        }
        return <Redirect to={{pathname: "/login", state: {from: location}}}/>
      }}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string
};

PrivateRoute.defaultProps = {
  path: "/"
};
