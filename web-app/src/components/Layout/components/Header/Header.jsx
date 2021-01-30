import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alignment, Classes, Navbar, NavbarGroup, NavbarHeading, Icon } from '@blueprintjs/core';
import Nav from './components/Nav';
import MobileNav from './components/MobileNav';

function Header(props) {
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading style={{ fontSize: 22 }}>
          <Link to={'/'} className={'logo-svg'}>
            <img width={80} src={require('./images/coinlen.svg')} alt="Coinlen" />
          </Link>
          <span className="logo-premium">
            {!props.auth.user.premiumStatus && (
              <Link to={'/payment'} className="logo-trial-text">
                Trial <span>Subscription</span>
              </Link>
            )}
            {props.auth.user.premiumStatus && (
              <Link to={'/payment'} className="logo-premium-text">
                <Icon icon="star" /> Premium
              </Link>
            )}
            <Moment
              fromNow
              date={props.auth.user.premiumDate}
              style={{ marginLeft: 5 }}
              className={Classes.TEXT_MUTED}
            />
          </span> 
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup className="display-lg" align={Alignment.RIGHT}>
        <Nav
          auth={props.auth}
          toggleTheme={props.toggleTheme}
          theme={props.theme}
          handleOpenAccountDrawer={props.handleOpenAccountDrawer}
        />
      </NavbarGroup>
      <NavbarGroup className="display-sm" align={Alignment.RIGHT}>
        <MobileNav
          auth={props.auth}
          toggleTheme={props.toggleTheme}
          theme={props.theme}
          handleOpenAccountDrawer={props.handleOpenAccountDrawer}
        />
      </NavbarGroup>
    </Navbar>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  handleOpenAccountDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
