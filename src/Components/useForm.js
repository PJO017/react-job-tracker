import {React, useState} from 'react'
import { makeStyles } from '@material-ui/core'

export const useForm = (initialFValues) => {

    const [values, setValues] = useState(initialFValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = (setErrors) => {
        setValues(initialFValues)
        setErrors({})
    }
 
    return {
        values,
        setValues,
        handleInputChange,
        resetForm
    }
}



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1) 
        }
    }
}))

export const Form = (props) => {
    const classes = useStyles()
    const { children, onSubmit, ...other } = props

    return (
        <form className={classes.root} autoComplete="off" onSubmit={onSubmit} {...other}>
            {children}
        </form>
    )
}

        
