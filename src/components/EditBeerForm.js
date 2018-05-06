import React from 'react'
import beerService from '../services/beerService'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class EditBeerForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            brewery: '',
            country: '',
            type: '',
            alcohol_percent: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.editBeer(this.props.beerId,{
            name: this.state.name,
            brewery: this.state.brewery,
            country: this.state.country,
            type: this.state.type,
            alcohol_percent: this.state.alcohol_percent
        })
        this.props.history.push(`/beers`)
    }

    getBeerById = async (id) => {
        const beer = await beerService.getOne(id)
        return beer
    }

    // willMount wont re-render with async calls
    componentDidMount = async () => {
        const beer = await this.getBeerById(this.props.beerId)
        this.setState({
            name: beer.name,
            brewery: beer.brewery,
            country: beer.country,
            type: beer.type,
            alcohol_percent: beer.alcohol_percent
        })
    }

    render() {

        /* Propably not needed in this case
        // this gives time for async getBeer call
        if (this.state.name === '') {
            return (
                <div></div>
            )
        }*/

        return (
            <div>
                <h2>Edit</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div>
                            <ControlLabel>Name:</ControlLabel>
                            <FormControl name='name' value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>Brewery:</ControlLabel>
                            <FormControl name='brewery' value={this.state.brewery} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>Country:</ControlLabel>
                            <FormControl name='country' value={this.state.country} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>Type:</ControlLabel>
                            <FormControl name='type' value={this.state.type} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel>Alcohol percent:</ControlLabel>
                            <FormControl name='alcohol_percent' value={this.state.alcohol_percent} onChange={this.handleChange} />
                        </div>
                        <Button bsStyle="success" type="submit">edit</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default EditBeerForm