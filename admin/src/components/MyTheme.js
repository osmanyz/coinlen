import { createMuiTheme } from '@material-ui/core/styles';

const MyTheme = (palletType) =>
  createMuiTheme({
    palette: {
      type: palletType,
    },
    tableStyles: {
      lightgreenBg: { backgroundColor: 'lightgreen', color: '#111111' },
      indianredBg: { backgroundColor: 'indianred', color: '#ffffff' },
      lightgreeText: { color: '#00FF00' },
      indianredText: { color: 'indianred' },
      empty: {},
      lightgreenBgMobile: { paddingLeft: 12, backgroundColor: 'lightgreen', color: '#111111' },
      indianredBgMobile: { paddingLeft: 12, backgroundColor: 'indianred', color: '#ffffff' },
      emptyMobile: { paddingLeft: 12 },
    },
  });

export default MyTheme;
