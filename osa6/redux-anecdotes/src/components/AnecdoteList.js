import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { editNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.editNotification(`you voted '${anecdote.content}'`, 5)
  }
  
  return (
    <>
    {props.visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

const filteredAnecdotes = (state) => {
  return state.anecdotes.filter(a =>
  a.content !== undefined)
  .filter(a =>
    a.content.toLowerCase().includes(state.filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: filteredAnecdotes(state),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  editNotification,
  initializeAnecdotes,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)