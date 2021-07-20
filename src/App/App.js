import React from 'react'
import './App.css'
import { NavBar } from '../Components/NavBar'
import { CssBaseline, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
})

export const App = () => {

  const classes = useStyles();

  return (
    <>
      <NavBar/>
      <CssBaseline/>
    </>
  )
}
