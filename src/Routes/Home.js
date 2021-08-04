import React from 'react'
import { useAuth } from '../Contexts/AuthContext'

export const Home = () => {
    const { currentUser } = useAuth()

    return (
        <div>
            {`Welcome ${currentUser.email}`}
        </div>
    )
}
