import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { editNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.editNotification(`new anecdote '${content}' added`, 10)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
   </>
  )
}

export default connect(
  null,
  { createAnecdote, editNotification }
)(AnecdoteForm)
