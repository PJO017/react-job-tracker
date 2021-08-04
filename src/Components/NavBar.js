import React, { useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles, AppBar, Toolbar, Grid, Typography } from '@material-ui/core'
import { Button, Controls } from '../Components/Controls/Controls'
import WorkIcon from '@material-ui/icons/Work'
import { SignalCellularNullRounded } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    root: {
        flexGlow: 1
    },
    icon: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    }
}))

export const NavBar = () => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleClick = () => {
        if (!currentUser) {
            history.push('/login')
        }
        else {
            logout()
            history.push('/login')
        }
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="sticky" style={{paddingBottom: '10px'}}>
            <Toolbar>
                <WorkIcon className={classes.icon}/>
                <Typography className={classes.title}>Job Application Tracker</Typography>
                {currentUser ? <Typography >Welcome { currentUser.email }</Typography> : null}
                <Controls.Button
                    text={currentUser ? 'Logout' : 'Login'}
                    color='secondary'
                    onClick={handleClick}
                />
            </Toolbar>
        </AppBar>
        </div>
    )
}
