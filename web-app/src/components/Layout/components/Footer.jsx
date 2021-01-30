import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Classes, Icon, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import { ToggleModeButton } from './DarkModeToggler';

function Footer(props) {
  return (
    <Navbar className="footer">
      <NavbarGroup>
        <NavbarHeading>
          <Link to={'/'} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
            <Icon icon={IconNames.CHART} />
            <span>Exchanges</span>
          </Link>
          <Link to={'/notifications'} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
            <Icon icon={IconNames.NOTIFICATIONS} />
            <span>Notify</span>
          </Link>
          <Link to={'/payment'} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
            <Icon icon={IconNames.DOLLAR} />
            <span className="footer-premium">Premium</span>
          </Link>
          <ToggleModeButton toggleTheme={props.toggleTheme} theme={props.theme} />
        </NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Footer);
