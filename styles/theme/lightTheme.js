import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#BC2732'
    },
    white: {
      main: '#fff'
    },
    grey: {
      main: '#282C34'
    }
  },
})

export default lightTheme