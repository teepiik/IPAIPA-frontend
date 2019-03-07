import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const UserListing = (props) => {

    return (
        <div>
            <h2 className='header'>Users</h2>
            <ListGroup>
                {props.users.map(user => user === undefined ? null :
                    <ListGroupItem key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                </ListGroupItem>)}
            </ListGroup>
        </div>
    )
}

export default UserListing