import React, { useState } from 'react'
import './App.css'
import { createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import { NavBar } from '../Components/NavBar'
import { JobsPage } from './Jobs/JobsPage'
import { Home } from '../Routes/Home'
import { Signup } from '../Routes/Signup'
import { Login } from '../Routes/Login'
import { AuthProvider } from '../Contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from '../Components/PrivateRoute'
import firebase from '../firebase'
import { JobsTable } from './Jobs/JobsTable'


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
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
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
            <PrivateRoute exact path='/' component={JobsPage}/>
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </AuthProvider>
      </Router> 
    <CssBaseline/>
    </ThemeProvider>
  )
}