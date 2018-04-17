import React from 'react'
import { Button } from 'react-bootstrap'

const Beer = ({ beer, handleDelete }) => (
    <div className="beer">
        <h3>{beer.name}</h3>
        <p>type: {beer.type}, alcohol%: {beer.alcohol_percent}</p>
        <p>brewery: {beer.brewery}, country of origin: {beer.country}</p>

        <form onSubmit={handleDelete}>
            <Button bsStyle="success" type="submit">delete</Button>
        </form>
    </div>
)

export default Beer