import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import BaseLayout from '../components/Layout/BaseLayout';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('userToken') !== null ? (
          <BaseLayout>
            <Component {...props} />
          </BaseLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  components: PropTypes.any,
};

export default PrivateRoute;
