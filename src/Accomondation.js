import React from 'react';
import CardDetails from './CardDetails';

export default function Accomondation() {
    return (
        <>
            <CardDetails
                title="Vita Residence, a Charming Family Escape"
                rating="5.0"
                reviews="9"
                city="Athens"
                country="Greece"
                typeOfPlace="Entire villa"
                hosterName="Valia"
                guests="16+"
                bedrooms="8"
                beds="11"
                baths="5"
                area="500"
                livingRooms="2"
                distance="48"
                date="April 20 - 25"
                price={500}
                airbnbFee={500}
                description='This spacious suite with Hot Tub 
                is located at the highest point of the village with stunning
                and unlimited views to the famous caldera and the volcano.
                The king size bed and and the views from the balcony will give unique
                moments of relaxation and enjoyment!'
            />
        </>
    )
}