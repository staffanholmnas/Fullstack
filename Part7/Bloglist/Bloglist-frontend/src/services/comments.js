import axios from 'axios'

const create = async (comment, id) => {
  const request = axios.post(`http://localhost:3001/api/blogs/${id}/comments`, comment)
  const response = await request
  return response.data
}

export default { create }
