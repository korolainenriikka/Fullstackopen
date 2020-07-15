import axios from 'axios'

const baseUrl = 'http://localhost:3300/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const getResponse = await axios.get(baseUrl)
  const toModify = getResponse.data.find(a => a.id === id)
  console.log({...toModify, votes: toModify.votes+1})
  const response = await axios.put(
    baseUrl+`/${id}`, 
    {...toModify, votes: toModify.votes+1}
  )
  return response.data
}

export default { getAll, createNew, addVote }