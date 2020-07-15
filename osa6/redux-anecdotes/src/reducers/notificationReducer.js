const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'EDIT_NOTIFICATION':
      return action.data.newNotification
    case 'DELETE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const editNotification = ( newNotification, timeout ) => {
  return dispatch => {
    dispatch({
      type: 'EDIT_NOTIFICATION',
      data: { newNotification }
    })
    let timeId = null
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION'
      })
    }, timeout * 1000)
  }
}

export default notificationReducer