import React from 'react'

const Beer = ({ beer }) => {
    return (
        <li className="beer">
            <p>name: {beer.name}, type: {beer.type}</p>
        </li>
    )
}

export default Beer