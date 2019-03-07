import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const BeerListing = (props) => {

    return (
        <div className='beersListing'>
            <h2 className='header'>Beers</h2>
            <ListGroup>
                {props.beers.map(beer => beer === undefined ? null :
                    <ListGroupItem key={beer.id}>
                        <Link to={`/beers/${beer.id}`}>{beer.name} ({beer.type}, {beer.brewery}, {beer.country})</Link>
                    </ListGroupItem>)}
            </ListGroup>
        </div>
    )
}

export default BeerListing