import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        
        this.props.login(user)
        this.setState({
            username: '',
            password: ''
        })

        this.props.history.push('/')

    }

    // TODO change loginform password type to password etc

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div>
                            <ControlLabel>Username:</ControlLabel>
                            <FormControl name='username' value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div>
                            <ControlLabel> Password:</ControlLabel>
                            <FormControl name='password' value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <Button bsStyle="success" type="submit">create</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default LoginPage