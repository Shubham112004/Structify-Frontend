import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
import ShopFiltering from './ShopFiltering'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const filters = {
    categories: ['all', 'mobiles', 'headphones', 'chargers', 'tablets'],
    colors: ['all', 'black', 'red', 'gold', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under $200', min: 0, max: 200 },
        { label: '$200 - $500', min: 200, max: 500 },
        { label: '$500 - $15000', min: 500, max: 15000 },
        { label: '$15000 - Above', min: 15000, max: Infinity }
    ]
}

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRanges: ''
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(8)
    const { category, color, priceRanges } = filtersState
    const [minPrice, maxPrice] = priceRanges.split('-').map(Number)

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage,
    })

    //clear the filters
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRanges: ''
        })
    }

    //handle paginating
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products.</div>

    const startProduct = (currentPage - 1) * productsPerPage + 1
    const endProduct = startProduct + products.length - 1


    return (

        <>
            <main>
                <section className='section__container bg-primary-light'>
                    <h2 className='section__header capitalize'>Shop Page</h2>
                    <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum aliquid esse quisquam consequuntur recusandae iste.</p>
                </section>
            </main>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* left side */}
                    <ShopFiltering filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters} />

                    {/* right side */}
                    <div>
                        <h3 className='text-xl font-medium mb-4'>Products Avilable: {products.length}</h3>
                        <ProductCards products={products} />
                        {/* pagination controls */}
                        <div className='mt-6 flex justify-center'>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Pervious</button>
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <button key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-gray-700'} rounded-md mx-1`}
                                    > {index + 1}</button>
                                ))
                            }
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default ShopPage