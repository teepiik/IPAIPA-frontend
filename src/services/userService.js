import axios from 'axios'
const baseUrl = '/api/users'
let token

// do you need update, create, delete?

const setToken = (token) => {
    token = `bearer ${token}`
}

const config = () => {
    return {
        headers: { 'Authorization': token}
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { getAll, getOne, setToken }