import React from 'react'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'
import { Link } from 'react-router-dom'

const Categories = () => {
    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        limit: 0,
    })

    const uniqueCategories = products.reduce((acc, product) => {
        if (!acc.some(item => item.category === product.category)) {
            acc.push(product);
        }
        return acc;
    }, []);
    const displayedCategories = uniqueCategories.slice(0, 3);


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products.</div>
    return (
        <>
            <div className='product__grid'>
                {displayedCategories.map((category) => (
                    <Link key={category._id} to={`/categories/${category.category}`} className='categories__card'>
                        <img src={category.image} alt={category.name} className='object-cover w-24 h-24' />
                        <h4>{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</h4>

                    </Link>
                ))}

                {/* Explore All Card */}
                <Link to="/shop" className='categories__card'>
                    <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRlY2h8ZW58MHx8MHx8fDA%3D" alt="Explore All" className='object-cover w-24 h-24' />
                    <h4>Explore All</h4>
                </Link>
            </div>
        </>
    )
}

export default Categories