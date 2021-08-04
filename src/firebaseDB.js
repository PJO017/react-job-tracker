import { db } from './firebase'

export const database = (uid) => {
    const userColl = db.collection('users').doc(uid)
    const jobsColl = userColl.collection('jobs')

    const addJob = (values) => {
        jobsColl.doc(values.id).set({...values})
    }
    
    const getJobs = () => {
        var jobs = [];
        jobsColl.get().then((querySnapshot) => {
            querySnapshot.docs.map((doc, index) => jobs.push(doc.data()));
        });
        return jobs
    }

    return {
        addJob,
        getJobs,
    }
}


