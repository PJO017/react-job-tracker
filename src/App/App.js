import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import { Home } from '../Routes/Home'
import { Signup } from '../Routes/Signup'
import { Login } from '../Routes/Login'
import { Jobs } from '../Routes/Jobs.js'
import { AuthProvider } from '../Contexts/AuthContext'
import { PrivateRoute } from '../Components/PrivateRoute'
import { NavBar } from '../Components/NavBar'




const theme = createTheme({
  palette: {
      primary: {
          main: '#2e5975',
          light: '#a2cce8',
      },
      secondary: {
          main: '#f50057',
          light: '#ffa3ac'
      },
      background: {
          default: '#d6d6d6'
      }
  }
})

const useStlyes = makeStyles({
  root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
  }
})


export const App = () => {
  const classes = useStlyes()
  
  return (
    <ThemeProvider theme={ theme } className={classes.root}>
      <Router>
        <AuthProvider>
          <NavBar />
          <Switch>
            <PrivateRoute exact path='/' component={Jobs}/>
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </AuthProvider>
      </Router> 
    <CssBaseline/>
    </ThemeProvider>
  )
}