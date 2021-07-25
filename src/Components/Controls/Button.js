import React from 'react'
import {Button as MuiButton, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        margin: theme.spacing(0.5)
    }
}))

export const Button = (props) => {
    const { text, size, color, variant, onClick, ...other} = props;

    const classes = useStyles();

    return (
        <MuiButton
            className={classes.root}
            variant={ variant || 'contained' } 
            color= { color || 'primary'} 
            size={ size || 'large'} 
            onClick={ onClick }
            {...other}>
            { text }
        </MuiButton>
    )
}
