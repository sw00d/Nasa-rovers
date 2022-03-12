import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import lightTheme from '../styles/theme/lightTheme'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <ThemeProvider theme={ lightTheme }>
        <Component { ...pageProps } />
      </ThemeProvider>
    </LocalizationProvider>
  )

}

export default MyApp
