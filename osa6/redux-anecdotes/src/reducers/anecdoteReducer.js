import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const anecdotesEdited = state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return anecdotesEdited.sort((a1, a2) => a2.votes - a1.votes)
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id }
    }) 
  }
} 

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: { newAnecdote }
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer