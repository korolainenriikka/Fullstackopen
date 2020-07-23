
const loggedUserReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'NULL_USER':
      return null
    default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const nullUser = () => {
  return {
    type: 'NULL_USER',
  }
}


export default loggedUserReducer