import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL';
import payment_loader from '../../assets/payment_loader.gif';

const OrderSummary = () => {
    const products = useSelector((store) => store.cart.products);
    const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart);
    const [loading, setLoading] = useState(false); // Loading state for the checkout process

    const handleCheckout = async () => {
        setLoading(true); // Start loading when checkout is initiated
        try {
            const response = await axios.post(`${getBaseUrl()}/api/stripe/create-checkout-session`, {
                products,
                grandTotal, // Send the grand total to the backend
            });
            window.location.href = response.data.url; // Redirect to Stripe Checkout
        } catch (error) {
            setLoading(false); // Stop loading if there is an error
            console.error('Error during checkout:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='bg-primary-light mt-5 rounded text-base'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-xl text-text-dark'>Order Summary</h2>
                <p className='text-text-dark mt-2'>Selected Items: {selectedItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                {/* <p>Tax: ({taxRate * 100}%): ${tax.toFixed(2)}</p> */}
                {/* <h3 className='font-bold'>Grand Total: ${grandTotal.toFixed(2)}</h3> */}

                {/* Display loader in the center of the screen with a message */}
                {loading ? (
                    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-800 flex justify-center items-center z-50">
                        <div className="text-center">
                            <img src={payment_loader} alt="Loading..." className="w-16 h-16 mx-auto" />
                            <p className="text-white mt-4">Redirecting to Payment...</p>
                        </div>
                    </div>
                ) : (
                    <div className='px-4 mb-6'>
                        <button
                            className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center'
                            onClick={handleCheckout}
                        >
                            <span className='mr-2'>Proceed Checkout </span><i className="ri-bank-card-line"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
