const userReducer = (state=[], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data
    default:
      return state
  }
}

export const setUsers = (users) => {
  return {
    type: 'GET_USERS',
    data: users
  }
}

export default userReducer