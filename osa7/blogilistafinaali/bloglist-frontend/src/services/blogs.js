import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const modify = async modifiedObject => {
  const response = await axios
    .put(`${baseUrl}/${modifiedObject.id}`, modifiedObject)
  return response.data
}

const deleteObject = async objectToDelete => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios
    .delete(`${baseUrl}/${objectToDelete.id}`,  config)

  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  console.log(response.data)
  return response.data
}

export default { setToken, getAll, create, modify, deleteObject, addComment }