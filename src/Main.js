import React from 'react'
import Card from './Card'
import cards from './cards'

export default function Main() {

    const cardElements = cards.map(card => {
        return <Card
            img={"place_2.png"}
            country="Greece"
            city="Athens"
            distance="48 kilometers"
            rating="5.0"
            date="April 20 - 25"
            price={136}
        />
    })




    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            padding: "10px",
            marginTop: "30px"
        }}>
            <Card
                img={cards[0].img}
                country="Greece"
                city="Athens"
                distance="48 kilometers"
                rating="5.0"
                date="April 20 - 25"
                price={136}
            />

            <Card
                img={cards[1].img}
                country="Greece"
                city="Athens"
                distance="48 kilometers"
                rating="5.0"
                date="April 20 - 25"
                price={136}
            />

            <Card
                img={cards[2].img}
                country="Greece"
                city="Athens"
                distance="48 kilometers"
                rating="5.0"
                date="April 20 - 25"
                price={136}
            />

            <Card
                img={cards[3].img}
                country="Greece"
                city="Athens"
                distance="48 kilometers"
                rating="5.0"
                date="April 20 - 25"
                price={136}
            />
            {cardElements}



        </div>
    )

}