import React, { useState } from 'react'
import ProductCards from './ProductCards'
// import products from '../../data/products.json'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4)
    }

    const [productsPerPage] = useState(15)

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        limit: productsPerPage,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products.</div>


    return (
        <section className='section__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader'>"Stay Ahead of the Curve – Shop the Trends Everyone's Talking About!"</p>

            {/* products card */}
            <div className='mt-12'>
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>

            {/* load more btn */}
            <div className='product__btn mt-4'>
                {
                    visibleProducts < products.length && (
                        <button className='btn' onClick={loadMoreProducts}>Load More</button>
                    )
                }
            </div>
        </section >
    )
}

export default TrendingProducts