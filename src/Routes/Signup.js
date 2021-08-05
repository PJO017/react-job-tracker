import {React, useState} from 'react'
import { useForm, Form } from '../Components/useForm'
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle} from '@material-ui/lab'
import { Controls } from '../Components/Controls/Controls'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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
        height: '80%',
        margin: theme.spacing(5),
        padding: theme.spacing(2),

    },
    gridItem: {
        display: 'flex',
        marginLeft: '50px',
        padding: '10px'
    }
}))

const initialFValues = {
    displayName: "",
    email: "",
    password: "",
    password_confirm: ""
}

export const Signup = () => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    
    const {
        values,
        handleInputChange,
    } = useForm(initialFValues)

    const {currentUser, signup} = useAuth()

    const validate = () => {
        let temp = {}

        temp.displayName = values.displayName !== "" ? "" : "Must have display name"
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid."
        temp.password = values.password.length > 7 ? "" : "Password must be at least 8 characters long."
        temp.password_confirm = values.password === values.password_confirm ? "" : "Must match password."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                await signup(values.email, values.password, values.displayName)
                history.push('/')
            } catch {
                setErrors({
                    ...errors,
                    fail: "Error. Try again."
                })
            }
        }
        
        setLoading(false)
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper component="div" style={{ display: 'flex',flexDirection: 'column', paddingTop: 50, paddingBottom: 10, width: '45%', minWidth: '300px', }}>
                <Form  onSubmit={handleSubmit}>
                  <Grid 
                  container 
                  direction='column' 
                  alignItems='center' 
                  justifyContent='center'>
                    <Typography variant='h3'>Sign Up</Typography>
                    {errors.fail && <Alert severity='error'><AlertTitle>{errors.fail}</AlertTitle></Alert>}
                    <Controls.Input
                        className={classes.textField}
                        variant='outlined'
                        label='Display Name'
                        name='displayName'
                        value={ values.displayName }
                        onChange={handleInputChange}
                        error={errors.displayName}
                    />
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
                    <Controls.Input
                        className={classes.textField}
                        variant='outlined'
                        label='Confirm Password'
                        name='password_confirm'
                        type='password'
                        value={ values.password_confirm }
                        onChange={handleInputChange}
                        error={errors.password_confirm}            
                    />
                    <div>
                        <Controls.Button
                        disabled={loading} 
                        type='submit'
                        text='Sign Up'
                        style={{width: 200}}
                        />   
                    </div>
                    <div style={{paddingTop:20}}>
                        <Typography>Already have an account? <Link to='/login'>Log In.</Link></Typography>
                    </div>
                  </Grid> 
                </Form>
            </Paper>
        </div>
    )
}
