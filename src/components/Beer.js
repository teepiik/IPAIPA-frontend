import React from 'react'

const Beer = ({ beer }) => (
        <div className="beer">
            <p>name: {beer.name}, type: {beer.type}</p>
        </div>
    )


export default Beer