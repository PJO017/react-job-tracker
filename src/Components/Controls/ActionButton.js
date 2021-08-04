import { Button, makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main
        }
    },
    squareWidth: {
        maxWidth: 200
    }
}))

export const ActionButton = (props) => {
    const { color, children, onClick, fontSize} = props
    const classes = useStyles()
    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
            fontSize={fontSize}
        >
            {children}
        </Button>
    )
}
