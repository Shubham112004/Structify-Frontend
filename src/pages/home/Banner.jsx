import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/header.png'

const Banner = () => {
    return (
        <main>
            <div className='section__container header__container'>
                <div className='header__content z-30'>
                    <h4 className='uppercase'>Up to 20% Discount<sup>*</sup></h4>
                    <h1>Big Deals on Big Brands</h1>
                    <p>Get the latest smartphones from top brands like Apple, Samsung, and OnePlus at unbeatable prices. Shop now and save big on your favorite models!</p>
                    <button className='btn'><Link to="/shop">EXPLORE NOW!</Link></button>
                </div>
                <div className='header__image'>
                    <img src={bannerImg} alt="banner img" />
                </div>
            </div>
        </main>
    )
}

export default Banner