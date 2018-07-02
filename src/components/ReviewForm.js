import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import beerService from '../services/beerService'
import userService from '../services/userService'

class ReviewForm extends React.Component {
    constructor() {
        super()
        this.state = {
            beer: '',
            userWhoViewed: '',
            reviewedBeer: '', // just id
            reviewedBeerName: '',
            overall_grade: '',
            after_taste: '',
            first_bite: '',
            // not needed date: null,
            comments: ''
        }
    }


    // willMount wont re-render with async calls
    componentDidMount = async () => {
        console.log(this.props.user)
        const userId = await userService.findByUsername(this.props.user.username)
        const beer = await beerService.getOne(this.props.beerId)
        // check some convinient way to get ids
        
        this.setState({
            beer: beer,
            reviewedBeer: this.props.beerId,
            reviewedBeerName: beer.name,
            userWhoViewed: userId
        })
    }
        

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const date = Date()
        this.props.addReview({
            userWhoViewed: this.state.userWhoViewed.id, // only id
            reviewedBeer: this.state.reviewedBeer, // only id
            reviewedBeerName: this.state.reviewedBeerName,
            overall_grade: this.overall_grade,
            after_taste: this.state.after_taste,
            first_bite: this.state.first_bite,
            date: date,
            comments: this.state.comments
        })
        this.props.history.push('/')
    }

    render() {
        if (this.state.reviewedBeer === '') {
            return (
                <div>loading resources</div>
            )
        } else if (this.state.userWhoViewed === '') {
            return (
                <div>Only login users can do reviews</div>
            )
        }

        return (
            <div>
                <h2>Make a review of {this.state.beer.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div>
                            <ControlLabel>Overall Grade:</ControlLabel>
                            <FormControl name='overall_grade' value={this.state.overall_grade} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>First bite:</ControlLabel>
                            <FormControl name='first_bite' value={this.state.first_bite} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>After taste:</ControlLabel>
                            <FormControl name='after_taste' value={this.state.after_taste} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>Comments:</ControlLabel>
                            <FormControl name='comments' value={this.state.comments} onChange={this.handleChange} />
                        </div>
                        <Button bsStyle="success" type="submit">create</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}
export default ReviewForm