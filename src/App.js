import React from 'react'
import beerService from './services/beerService'
import loginService from './services/loginService'
import userService from './services/userService'
import reviewService from './services/reviewService'
import Beer from './components/Beer'
import BeerForm from './components/BeerForm'
import ReviewForm from './components/ReviewForm'
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

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      beerService.setToken(user.token)
      userService.setToken(user.token)
    } else {
      console.log('something went wrong with windowstorage')
    }
  }

  handleFieldChanges = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout = () => {
    this.setState({
      user: null,
      message: 'Logged out'
    })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 5000)
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

  addReview = async (review) => {
    const madeReview = await reviewService.create(review)
    // loading beers may be needed to get reviews
    this.setState({
      message: 'review completed'
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
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      beerService.setToken(loggedUser.token)
      userService.setToken(loggedUser.token)
      this.setState({
        user: loggedUser,
        message: 'Logged in'
      })
      setTimeout(() => {
        this.setState({ message: '' })
      }, 5000)

    } catch (error) {

    }
  }

  render() {

    return (
      <div>
        <Router>
          <div className="container">
            <Menu logout={this.handleLogout} user={this.state.user} />
            <Notification message={this.state.message} />
            <div> <Link to={`/createbeer`}>Add new beer</Link></div>
            <Route exact path="/" render={() => <Frontpage />} />
            <Route path="/createbeer" render={({ history }) => <BeerForm history={history} addBeer={this.addBeer} />} />
            <Route path="/login" render={({ history }) => <LoginPage history={history} login={this.login} />} />
            <Route exact path="/beers" render={() => <BeerListing beers={this.state.beers} />} />
            <Route exact path="/beers/:id" render={({ match, history }) => <Beer beerId={match.params.id} history={history} deleteBeer={this.deleteBeer} />} />
            <Route exact path="/beers/:id/edit" render={({ match, history }) => <EditBeerForm beerId={match.params.id} editBeer={this.editBeer} history={history} />} />
            <Route exact path="/beers/:id/review" render={({ match, history }) => <ReviewForm beerId={match.params.id} history={history} addReview={this.addReview} user={this.state.user}/>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
