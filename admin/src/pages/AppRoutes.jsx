import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../hocs/PrivateRoute';

// auth Pages
import Login from './Auth/Login';

// pages
import Dashboard from './Dashboard/Dashboard';
import NotFound from './NotFound/NotFound';

// coins
import Coins from './Coin/Index';
import CoinCreate from './Coin/Create';
import CoinEdit from './Coin/Edit';
// coins format
import CoinsFormat from './CoinFormat/Index';
import CoinFormatCreate from './CoinFormat/Create';
import CoinFormatEdit from './CoinFormat/Edit';

// invoice payment
import Payments from './InvoicePayment/Index';
import PaymentShow from './InvoicePayment/Show';

// users
import Users from './User/Index';
import UserAdmin from './User/Admin';
import UserCreate from './User/Create';
import UserEdit from './User/Edit';

// notifications
import Notifications from './Notification/Index';
import Notification from './Notification/Notification';
import NotificationDelete from './Notification/NotificationDelete';

// logs
import Logs from './Log/Index';
import LogShow from './Log/Show';

export default function AppKernel() {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/payment" component={Payments} />
      <PrivateRoute exact path="/payment/:id" component={PaymentShow} />
      <PrivateRoute exact path="/coin/format" component={CoinsFormat} />
      <PrivateRoute exact path="/coin/format/create" component={CoinFormatCreate} />
      <PrivateRoute exact path="/coin/format/edit/:id" component={CoinFormatEdit} />
      <PrivateRoute exact path="/coin" component={Coins} />
      <PrivateRoute exact path="/coin/create" component={CoinCreate} />
      <PrivateRoute exact path="/coin/edit/:id" component={CoinEdit} />
      <PrivateRoute exact path="/user" component={Users} />
      <PrivateRoute exact path="/user/admin" component={UserAdmin} />
      <PrivateRoute exact path="/user/create" component={UserCreate} />
      <PrivateRoute exact path="/user/edit/:id" component={UserEdit} />
      <PrivateRoute exact path="/notification" component={Notifications} />
      <PrivateRoute exact path="/notification-delete" component={NotificationDelete} />
      <PrivateRoute exact path="/notification-delete/:id" component={NotificationDelete} />
      <PrivateRoute exact path="/notification/:id" component={Notification} />
      <PrivateRoute exact path="/log" component={Logs} />
      <PrivateRoute exact path="/log/:id" component={LogShow} />
      <PrivateRoute exact path="/" component={() => <Redirect to="/dashboard" />} />
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
      <Route path="/" component={NotFound} />
    </Switch>
  );
}
