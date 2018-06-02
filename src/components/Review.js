import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import reviewService from '../services/reviewService'
import beerService from '../services/beerService'
import userService from '../services/userService'

class Review extends React.Component {
    constructor() {
        super()
        this.state = {
            review: null,
            beer: null,
            user: null
        }
    }

    // willMount wont re-render with async calls
    componentDidMount = async () => {
        const review = await this.getReviewById(this.props.reviewId)
        const beer = await this.getbeerById(review.reviewedBeer)
        const user = await this.getUserById(review.userWhoViewed)

        this.setState({
            review: review,
            beer: beer,
            user: user
        })
    }

    getReviewById = async (id) => {
        const review = await reviewService.getOne(id)
        return review
    }

    getUserById = async (id) => {
        const user = await userService.getOne(id)
        return user
    }

    getBeerById = async (id) => {
        const beer = await beerService.getOne(id)
        return beer
    }

    render() {
        // this gives time for async getReview call
        if (this.state.review === null ||
            this.state.user === null || this.state.beer === null) {
            return (
                <div>loading resources</div>
            )
        }
        const handleDelete = async (event) => {
            await this.props.deleteReview(this.state.review)
            this.props.history.push('/beers') // may not work
        }

        return (
            <div classname='review'>
                <h3> Review title </h3>

                <div> <Link to={`/beers/${this.state.review.id}`}>beer name</Link></div>
            </div>
        )


    }
}
export default Review