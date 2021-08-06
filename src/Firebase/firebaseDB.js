import { db } from './firebase'
import { v4 as uuidv4 } from 'uuid'

export const database = (uid, setJobs, setLoading) => {
    const users = db.collection('users').doc(uid)
    const jobsColl = users.collection('jobs')

    const addJob = async (values) => {
        values.id = uuidv4()
        await jobsColl.doc(values.id).set({...values})
        .then(() => {getJobs()})
    }
    
    const getJobs = async () => {
        setLoading(true)
        setJobs([])
        await jobsColl.get()
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

    const updateJob = async (job) => {
        await jobsColl.doc(job.id).update({
            ...job
        })
        .then(() => {getJobs()})
    }

    const deleteJob = async (id) => {
        await jobsColl.doc(id).delete()
        .then(() => {getJobs()})
    }

    return {
        addJob,
        getJobs,
        updateJob,
        deleteJob
    }
}


