import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { authenticationUserAction } from '../actions/authActions';
import { Intent, Position, Toaster } from '@blueprintjs/core';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import PrivateRoute from '../hocs/PrivateRoute';
import JWTDecode from 'jwt-decode';
import store from '../store';

// public pages
import Login from './Auth/Login';
import EmailActivation from './Auth/EmailActivation';
import NotFoundPage from './NotFound/Page';
// privat pages
// dashboard
import Dashboard from './Dashboard/Dashboard';
// exchanges
import FirstExchange from './Exchange/FirstExchange';
import SecondExchange from './Exchange/SecondExchange';
import ShowExchange from './Exchange/Show';
import Market from './Exchange/Market';
// premium
import Payment from './Payment/Premium';
import PaymentCompleted from './Payment/Completed';
import PaymentCancel from './Payment/Cancel';
// static pages
import Guidline from './Static/Guidline';
// notifications
import NotificationInfoPage from './Notification/InfoPage';
import Notifications from './Notification/List';
import ShowNotification from './Notification/Show';

function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/first-exchange" component={FirstExchange} />
      <PrivateRoute exact path="/second-exchange" component={SecondExchange} />
      <PrivateRoute exact path="/exchange/:exchange/:coin" component={ShowExchange} />
      <PrivateRoute exact path="/exchange-market" component={Market} />
      <PrivateRoute exact path="/notification/info" component={NotificationInfoPage} />
      <PrivateRoute exact path="/notifications" component={Notifications} />
      <PrivateRoute exact path="/notification/:id/:coin" component={ShowNotification} />
      <PrivateRoute exact path="/payment" component={Payment} />
      <PrivateRoute exact path="/payment/completed" component={PaymentCompleted} />
      <PrivateRoute exact path="/payment/cancel" component={PaymentCancel} />
      <PrivateRoute exact path="/invoice/:id" component={Payment} />
      <PrivateRoute exact path="/guidline" component={Guidline} />
      <Route exact path="/email-activation/:code" component={EmailActivation} />
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/logout"
        component={() => {
          localStorage.clear();
          window.location.href = '/login';
          return <></>;
        }}
      />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  );
}

try {
  const userToken = localStorage.getItem('userToken');
  if (userToken && typeof userToken === 'string') {
    store.dispatch(authenticationUserAction(JWTDecode(userToken)));
  }
} catch (e) {}

const InternetDecetorToaster = Toaster.create({
  className: 'internet-detector-toaster',
  position: Position.TOP,
  maxToasts: 1,
});

export default function App() {
  setTimeout(() => document.body.classList.remove('pre'), 1000);

  React.useEffect(() => {
    function updateOnlineStatus() {
      if (!navigator.onLine) {
        InternetDecetorToaster.show({
          icon: 'warning-sign',
          timeout: 0,
          intent: Intent.DANGER,
          canEscapeKeyClear: false,
          message: 'Please check your internet connection.',
        });
      } else if (navigator.onLine) {
        InternetDecetorToaster.show({
          icon: 'endorsed',
          timeout: 10000,
          intent: Intent.SUCCESS,
          message: 'Your internet connection is active again.',
        });
      }
    }
    if (localStorage.getItem('userToken')) {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    }
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  );
}
