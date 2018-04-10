import React from 'react'

const Beer = ({ beer }) => (
        <div className="beer">
            <h3>{beer.name}</h3>
            <p>type: {beer.type}, alcohol%: {beer.alcohol_percent}</p>
            <p>brewery: {beer.brewery}, country of origin: {beer.country}</p>
        </div>
    )

export default Beer