import React from 'react';
import { Link } from 'react-router-dom';
import RatingStarts from '../../components/RatingStarts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({ products }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className='product-grid'>
            {products.map((product, index) => (
                <div key={index} className='product-card'>
                    <div className='product-image'>
                        <Link to={`/shop/${product._id}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                    </div>

                    <div className='product-details'>
                        <Link to={`/shop/${product._id}`} className='product-title'>
                            {product.name}
                        </Link>
                        <div className='product-pricing'>
                            <span className='current-price'>${product.price}</span>
                            {product.oldPrice && <span className='old-price'>${product.oldPrice}</span>}
                        </div>
                        <RatingStarts rating={product.rating} />
                        <button
                            className='add-to-cart-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;
