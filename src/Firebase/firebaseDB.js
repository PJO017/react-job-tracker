import { db } from './firebase'
import { v4 as uuidv4 } from 'uuid'

export const database = (uid) => {
    const userColl = db.collection('users').doc(uid)
    const jobsColl = userColl.collection('jobs')

    const addJob = (values) => {
        values.id = uuidv4()
        jobsColl.doc(values.id).set({...values})
    }
    
    const getJobs = async (setJobs, setLoading) => {
        await db.collection('users').doc(uid).collection('jobs').get()
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
        const jobDoc = jobsColl.doc(job.id)
        return jobDoc.update({
            ...job
        })
    }

    const deleteJob = (id) => {
        return jobsColl.doc(id).delete()
    }

    return {
        addJob,
        getJobs,
        updateJob,
        deleteJob
    }
}


