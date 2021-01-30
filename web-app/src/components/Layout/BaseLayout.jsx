import React from 'react';
import PropTypes from 'prop-types';
import { apiAuthCheck } from '../../api/auth';
import { authenticationUserAction } from '../../actions/authActions';
import store from '../../store';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Loading from '../../hocs/Loading';
import { useDarkMode } from './components/DarkModeToggler';
import { Callout, Intent } from '@blueprintjs/core';
import UpdateAccount from './components/UpdateAccount';
import ActivateEmailAlert from './components/ActivateEmailAlert';
import config from '../../config.json';

export default function BaseLayout(props) {
  const [openAccountDrawer, setOpenAccountDrawer] = React.useState(false);
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const [authCheck, setAuthCheck] = React.useState(false);
  const [version, setVersion] = React.useState(config.version);

  React.useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setAuthCheck(false);

      setTimeout(() => {
        apiAuthCheck({ token: localStorage.getItem('userToken'), email: localStorage.getItem('userEmail') })
          .then((response) => {
            if (response.data.version) {
              setVersion(response.data.version.toString());
            }
            if (response.data.status) {
              setAuthCheck(true);
              store.dispatch(authenticationUserAction(response.data.user));
            } else {
              localStorage.clear();
              window.location.href = '/login';
            }
          })
          .catch(() => {
            setAuthCheck(false);
            localStorage.clear();
            window.location.href = '/login';
          });
      }, 500);
    }

    return () => {};
  }, []);

  const handleOpenAccountDrawer = () => setOpenAccountDrawer(true);
  const handleCloseAccountDrawer = () => setOpenAccountDrawer(false);

  if (theme === 'dark') {
    document.body.classList.add('bp3-dark');
    document.body.classList.remove('bp3-body');
  } else {
    document.body.classList.add('bp3-body');
    document.body.classList.remove('bp3-dark');
  }

  if (!componentMounted || !authCheck) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <ActivateEmailAlert />
      <Header toggleTheme={toggleTheme} theme={theme} handleOpenAccountDrawer={handleOpenAccountDrawer} />
      {version !== config.version && (
        <Callout intent={Intent.DANGER}>A new update has been detected in the system. Please refresh the page now.</Callout>
      )}
      <div className="main">{props.children}</div>
      <Footer toggleTheme={toggleTheme} theme={theme} />
      <UpdateAccount openAccountDrawer={openAccountDrawer} handleCloseAccountDrawer={handleCloseAccountDrawer} />
    </React.Fragment>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.any,
};
