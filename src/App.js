import React from 'react'
import beerService from './services/beerService'
import Beer from './components/Beer'
import BeerForm from './components/BeerForm'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      beers: [],
      newBeerName: '',
      newBeerType: '',
      error: '',
      message: ''
    }
  }

  componentWillMount = async () => {
    const getBeers = await beerService.getAll()
    this.setState({ beers: getBeers })

  }

  handleFieldChanges = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBeer = async (event) => {
    event.preventDefault()
    const beerObject = {
      name: this.state.newBeerName,
      type: this.state.newBeerType
    }

    const addedBeer = await beerService.create(beerObject)
    this.setState({
      beers: this.state.beers.concat(addedBeer),
      newBeerName: '',
      newBeerType: ''
    })
  }

  render() {

    const beersToShow = this.state.beers

    const beerForm = () => (
      <BeerForm
        onSubmit={this.addBeer}
        handleChange={this.handleFieldChanges}
        newBeerName={this.state.newBeerName}
        newBeerType={this.state.newBeerType} />
    )

    return (
      <div>
        <h1>Beers</h1>
        <div>
          <ul>
            {beersToShow.map(beer =>
              <Beer beer={beer} />)}
          </ul>
        </div>
        {beerForm()}

      </div>
    );
  }
}

export default App;
