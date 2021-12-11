import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import PropTypes from "prop-types";

export default function IsLogedIn({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        } else {
          return (
            <Redirect
              to={{ pathname: ROUTES.DASHBOARD, state: { from: location } }}
            ></Redirect>
          );
        }
      }}
    />
  );
}

IsLogedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
