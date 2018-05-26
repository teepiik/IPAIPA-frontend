import axios from 'axios'
const baseUrl = '/api/beers'
let token

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, config())
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
    return response.data
}

const destroy = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, config())
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const setToken = (token) => {
    token = `bearer ${token}`
}

const config = () => {
    return {
        headers: { 'authorization': token}
    }
}

export default { getAll, create, update, destroy, getOne, setToken }