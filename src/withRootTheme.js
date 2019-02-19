import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';

// A theme with custom primary and secondary color.
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
    ].join(','),
  },
  palette: {
    primary: {
      light: blue[100],
      main: blue[500],
      dark: blue[700],
      contrastText: '#fff',
    },
    // secondary: {
    // },
  },
});

const withRoot = (Component) => {
  const WithRoot = (props) => {
    // MuiThemeProvider makes the theme available down the React tree
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
