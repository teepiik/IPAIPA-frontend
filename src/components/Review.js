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
        const beer = await this.getBeerById(review.reviewedBeer)
        const user = await this.getUserById(review.userWhoViewed)

        console.log(review)
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
            <div className='review'>
                <h3> Review of {this.state.review.reviewedBeerName}
                    <p> made by <strong>{this.state.review.usernameOfReviewer}</strong></p>
                </h3>
                <div> <p>Review was given {this.state.review.date} </p> </div>
                <p>Overall grade: {this.state.review.overall_grade}</p>
                <p>First bite: {this.state.review.first_bite}</p>
                <p>After taste: {this.state.review.after_taste}</p>
                <em>Comments: {this.state.review.comments}</em>

                <div>Link to the reviewed beer
                <p><Link to={`/beers/${this.state.review.reviewedBeer}`}>{this.state.review.reviewedBeerName}</Link></p></div>
            </div>
        )


    }
}
export default Review