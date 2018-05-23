import React from 'react'
import beerService from './services/beerService'
import loginService from './services/loginService'
import userService from './services/userService'
import Beer from './components/Beer'
import BeerForm from './components/BeerForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Frontpage from './components/Frontpage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BeerListing from './components/BeerListing'
import LoginPage from './components/LoginPage'
import { Link } from 'react-router-dom'
import EditBeerForm from './components/EditBeerForm';

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
      message: '',
      user: null
    }
  }

  // States tuskin tarvii tässä newBeerParametrei enää?

  componentDidMount = async () => {
    const getBeers = await beerService.getAll()
    this.setState({ beers: getBeers })

    const loggedInUser = window.localStorage.getItem('LoggedUser')
    if(loggedInUser !== null) {
      const parsedUser = JSON.parse(loggedInUser)
      const newToken = {
        token: parsedUser.token
      }
      try {

      } catch (error) {
        // handle logout?
      }
    }
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

  editBeer = async (beerId, beer) => {
    const editedBeer = await beerService.update(beerId, beer)
    this.setState({
      beers: this.state.beers.map(b => b.id !== beerId ? b : editedBeer),
      message: `you edited: ${editedBeer.name}`
    })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 5000)
  }

  deleteBeer = async (beer) => {
    const result = window.confirm('Are you sure to delete this?')
    if (result) {
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

  login = async (user) => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      beerService.setToken(user.token)
      userService.setToken(user.token)

    } catch (error) {

    }
  }

  render() {

    return (
      <div>
        <Router>
          <div className="container">
            <Menu />
            <Notification message={this.state.message} />
            <div> <Link to={`/createbeer`}>Add new beer</Link></div>
            <Route exact path="/" render={() => <Frontpage />} />
            <Route path="/createbeer" render={({ history }) => <BeerForm history={history} addBeer={this.addBeer} />} />
            <Route path="/login" render={({ history }) => <LoginPage history={history} login={this.login} />} />
            <Route exact path="/beers" render={() => <BeerListing beers={this.state.beers} />} />
            <Route exact path="/beers/:id" render={({ match, history }) => <Beer beerId={match.params.id} history={history} deleteBeer={this.deleteBeer} />} />
            <Route exact path="/beers/:id/edit" render={({ match, history }) => <EditBeerForm beerId={match.params.id} editBeer={this.editBeer} history={history} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
