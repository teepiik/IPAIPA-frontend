import axios from 'axios'
import beerservice from './beerService'
const baseUrl = '/api/reviews'
let token

const setToken = (newtok) => {
    token = `bearer ${newtok}`
}

const config = () => {
    return {
        headers: { 'Authorization': token }
    }
}

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

const giveNameOfTheBeerReviewed = async (reviewId) => {
    const review = await axios.get(`${baseUrl}/${reviewId}`)
    const reviewedBeerObject = await beerservice.getOne(review.reviewedBeer)
    return reviewedBeerObject.name
}

export default { getAll, create, update, destroy, getOne, setToken, giveNameOfTheBeerReviewed }