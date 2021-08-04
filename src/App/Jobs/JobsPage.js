import React, { useState, useEffect } from 'react'
import { Card, Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core'
import { useAuth } from '../../Contexts/AuthContext'
import { JobForm } from './JobForm'
import { useTable } from '../../Components/useTable'
import { database } from '../../firebaseDB'
import { JobsTable } from './JobsTable'
import { TableHead } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
        justifyContent: 'center',
        margin: theme.spacing(5),
        padding: theme.spacing(2)
    }
}))

export const JobsPage = () => {
    const classes = useStyles();
    const { currentUser } = useAuth()
    const { getJobs } = database(currentUser.uid)

    const [jobs, setJobs] = useState(getJobs())

    useEffect(() => {
    }, [])

    return (
        <div className={classes.root}>
            <JobsTable/>
        </div>
    )
}
