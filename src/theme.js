import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontWeight: 500,
    htmlFontSize: 10,
    fontFamily: ['IBM Plex Sans']
  },
  palette: {
    primary: {
      main: '#FFF8EB', // light beige
      contrastText: '#fff'
    },
    secondary: {
      main: '#6f5d3f', // brown
      contrastText: '#fff'
    },
    background: {
      paper: '#9CC1CF'
    },
    text: {
      primary: '#fff',
      secondary: '#dac7a5'
    },
    action: {
      hover: '#efebe915'
    },
    border: {
      outline: '#6f5d3f',
      outlineHovered: '#ccaf7f'
    },
    error: {
      main: red.A400
    }
  },
  shape: {
    roundedInputBorderRadius: 22
  }
})
export default theme
