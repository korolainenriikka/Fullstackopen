import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState(0)

  const changeAnecdote = () => {
    const random=Math.floor(Math.random() * 6)
    console.log(random)
    setSelected(random)
  }

  const addVote = () => {
    const copy = [ ...votes ]
    copy[selected] += 1  
    setVotes(copy)   
  }

  if(votes[mostVotes]<votes[selected]){
    setMostVotes(selected)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {props.anecdotes[selected]}<br/>
          has {votes[selected]} votes<br/>
          <button onClick={addVote}>vote</button>
          <button onClick={changeAnecdote}>next anecdote</button>
        </div>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>
          {props.anecdotes[mostVotes]}<br/>
          has {votes[mostVotes]} votes<br/>
        </div>
      </div>
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)