import {React, useState} from 'react'
import { useForm, Form } from '../Components/useForm'
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Controls } from '../Components/Controls/Controls'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: theme.spacing(10),
    },
    pageContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        minWidth: '300px',
        paddingTop: '50px',
        paddingBottom: '10px',
    },
}))

const initialFValues = {
    email: "",
    password: "",
}

export const Login = () => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const {
        values,
        handleInputChange,
    } = useForm(initialFValues)

    const { login } = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await login(values.email, values.password);
            history.push('/jobs')
        } catch {
            setErrors({
                ...errors,
                fail: "Email or password incorrect"
            })
        }
        setLoading(false)
    }

    const classes = useStyles()
    // style={{ display: 'flex',flexDirection: 'column', paddingTop: 50, paddingBottom: 10, width: '45%', minWidth: '300px', }}

    return (
        <div className={classes.root}>   
            <Paper component="div" className={classes.pageContent}>
                <Form  onSubmit={handleSubmit}>
                  <Grid 
                  container 
                  direction='column' 
                  alignItems='center' 
                  justifyContent='center'>
                        <Typography variant='h3' >Log In</Typography>
                        {errors.fail && <Alert severity='error'><AlertTitle>{errors.fail}</AlertTitle></Alert>}
                        <Controls.Input
                            className={classes.textField}
                            variant='outlined'
                            label='Email'
                            name='email'
                            value={ values.email }
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.Input
                            className={classes.textField}
                            variant='outlined'
                            label='Password'
                            name='password'
                            type='password'
                            value={ values.password }
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                        <div>
                            <Controls.Button
                            disabled={loading} 
                            type='submit'
                            text='Log In'
                            style={{width: 200}}
                            />   
                        </div>
                        <div style={{paddingTop:20}}>
                            <Typography>Need an account? <Link to='/signup'>Sign Up!</Link></Typography>
                        </div>
                    </Grid> 
                </Form>
            </Paper>
        </div>
    )
}
