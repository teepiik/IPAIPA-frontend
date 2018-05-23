import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

const Menu = (props) => {
const handleLogout = props.handleLogout

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
                    <Button onClick={handleLogout}>Logout</Button>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>

    )
}
export default Menu