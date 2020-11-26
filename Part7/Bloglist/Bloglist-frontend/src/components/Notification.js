import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  return <div>
    {(notification.message &&
      <Alert variant={notification.type === 'success' ? 'success' : 'danger'}>
        {notification.message}
      </Alert>
    )}
  </div>
}

export default Notification
