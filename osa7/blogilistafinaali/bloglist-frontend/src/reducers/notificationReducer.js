
const initialState = {
  okmessage: null,
  errormessage: null 
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OKMESSAGE':
      return {...state, okmessage: action.message}
    case 'SET_ERRORMESSAGE':
      return { ...state, errormessage: action.message }
    case 'RESET_OKMESSAGE':
      return { ...state, okmessage: null }
    case 'RESET_ERRORMESSAGE':
      return { ...state, errormessage: null }
    default:
      return state
  }
}

export const setOkmessage = (message) => {
  return {
    type: 'SET_OKMESSAGE',
    message
  }
}

export const setErrormessage = (message) => {
  return {
    type: 'SET_ERRORMESSAGE',
    message
  }
}

export const resetOkmessage = () => {
  return {
    type: 'RESET_OKMESSAGE',
  }
}

export const resetErrormessage = () => {
  return {
    type: 'RESET_ERRORMESSAGE',
  }
}

export default notificationReducer