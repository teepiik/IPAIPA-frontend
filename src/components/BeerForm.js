import React from 'react'

const BeerForm = ({ onSubmit, handleChange, newBeerName, newBeerType }) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3> Add new beer </h3>
                <div>
                    name
                    <input
                        type="text"
                        name="newBeerName"
                        value={newBeerName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    type
                    <input
                        type="text"
                        name="newBeerType"
                        value={newBeerType}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BeerForm