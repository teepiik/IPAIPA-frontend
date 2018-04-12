import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const BeerListing = (beers) => {
// beers.beers to get to the array named beers
    return (
        <div>
            <h2>Beers</h2>
            <ListGroup>
                {beers.beers.map(beer =>
                    <ListGroupItem key={beer.id}>
                        <Link to={`/beers/${beer.id}`}>{beer.name} ({beer.brewery}, {beer.country})</Link>
                    </ListGroupItem>)}
            </ListGroup>
        </div>
    )
}

export default BeerListing