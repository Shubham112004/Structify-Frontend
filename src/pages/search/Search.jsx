import React, { useState } from 'react'
// import productData from '../../data/products.json'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'
import ProductCards from '../shop/ProductCards'

const Search = () => {

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        // category: category !== 'all' ? category : '',
        // color: color !== 'all' ? color : '',
        // minPrice: isNaN(minPrice) ? '' : minPrice,
        // maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        // page: currentPage,
        // limit: productsPerPage,
    })

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)
    const handleSearch = () => {
        const query = searchQuery.toLowerCase()
        const filtered = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))
        setFilteredProducts(filtered)
    }

    return (
        <>
            {/* <main style={{ marginTop: "4.6rem" }}>
                <section className='section__container bg-primary-light'>
                    <h2 className='section__header capitalize'>Search Products</h2>
                    <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum aliquid esse quisquam consequuntur recusandae iste.</p>
                </section>
            </main> */}

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input
                        type="text"
                        placeholder="search for products..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e);
                        }}
                        className="search-bar w-full max-w-4xl p-2 border rounded"
                    />

                    <button
                        onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'>Search</button>
                </div>

                <ProductCards products={filteredProducts} />

            </section>


        </>
    )
}

export default Search