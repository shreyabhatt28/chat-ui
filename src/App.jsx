import {Box, Typography } from '@mui/material'
import Chat from './components/Chat.jsx'
import {createTheme, ThemeProvider} from '@mui/material/styles'



const theme = createTheme({
  typography:{
    fontFamily:'Inter'
  },
  palette: {
    first:{
      main:'#51AC57'
    }
  }
})

const App = () =>{


return(
  <ThemeProvider theme={theme}>
  <Chat/>
  </ThemeProvider>
)
}

export default App