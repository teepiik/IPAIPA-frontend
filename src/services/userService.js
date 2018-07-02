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

// return only id
const findByUsername = async (username) => {
    const users = await getAll()
    let correctUser = 'not found' // check this
    correctUser = users.find(user => user.username === username)
    return correctUser.id
}

const giveTenReviews = () => {
    // TODO for userpage etc
}

const giveTenRecommendations = () => {
    // TODO for userpage etc
}

export default { getAll, getOne, setToken, findByUsername }