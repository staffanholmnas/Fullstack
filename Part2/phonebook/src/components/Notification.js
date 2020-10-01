import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message.greenBorder ? "added" : "error"}>
        {message.message}
      </div>
    )
  }

  export default Notification
  