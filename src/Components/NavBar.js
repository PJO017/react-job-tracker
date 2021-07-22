import React from 'react'
import { makeStyles, AppBar, Toolbar, Grid, Typography } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/Work'


export const NavBar = () => {

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item>
                        <WorkIcon />
                    </Grid>
                    <Grid item>
                        <Typography varaint=''>Job Application Tracker</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
