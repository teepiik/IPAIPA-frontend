import React from 'react'

const Notification = ({ message }) => {
    if (message === null || message==='') {
        return <div></div>
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification