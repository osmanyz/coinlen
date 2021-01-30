import React from 'react';
import PropTypes from 'prop-types';
import { apiAuthCheck } from '../../api/auth';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDarkMode } from '../../hocs/useDarkMode';
import BottomNavigationMenu from './components/BottomNavigationMenu';
import UpdateCurrency from '../UpdateCurrency/UpdateCurrency';
import Header from './components/Header';
import MyTheme from '../MyTheme';
import Loading from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 58,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

/**
 * Layout
 */
export default function Layout(props) {
  const classes = useStyles();

  const [authCheck, setAuthCheck] = React.useState(false);
  // dark mode
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? 'light' : 'dark';

  // state
  const [state, setState] = React.useState({
    drawer: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ drawer: open });
  };

  React.useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setAuthCheck(false);

      apiAuthCheck({ token: localStorage.getItem('userToken'), email: localStorage.getItem('userEmail') })
        .then((response) => {
          if (response.status) {
            setAuthCheck(true);
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
    }
  }, []);

  if (!componentMounted || !authCheck) {
    return <Loading type="small" />;
  }

  return (
    <ThemeProvider theme={MyTheme(themeMode)}>
      <div className={classes.root}>
        <CssBaseline />
        <Header toggleDrawer={toggleDrawer} theme={theme} toggleTheme={toggleTheme} />
        <main className={classes.content}>
          <Toolbar style={{ minHeight: 40 }} />
          <React.Fragment>{props.children}</React.Fragment>
        </main>
        <BottomNavigationMenu />
        <UpdateCurrency open={state.drawer} onClose={toggleDrawer(false)} />
      </div>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
