const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      let stateClone = { ...state }
      stateClone = action.notification
      return stateClone
    default:
      return state
  }
}

export const showNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification,
  }
}

export default notificationReducer
