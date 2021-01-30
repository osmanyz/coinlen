import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import { Classes, Icon, MenuItem } from '@blueprintjs/core';

export const ToggleMode = (props) => {
  const isLight = props.theme === 'light';

  return (
    <React.Fragment>
      {isLight && <MenuItem onClick={props.toggleTheme} icon={IconNames.MOON} text="Darkmode" />}
      {!isLight && <MenuItem onClick={props.toggleTheme} icon={IconNames.FLASH} text="Lightmode" />}
    </React.Fragment>
  );
};

ToggleMode.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export const ToggleModeButton = (props) => {
  const isLight = props.theme === 'light';

  return (
    <React.Fragment>
      {isLight && (
        <button onClick={props.toggleTheme} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
          <Icon icon={IconNames.MOON} />
        </button>
      )}
      {!isLight && (
        <button onClick={props.toggleTheme} className={classnames(Classes.BUTTON, Classes.MINIMAL)}>
          <Icon icon={IconNames.FLASH} />
        </button>
      )}
    </React.Fragment>
  );
};

ToggleModeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export const useDarkMode = () => {
  const [theme, setTheme] = React.useState('light');
  const [componentMounted, setComponentMounted] = React.useState(false);
  const setMode = (mode) => {
    localStorage.setItem('darkMode', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
      document.body.classList.add('bp3-dark');
      document.body.classList.remove('bp3-body');
    } else {
      setMode('light');
      document.body.classList.add('bp3-body');
      document.body.classList.remove('bp3-dark');
    }
  };

  React.useEffect(() => {
    const localTheme = localStorage.getItem('darkMode');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
      ? setMode('dark')
      : localTheme
      ? setTheme(localTheme)
      : setMode('light');
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
