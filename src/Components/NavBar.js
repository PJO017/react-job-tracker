import React from 'react'
import { makeStyles, AppBar, Toolbar, Grid, InputBase, IconButton, Badge } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    navBar: {
        backgroundColor: 'lightblue',
        height: "50px",
    }
})

export const NavBar = () => {

    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid container>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
