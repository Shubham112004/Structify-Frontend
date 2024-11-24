import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const { data: { products = [] } = {}, error, isLoading, refetch } = useFetchAllProductsQuery({ limit: 0 });
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="section__container" style={{ marginTop: "4.6rem" }}>
            <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar w-full max-w-4xl p-2 border rounded"
                />
                <button
                    onClick={() => refetch()}
                    className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded">
                    Refresh Products
                </button>
            </div>

            {isLoading && <p>Loading products...</p>}
            {error && <p>Error fetching products: {error.message}</p>}
            <ProductCards products={filteredProducts} />
        </section>
    );
};

export default Search;