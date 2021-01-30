import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import { Button, Classes, Drawer, Icon, Position, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { ToggleMode } from '../../DarkModeToggler';
import LogoutAlert from './LogoutAlert';

export default function MobileNav(props) {
  const [open, setOpen] = React.useState(false);
  const [logoutAlertOpen, setLogoutAlertOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="navbar-mobile">
      <Button icon={IconNames.MENU} onClick={handleOpen} style={{ marginTop: 10 }} />
      <Drawer
        size={'75%'}
        onClose={handleClose}
        autoFocus={true}
        canEscapeKeyClose={true}
        isOpen={open}
        position={Position.RIGHT}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <Menu>
            <MenuDivider title="Live Exchanges" />
              <li>
                <Link to={'/first-exchange'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.DASHBOARD} />
                  <span>Paribu Live Exchange</span>
                </Link>
              </li>
              <li>
                <Link to={'/second-exchange'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.DASHBOARD} />
                  <span>BtcTurk Live Exchange</span>
                </Link>
              </li> 
              <li>
                <Link to={'/exchange-market'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.CHART} />
                  <span>Exchange Market</span>
                </Link>
              </li>
              <MenuDivider />
              <li>
                <Link to={'/notifications'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.NOTIFICATIONS} />
                  <span>Notifications</span>
                </Link>
              </li>
              <li>
                <Link to={'/notification/info'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.NOTIFICATIONS_UPDATED} />
                  <span>About Notifications</span>
                </Link>
              </li>
              <li>
                <Link to={'/guidline'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.INFO_SIGN} />
                  <span>Guidline</span>
                </Link>
              </li> 
              <MenuDivider title="Shortcuts" />
              <MenuItem
                href="https://binance.com"
                shouldDismissPopover={false}
                target="_blank"
                text="Go to Binance.com"
              />
              <MenuItem
                href="https://paribu.com"
                shouldDismissPopover={false}
                target="_blank"
                text="Go to Paribu.com"
              />
              <MenuItem
                href="https://btcturk.com"
                shouldDismissPopover={false}
                target="_blank"
                text="Go to BtcTurk.com"
              />
              <MenuDivider title={props.auth.user.name || 'Profile'} />
              <MenuItem
                icon={IconNames.COG}
                onClick={props.handleOpenAccountDrawer}
                className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}
                text="Account Settings"
              />
              <li>
                <Link to={'/payment'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.DOLLAR} />
                  <span>Premium</span>
                </Link>
              </li> 
              <ToggleMode toggleTheme={props.toggleTheme} theme={props.theme} />
              <MenuItem icon={IconNames.LOG_OUT} text="Log out" onClick={() => setLogoutAlertOpen(true)} />
            </Menu>
          </div>
        </div>
      </Drawer>
      <LogoutAlert isOpen={logoutAlertOpen} setIsOpen={setLogoutAlertOpen} />
    </div>
  );
}

MobileNav.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  handleOpenAccountDrawer: PropTypes.func.isRequired,
};
