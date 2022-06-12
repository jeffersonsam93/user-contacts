import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#a1c617',
    },
    secondary: {
      main: '#32cd33',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;