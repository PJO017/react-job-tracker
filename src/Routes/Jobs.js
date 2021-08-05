import React, { useState, useEffect } from 'react'
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment, Container} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth } from '../Contexts/AuthContext'
import { JobForm } from '../Components/JobForm'
import { useTable } from '../Components/useTable'
import { database } from '../Firebase/firebaseDB'
import { Controls } from '../Components/Controls/Controls'
import { Popup } from '../Components/Popup'
import { Notification } from '../Components/Notification'


// Styles
const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(4),
        margin: theme.spacing(4),
    },
    addButton: {
        position: 'absolute',
        right: '10px'
    },
    searchInput: {
        width: '75%'
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

export const Jobs = () => {
    // States and Current User
    const { currentUser } = useAuth()
    const [jobs, setJobs] = useState([])                  
    const [loading, setLoading] = useState(true)
    const [openPopup, setOpenPopup] = useState(false)
    const [jobToEdit, setJobToEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items }})
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const { addJob, getJobs, updateJob, deleteJob } = database(currentUser.uid)



    // Table Components
    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting 
    } = useTable(jobs, headCells, filterFn)

    // Add or Edit job in firestore and get updated jobs from firestore
    const addOrEdit = (job, resetForm) => {
        // If id === 0 then we're adding a new job otherwise update a job
        if (job.id === 0) {
            addJob(job)
            setNotify({
                isOpen: true,
                message: "Job Added",
                type: "success"
            })
        } 
        else {
            updateJob(job)
            setNotify({
                isOpen: true,
                message: "Job Updated",
                type: "success"
            })
        }

        setJobToEdit(null)
        resetForm()
        setOpenPopup(false)
        getJobs(setJobs, setLoading) 
    }
 
    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this job?")) {
            deleteJob(id)
            getJobs(setJobs, setLoading)
            setNotify({
                isOpen: true,
                message: "Job Deleted",
                type: "error"
            }) 
        }
    }

    const openInPopup = (job) => {
        setJobToEdit(job)
        setOpenPopup(true)
    }

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items
                else
                    return items.filter(x => x.companyName.toLowerCase().includes(target.value))
            }
        })
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
        <Container>
            <Paper className={classes.table}>
                <Toolbar>
                    <Controls.Input 
                        className={classes.searchInput}
                        label="Search Company"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
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
                                    <TableCell >{job.companyName}</TableCell>
                                    <TableCell >{job.position}</TableCell>
                                    <TableCell ><a href={job.websiteLink}>{job.websiteLink}</a></TableCell>
                                    <TableCell >{job.dateApplied.toDate().toLocaleDateString("en-US")}</TableCell>
                                    <TableCell >{job.status}</TableCell>
                                    <TableCell >{job.status === 'interview' ? job.interviewDate.toDate().toLocaleDateString("en-US") : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton 
                                            color='primary'
                                            onClick={() => {openInPopup(job)}}>
                                            <EditIcon fontSize='small'/>
                                        </Controls.ActionButton>
                                        <Controls.ActionButton 
                                            color='secondary'
                                            onClick={() => {onDelete(job.id)}}>
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
            <Notification
                notify={notify}
                setNotify={setNotify}
            /> 
        </Container>   
    )
}
