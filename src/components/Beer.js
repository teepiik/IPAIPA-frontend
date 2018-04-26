import React from 'react'
import { Button } from 'react-bootstrap'
import beerService from '../services/beerService'


class Beer extends React.Component {
    constructor() {
        super()
        this.state = {
            beer: null
        }
    }

    componentWillMount = async () => {
        const beer = this.getBeerById(this.props.beerId)
        this.setState({ beer: beer })
    }

    getBeerById = async (id) => {
        console.log('beerservice id')
        console.log(id)
        const beer = await beerService.getOne(id)
        console.log('getBeerById')
        console.log(beer) // toimii tänne
        return beer
    }
    render() {

        const handleDelete = async (event) => {
            console.log('handleDelete')
            console.log(this.state.beer)
            await this.props.deleteBeer(this.state.beer)
        }

        // bisse ei ehdi latautua, promise pending

        return (
            <div className="beer">
                <h3>{this.state.beer.name}</h3>
                <p>type: {this.state.beer.type}, alcohol%: {this.state.beer.alcohol_percent}</p>
                <p>brewery: {this.state.beer.brewery}, country of origin: {this.state.beer.country}</p>

                <Button bsStyle="success" onClick={handleDelete}>delete</Button>

            </div>
        )
    }
}
export default Beer