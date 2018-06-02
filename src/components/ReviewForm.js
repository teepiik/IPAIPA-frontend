import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import beerService from '../services/beerService'
import userService from '../services/userService'

class ReviewForm extends React.Component {
    constructor() {
        super()
        this.state = {
            userWhoViewed: this.props.user,
            reviewedBeer: this.props.beer,
            overall_grade: null,
            after_taste: null,
            first_bite: null,
            // not needed date: null,
            comments: ''
        }
    }


    // willMount wont re-render with async calls
    componentDidMount = async () => {
        const beer = await this.getbeerById(this.props.beerId)

        //const user = await this.getUserById(this.props.userId)
        // check some convinient way to get ids
        this.setState({
            reviewedBeer: beer
            //userWhoViewed: user
        })
    }
    /*
        getUserById = async (id) => {
            const user = await userService.getOne(id)
            return user
        }*/

    getBeerById = async (id) => {
        const beer = await beerService.getOne(id)
        return beer
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        date = Date()
        this.props.addReview({
            userWhoViewed: this.state.userWhoViewed.id, // only id
            reviewedBeer: this.state.reviewedBeer.id, // only id
            overall_grade: this.overall_grade,
            after_taste: this.state.after_taste,
            first_bite: this.state.first_bite,
            date: date,
            comments: this.state.comments
        })
        this.props.history.push('/')
    }

    render() {
        if (this.state.reviewedBeer === null) {
            return (
                <div>loading resources</div>
            )
        } else if (this.state.userWhoViewed === null) {
            return (
                <div>Only login users can do reviews</div>
            )
        }

        return (
            <div>
                <h2>Make a review of {this.state.reviewedBeer.name}</h2>
            </div>
        )
    }
}