import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.error ? "error" : "added"}>
            {message.message}
        </div>
    )
}

export default Notification
