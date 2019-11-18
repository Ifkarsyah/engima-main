import { Route } from "react-router";
import Redirect from "react-router-dom/es/Redirect";
import React from "react";
import PropTypes from "prop-types";
import Authentication from "./Auth";

export default function PrivateRoute({ children, path }) {
  const token = sessionStorage.getItem("token");
  return (
    <Route
      path={path}
      render={({ location }) =>
        Authentication.authenticate(token) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
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
