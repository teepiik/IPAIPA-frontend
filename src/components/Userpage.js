import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import userService from '../services/userService'
import beerService from '../services/beerService'
import reviewService from '../services/reviewService';

class Userpage extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null,
            //beers: [],
            //reviews: []
        }
    }

    // willMount wont re-render with async calls
    componentDidMount = async () => {
        const thisUser = await userService.getOne(this.props.userId)
        this.setState({
            user: thisUser
        })
    }

    render() {
        // gives time for getUser
        if (this.state.user === null) {
            return (
                <div></div>
            )
        }

        return (
            <div className='userpage'>
            <p>welcome to userpage</p>
            <h3>Reviews</h3>
            </div>
        )
    }
}

export default Userpage