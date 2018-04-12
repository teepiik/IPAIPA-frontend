import React from 'react'
import beerService from './services/beerService'
import Beer from './components/Beer'
import BeerForm from './components/BeerForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Frontpage from './components/Frontpage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BeerListing from './components/BeerListing';


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
    // ei tule oikeassa muodossa arrayna, keksi fix
    
    const getBeers = await beerService.getAll()
    console.log(getBeers)
    this.setState({ beers: getBeers })
    console.log(this.state.beers)

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
        <Router>
          <div className="container">
            <Menu />
            <Notification message={this.state.message} />
            <Route exact path="/" render={() => <Frontpage />} />
            <Route exact path="/beers" render={() => <BeerListing state={this.state} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
