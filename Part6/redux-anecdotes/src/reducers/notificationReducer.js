const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            let stateClone = { ...state }
            stateClone = action.notification
            return stateClone
        case 'HIDE_NOTIFICATION':
            return initialState
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

export const hideNotification = (notification) => {
    return {
        type: 'HIDE_NOTIFICATION',
        notification
    }
}

export default notificationReducer
