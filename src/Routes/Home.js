import React from 'react'
import { Controls } from '../Components/Controls/Controls'
import { Container, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),

        '& h2': {
            color: 'royalblue',
        },

        '& .MuiButton-root': {
            backgroundColor: '#3760bf'
        },
        '& .MuiButton-root:hover': {
            backgroundColor: '#3d6ad4'
        }
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
        width: '80%',
        padding: '20px',

        '& h1': {
            fontFamily:'Bungee',
            fontSize: 75,
            color: 'royalblue',
            transition: '0.3s'
        },

        '& h1:hover': {
            fontSize:60,
        }
    }
}))

export const Home = () => {
    const history = useHistory();
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Container className={classes.top}>
                <h1 style={{ marginRight: 25}}>Reactive</h1>
                <h1 style={{ marginRight: 25}}>Job</h1>
                <h1 style={{ marginRight: 25}}>Tracker</h1>
            </Container>
            <h2>Track all your job or internship applications<br/>
                   all in one place with Reactive Job Tracker</h2> 
                <h2>Sign Up Today!</h2>
            <Controls.Button
                text={'Signup'}
                color='secondary'
                onClick={() => {history.push('/signup')}}
                style={{paddingBottom: '10px'}}
            />
        </Container>
    )
}
