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
      newBeerCountry: '',
      newBeerPercent: '',
      newBeerBrewery: '',
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
      type: this.state.newBeerType,
      country: this.state.newBeerCountry,
      alcohol_percent: this.state.newBeerPercent,
      brewery: this.state.newBeerBrewery
    }

    const addedBeer = await beerService.create(beerObject)
    this.setState({
      beers: this.state.beers.concat(addedBeer),
      newBeerName: '',
      newBeerType: '',
      newBeerCountry: '',
      newBeerBrewery: '',
      newBeerPercent: ''
    })
  }

  render() {

    const beersToShow = this.state.beers

    const beerForm = () => (
      <BeerForm
        onSubmit={this.addBeer}
        handleChange={this.handleFieldChanges}
        newBeerName={this.state.newBeerName}
        newBeerType={this.state.newBeerType}
        newBeerPercent={this.state.newBeerPercent}
        newBeerCountry={this.state.newBeerCountry}
        newBeerBrewery={this.state.newBeerBrewer} />
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
