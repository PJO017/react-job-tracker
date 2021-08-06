import React  from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles, AppBar, Toolbar, Typography, Container } from '@material-ui/core'
import { Controls } from '../Components/Controls/Controls'

const useStyles = makeStyles(theme => ({
    root: {
        flexGlow: 1,

        '& .MuiButton-root': {
            backgroundColor: '#3760bf'
        },
        '& .MuiButton-root:hover': {
            backgroundColor: '#3d6ad4'
        }
    
    },
    icon: {
        marginRight: theme.spacing(2)
    },
    title: {
        margin: 0,
        fontFamily: "Bungee",
        color: 'white',
        textDecoration: 'none',
        transition: 'color 1s',

        '& :hover': {
            color: 'royalblue'
        }

    },
    jobLink : {
        marginLeft: '35vw',
        marginTop: 10,
        fontSize: 15,
        color: 'white',
        textDecoration: 'none',

        '& :hover': {
            color: 'royalblue'
        }
    }
}))

export const NavBar = () => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleClick = () => {
        if (!currentUser) {
            history.push('/login')
        }
        else {
            logout()
            history.push('/')
        }
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="sticky" style={{paddingBottom: '10px', maxHeight: 80}}>
            <Toolbar style={{paddingTop: '10px'}}>
                <Link className={classes.title} to='/'><h1>RJT</h1></Link>
                <Container style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    {
                        currentUser ?
                        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between'}}>
                             <Link className={classes.jobLink} to='/jobs'>
                                <h1>JOBS</h1>
                            </Link>
                            <Typography 
                            variant='h5'
                            style={{ marginTop: '3%'}}
                            >
                                Welcome { currentUser.displayName }!
                            </Typography> 
                        </div>
                        
                        : null
                    }
                </Container>
                <Controls.Button
                    text={currentUser ? 'Logout' : 'Login'}
                    color='secondary'
                    onClick={handleClick}
                    style={{paddingBottom: '10px'}}
                />
            </Toolbar>
        </AppBar>
        </div>
    )
}
