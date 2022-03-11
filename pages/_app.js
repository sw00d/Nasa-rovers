import '../styles/globals.css'
import { ThemeProvider } from '@mui/material';
import lightTheme from '../styles/theme/lightTheme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={ lightTheme }>
      <Component { ...pageProps } />
    </ThemeProvider>
  )

}

export default MyApp
