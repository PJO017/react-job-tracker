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
import './App.css'




const mainTheme = createTheme({
  palette: {
      primary: {
          main: '#2f51a1',
          light: '#a2cce8',
      },
      secondary: {
          main: '#f50057',
          light: '#ffa3ac'
      },
      background: {
          default: '#d1d1d1'
      }
  },
  typography: {
    fontFamily: [
      'Signika Negative',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

  overrides: {
    MuiCssBaseline: {
        "@global": {
          body: {
            backgroundolor: '#0093E9',
            backgroundImage: 'linear-gradient(180deg, #0093E9 0%, #e1e5ea 50%)',
        }
      }
    },
  },
})


const useStlyes = makeStyles({
  root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',

  },
})


export const App = () => {
  const classes = useStlyes()
  
  return (
    <ThemeProvider theme={ mainTheme } className={classes.root}>
      <CssBaseline/>
      <Router>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <PrivateRoute exact path='/jobs' component={Jobs}/>
          </Switch>
        </AuthProvider>
      </Router> 
    </ThemeProvider>
  )
}