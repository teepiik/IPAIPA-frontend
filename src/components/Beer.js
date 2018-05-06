import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import beerService from '../services/beerService'

class Beer extends React.Component {
    constructor() {
        super()
        this.state = {
            beer: null
        }
    }

    // willMount wont re-render with async calls
    componentDidMount = async () => {
        const beer = await this.getBeerById(this.props.beerId)
        this.setState({ beer: beer })
    }

    getBeerById = async (id) => {
        const beer = await beerService.getOne(id)
        return beer
    }

    render() {
        // this gives time for async getBeer call
        if(this.state.beer === null) {
            return (
                <div></div>
            )
        }

        const handleDelete = async (event) => {
            await this.props.deleteBeer(this.state.beer)
            this.props.history.push('/beers')
        }

        // make button for edit, then redirect 

        return (
            <div className="beer">
                <h3>{this.state.beer.name}</h3>
                <p>type: {this.state.beer.type}, alcohol%: {this.state.beer.alcohol_percent}</p>
                <p>brewery: {this.state.beer.brewery}, country of origin: {this.state.beer.country}</p>

                <Button bsStyle="success" onClick={handleDelete}>delete</Button>
                <div> <Link to={`/beers/${this.state.beer.id}/edit`}>Edit</Link></div>

            </div>
        )
    }
}
export default Beer