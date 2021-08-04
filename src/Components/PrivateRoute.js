import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export const PrivateRoute = ({ component: Component, ...other }) => {
    const { currentUser } = useAuth()

    return (
        <Route
            {...other}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/login'/>
            }}
        />
    )
}
