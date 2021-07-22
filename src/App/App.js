import React from 'react'
import './App.css'
import { createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import { NavBar } from '../Components/NavBar'
import { JobsPage } from './Jobs/JobsPage'

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

const useStyles = makeStyles({
})

export const App = () => {

  const classes = useStyles();

  return (
    <ThemeProvider theme={ theme }>
        <NavBar/>
        <JobsPage />
      <CssBaseline/>
    </ThemeProvider>
  )
}