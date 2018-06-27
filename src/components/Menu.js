import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

const Menu = (props) => {
    const handleLogout = props.logout

    if (props.user === null || props.user === undefined || props.user === '') {

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Frontpage</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/beers">Beers</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/users">Users</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/login">Login</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>
        )

    } else {
// change button to react-bootstrap nav onSelect etc
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Frontpage</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/beers">Beers</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/users">Users</Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Button bsSize='small' onClick={handleLogout}>Logout</Button>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>
        )
    }
}

export default Menu