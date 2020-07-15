const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'EDIT_FILTER':
      return action.data.newFilter
    default:
      return state
  }
}

export const editFilter = (newFilter) => {
  return {
    type: 'EDIT_FILTER',
    data: { newFilter }
  }
}

export default filterReducer