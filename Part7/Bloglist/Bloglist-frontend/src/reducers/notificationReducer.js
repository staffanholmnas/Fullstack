const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timeoutID

export const showNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(timeoutID) // Resets timer for every new notification
    await dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification,
    })
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer
