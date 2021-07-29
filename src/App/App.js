import React from 'react'
import './App.css'
import { createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import { NavBar } from '../Components/NavBar'
import { JobsPage } from './Jobs/JobsPage'
import { Signup } from '../Routes/Signup'
import { Login } from '../Routes/Login'
import { AuthProvider } from '../Contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const theme = createTheme({
  palette: {
      primary: {
          main: '#312e75',
          light: '#f83245'
      },
      secondary: {
          main: '#f83245',
          light: '#f8324526'
      },
      background: {
          default: '#d6d6d6'
      }
  }
})

const useStlyes = makeStyles({
  root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
  }
})


export const App = () => {
  const classes = useStlyes()

  return (
    <ThemeProvider theme={ theme } className={classes.root}>
      <NavBar/>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={JobsPage}/>
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </AuthProvider>
      </Router> 
    <CssBaseline/>
    </ThemeProvider>
  )
}