import React, { useState, useEffect } from 'react'
import { Card, Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAuth } from '../../Contexts/AuthContext'
import { JobForm } from './JobForm'
import { useTable } from '../../Components/useTable'
import { database } from '../../firebaseDB'
import { Controls } from '../../Components/Controls/Controls'
import { Popup } from '../../Components/Popup'


// Styles
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
    },
    addButton: {
        position: 'absolute',
        right: '10px'
    }
}))


// Id and Labels For Table Header Cells
const headCells = [
    {id:'companyName', label:'Company'},
    {id:'position', label:'Position'},
    {id:'websiteLink', label:'Website Link'},
    {id:'dateApplied', label:'Date Applied'},
    {id:'status', label:'Status'},
    {id:'interviewDate', label:'Interview Date'},
    {id:'actions', label: 'Actions' }
]

export const JobsTable = () => {
    // States and Current User
    const { currentUser } = useAuth()
    const [jobs, setJobs] = useState([])                  
    const [loading, setLoading] = useState(true)
    const [openPopup, setOpenPopup] = useState(false)
    const [jobToEdit, setJobToEdit] = useState(null)
    const { addJob, getJobs, updateJob } = database(currentUser.uid)


    // Table Components
    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting 
    } = useTable(jobs, headCells)

    // Add or Edit job in firestore and get updated jobs from firestore
    const addOrEdit = (job, resetForm) => {
        // If id === 0 then we're adding a new job otherwise update a job
        if (job.id === 0) 
            addJob(job)
        else 
            updateJob(job)

        setJobToEdit(null)
        resetForm()
        setOpenPopup(false)
        getJobs(setJobs, setLoading) 
    }

    const openInPopup = (job) => {
        setJobToEdit(job)
        setOpenPopup(true)
    }


    // Get jobs from firestore on mount
    useEffect(() => {
        getJobs(setJobs, setLoading)
    },[])

    const classes = useStyles()

    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Paper className={classes.root}>
                <Toolbar>
                    <Controls.Button
                        className={classes.addButton}
                        text='Add New'
                        variant='outlined'
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenPopup(true)
                            setJobToEdit(null)
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell align='center'>{job.companyName}</TableCell>
                                    <TableCell align='center'>{job.position}</TableCell>
                                    <TableCell align='center'><a href={job.websiteLink}>{job.websiteLink}</a></TableCell>
                                    <TableCell align='center'>{job.dateApplied.toDate().toLocaleDateString("en-US")}</TableCell>
                                    <TableCell align='center'>{job.status}</TableCell>
                                    <TableCell align='center'>{job.status === 'interview' ? job.interviewDate.toDate().toLocaleDateString("en-US") : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton 
                                            color='primary'
                                            onClick={() => {openInPopup(job)}}>
                                            <EditIcon fontSize='small'/>
                                        </Controls.ActionButton>
                                        <Controls.ActionButton 
                                            color='secondary'>
                                            <DeleteIcon fontSize='small'/>
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title='Add Job Application'
            >
                <JobForm
                    jobToEdit={jobToEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup> 
        </>   
    )
}
