import React, { useState, useEffect } from 'react'
import { Card, Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { useAuth } from '../../Contexts/AuthContext'
import { JobForm } from './JobForm'
import { useTable } from '../../Components/useTable'
import { db } from '../../firebase'



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    table: {
        marginTop: theme.spacing(3),
        '& tbody td': {
            fontWeight: 300,
        },
        '&  tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    }
}))

const headCells = [
    {id:'companyName', label:'Company'},
    {id:'position', label:'Position'},
    {id:'websiteLink', label:'Website Link'},
    {id:'dateApplied', label:'Date Applied'},
    {id:'status', label:'Status'},
    {id:'interviewDate', label:'Interview Date'}
]

export const JobsTable = () => {
    const { currentUser } = useAuth()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const getJobs = async () => {
            await db.collection('users').doc(currentUser.uid).collection('jobs').get()
            .then(response => {
                const jobsArr = [];
                response.forEach(doc => {
                    jobsArr.push(doc.data());
                });
                setJobs(jobsArr)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
        }
        getJobs()
    },[])


    const classes = useStyles()
    const { TblContainer, TblHead } = useTable(jobs, headCells)

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Paper className={classes.root}>
            {/* <JobForm/> */}
            <TblContainer>
                <TblHead/>
                <TableBody>
                    {
                        jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell align='left'>{job.companyName}</TableCell>
                                <TableCell align='left'>{job.position}</TableCell>
                                <TableCell align='left'><a href={job.websiteLink}>{job.websiteLink}</a></TableCell>
                                <TableCell align='left'>{job.dateApplied.toDate().toLocaleDateString("en-US")}</TableCell>
                                <TableCell align='left'>{job.status}</TableCell>
                                {<TableCell align='left'>{job.status === 'interview' ? job.interviewDate.toDate().toLocaleDateString("en-US") : 'N/A'}</TableCell>}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
        </Paper>    
    )
}
