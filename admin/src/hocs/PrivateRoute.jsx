import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../components/BaseLayout/Layout';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('userToken') !== null ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
