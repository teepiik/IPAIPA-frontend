import React from 'react'

const BeerForm = ({ onSubmit, handleChange, newBeerName, newBeerType, newBeerCountry, newBeerBrewery, newBeerPercent }) => {
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

                <div>
                    brewery
                    <input
                        type="text"
                        name="newBeerBrewery"
                        value={newBeerBrewery}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    country
                    <input
                        type="text"
                        name="newBeerCountry"
                        value={newBeerCountry}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    alcohol percent
                    <input
                        type="text"
                        name="newBeerPercent"
                        value={newBeerPercent}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BeerForm