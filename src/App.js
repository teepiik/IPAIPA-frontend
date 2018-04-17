import React from 'react'
import beerService from './services/beerService'
import Beer from './components/Beer'
import BeerForm from './components/BeerForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Frontpage from './components/Frontpage'
import { BrowserRouter as Router, Route} from 'react-router-dom'
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
    console.log('mounting')
    const getBeers = await beerService.getAll()
    this.setState({ beers: getBeers })
    console.log('bisset states')
  }

  handleFieldChanges = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBeer = async (beer) => {
    const addedBeer = await beerService.create(beer)
    this.setState({
      beers: this.state.beers.concat(addedBeer),
      message: `you created: ${addedBeer.name}`
    })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 5000)
  }

  handleDelete = async (event, beer) => {
    const result = window.confirm('Are you sure to delete this?')
    if(result) {
      console.log(beer)
      await beerService.destroy(beer.id)
      this.setState({
        beers: this.state.beers.filter(b => b.id.toString() !== beer.id),
        message: `Successful deletion`
      })
      setTimeout(() => {
        this.setState({ message: '' })
      }, 5000)
    }
  }

  

  render() {
    const beerByid = (id) => this.state.beers.find(b => b.id === id)

    return (
      <div>
        <Router>
          <div className="container">
            <Menu />
            <Notification message={this.state.message} />
            <Route exact path="/" render={() => <Frontpage />} />
            <Route path="/createbeer" render={({ history }) => <BeerForm history={history} addBeer={this.addBeer} />} />
            <Route exact path="/beers" render={() => <BeerListing beers={this.state.beers} />} />
            <Route exact path="/beers/:id" render={({match}) => <Beer beer={beerByid(match.params.id)} handleDelete={this.handleDelete} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
