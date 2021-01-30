import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartSystemAction } from '../../../actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import windowSize from '../../../helpers/useWindowSize';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  // responive menu
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [sidebarVariant, setSidebarVariant] = React.useState('permanent');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (windowSize().width < 768) {
      setMobileOpen(false);
      setSidebarVariant('temporary');
    }
  }, []);

  return (
    <React.Fragment>
      <AppBar elevation={1} position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            <strong>Coinlen.com</strong>
          </Typography>

          <Navbar theme={props.theme} toggleTheme={props.toggleTheme} toggleDrawer={props.toggleDrawer} />
        </Toolbar>
      </AppBar>
      <Sidebar open={mobileOpen} sidebarVariant={sidebarVariant} onClose={handleDrawerToggle} />
    </React.Fragment>
  );
};

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  restartSystemAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { restartSystemAction })(Header);
