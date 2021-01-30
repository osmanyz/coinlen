import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness2Icon from '@material-ui/icons/Brightness2';

export const ToggleMode = (props) => {
  const isLight = props.theme === 'light';

  return (
    <IconButton onClick={props.toggleTheme} color="inherit">
      {isLight && <Brightness7Icon />}
      {!isLight && <Brightness2Icon />}
    </IconButton>
  );
};

ToggleMode.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export const ToggleModeForMenu = (props) => {
  const isLight = props.theme === 'light';

  return (
    <MenuItem onClick={props.toggleTheme} color="inherit">
      <ListItemIcon>
        {isLight && <Brightness7Icon />}
        {!isLight && <Brightness2Icon />}
      </ListItemIcon>
      <span>Darkmode </span>
    </MenuItem>
  );
};

ToggleModeForMenu.propTypes = {
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
    } else {
      setMode('light');
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
