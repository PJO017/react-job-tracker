import React from 'react'
import { Container, makeStyles, Paper, Typography } from '@material-ui/core'
import { JobForm } from './JobForm'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: '150px',
        width: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center'
    },
    pageContent: {
        width: '60%',
        margin: theme.spacing(5),
        padding: theme.spacing(2)
    }
}))

export const JobsPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container className={ classes.header }>
                <Typography variant='h4' >Job / Internship Applications</Typography>
                <Typography variant='subtitle2'>Current Applications</Typography>
            </Container>
            <Paper className={classes.pageContent}>
                <JobForm />
            </Paper>
        </div>

    )
}
