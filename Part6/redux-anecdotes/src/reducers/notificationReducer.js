const notificationReducer = (state = 'Initial message', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      default:
        return state
    }
  }
  // not needed yet
  export const notificationChange = notification => {
    return {
      type: 'SET_NOTIFICATION',
      notification,
    }
  }
  
  export default notificationReducer
   