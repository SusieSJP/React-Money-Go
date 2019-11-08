import React from 'react';
import { connect } from 'react-redux'; // to determine whether the user is authenticated
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuth,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuth ? (
      <div>
        <Header />
        <Component {...props}/>
      </div>
    ) : (
      <Redirect to="/"/>
    )
  )}/>
);

const mapStateToProps = (state) => ({
  isAuth: !!state.auth.uid // turn undefined into false
});

export default connect(mapStateToProps)(PrivateRoute);
