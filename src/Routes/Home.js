import React from 'react'

export const Home = (props) => {
    const { user } = props
    return (
        <div>
            {`Welcome ${user}`}
        </div>
    )
}
