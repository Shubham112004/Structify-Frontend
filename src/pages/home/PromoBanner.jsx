import React from 'react'

const PromoBanner = () => {
    return (
        <section className='section__container banner__container'>
            <div className='banner__card'>
                <span>
                    <i className="ri-truck-line"></i>
                </span>
                <h4>Free Delivery</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, debitis!</p>
            </div>
            <div className='banner__card'>
                <span>
                    <i className="ri-money-rupee-circle-line"></i>
                </span>
                <h4>100% Money Back Gurrenty</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, debitis!</p>
            </div>
            <div className='banner__card'>
                <span>
                    <i className="ri-group-line"></i>
                </span>
                <h4>Strong Support</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, debitis!</p>
            </div>
        </section>
    )
}

export default PromoBanner