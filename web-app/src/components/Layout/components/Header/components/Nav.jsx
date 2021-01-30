import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import {
  Button,
  Classes,
  Icon,
  NavbarDivider,
  Popover,
  Position,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core';
import { ToggleMode } from '../../DarkModeToggler';
import LogoutAlert from './LogoutAlert';
import Notifications from '../../Notifications';

export default function Nav(props) {
  const [logoutAlertOpen, setLogoutAlertOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Popover
        content={
          <Menu>
            <li>
              <Link to={'/first-exchange'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                Paribu Live Exchange
              </Link>
            </li>
            <li>
              <Link to={'/second-exchange'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                BtcTurk Live Exchange
              </Link>
            </li>
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Button className={Classes.MINIMAL} icon={IconNames.DASHBOARD} text="Live Exchanges" />
      </Popover> 
      <Link to={'/exchange-market'} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
        <Icon icon={IconNames.CHART} />
        <span>Exchange</span>
      </Link>
      <Link to={'/guidline'} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
        <Icon icon={IconNames.INFO_SIGN} />
        <span className="nav-tablet-hide">Guidline</span>
      </Link>
      <Notifications auth={props.auth} />
      <NavbarDivider />
      <Popover
        content={
          <Menu>
            <MenuItem
              href="https://binance.com"
              shouldDismissPopover={false}
              target="_blank"
              text="Go to Binance.com"
            />
            <MenuItem href="https://paribu.com" shouldDismissPopover={false} target="_blank" text="Go to Paribu.com" />
            <MenuItem href="https://btcturk.com" shouldDismissPopover={false} target="_blank" text="Go to BtcTurk.com" />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Button className={Classes.MINIMAL} icon={IconNames.LINK} />
      </Popover>
      <Popover
        content={
          <Menu>
            <MenuItem
              icon={IconNames.COG}
              onClick={props.handleOpenAccountDrawer}
              className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}
              text="Profile"
            />
            <li>
              <Link to={'/payment'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                <Icon icon={IconNames.DOLLAR} />
                <span>Premium</span>
              </Link>
            </li>
            <MenuDivider />
            <ToggleMode toggleTheme={props.toggleTheme} theme={props.theme} />
            <MenuItem icon={IconNames.LOG_OUT} text="Log out" onClick={() => setLogoutAlertOpen(true)} />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Button className={Classes.MINIMAL} icon="user" text={props.auth.user.name || 'Profile'} />
      </Popover>
      <LogoutAlert isOpen={logoutAlertOpen} setIsOpen={setLogoutAlertOpen} />
    </React.Fragment>
  );
}

Nav.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  handleOpenAccountDrawer: PropTypes.func.isRequired,
};
