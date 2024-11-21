import React from 'react'
import truck from '../../assets/truck.gif'
import cashback from '../../assets/cashback.gif'
import support from '../../assets/support.gif'

const PromoBanner = () => {
    return (
        <section className='section__container banner__container'>
            <div className='banner__card'>
                <img src={truck} alt="" className='w-40 ml-12' />
                <h4>Free Delivery</h4>
                <p>"Free Delivery – Bringing Your Favorites to Your Doorstep, Hassle-Free!"</p>
            </div>
            <div className='banner__card'>
                <img src={cashback} alt="" className='w-36 ml-12 mb-4' />
                <h4>100% Money Back Gurrenty</h4>
                <p>"100% Money-Back Guarantee – Your Satisfaction, Our Promise!"</p>
            </div>
            <div className='banner__card'>
                <img src={support} alt="" className='w-36 ml-12 mb-16' />
                <h4>Strong Support</h4>
                <p>"Strong Support – We're Here for You, Every Step of the Way!"</p>
            </div>
        </section>
    )
}

export default PromoBanner