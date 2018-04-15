import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'


class BeerForm extends React.Component {
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

        const beerObject = {
            name: this.state.name,
            brewery: this.state.brewery,
            country: this.state.country,
            type: this.state.type,
            alcohol_percent: this.state.alcohol_percent
        }

        this.props.addBeer(beerObject)
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h2>Create new beer</h2>
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
                        <Button bsStyle="success" type="submit">create</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default BeerForm