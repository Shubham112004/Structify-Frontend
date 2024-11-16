import React from 'react'
import card1 from '../../assets/card-1.jpg'
import card2 from '../../assets/card-2.jpg'
import card3 from '../../assets/card-3.jpg'

const cards = [
    {
        id: 1,
        image: card1,
        tred: '2024 Trend',
        title: 'Best Camera Phones',
    },
    {
        id: 2,
        image: card2,
        tred: '2024 Trend',
        title: 'Dolby Sounds',
    },
    {
        id: 3,
        image: card3,
        tred: '2024 Trend',
        title: 'Customers Favourite',
    },
]

const HeroSection = () => {
    return (
        <section className='section__container hero__container'>
            {
                cards.map((card) => (
                    <div key={card.id} className='hero__card'>
                        <img src={card.image} alt="" />
                        <div className='hero__content'>
                            <p>{card.tred}</p>
                            <h4>{card.title}</h4>
                            <a href="#">Discover More!</a>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default HeroSection