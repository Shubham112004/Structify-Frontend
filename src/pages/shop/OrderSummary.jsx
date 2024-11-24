import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL';
import paymentLoader from '../../assets/payment_loader.gif';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import Swal from 'sweetalert2';

const OrderSummary = () => {
    const { user } = useSelector((state) => state.auth); // Get the logged-in user from Redux store
    const { products, tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart);
    const [loading, setLoading] = useState(false);

    // Fetch logged-in user data
    const { data: userData, isLoading: userLoading, error: userError } = useGetUserQuery();

    const handleCheckout = async () => {

        if (!user || !user._id) {
            Swal.fire({
                icon: 'info',
                title: 'Please login for checkout!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post(`${getBaseUrl()}/api/stripe/create-checkout-session`, {
                products,
                grandTotal
            });
            window.location.href = data.url; // Redirect to Stripe Checkout
        } catch (error) {
            console.error('Error during checkout:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (userLoading) {
        return <p>Loading user information...</p>;
    }

    if (userError) {
        return <p className="text-red-500">Failed to fetch user information.</p>;
    }

    return (
        <div className="bg-primary-light mt-5 rounded text-base">
            <div className="px-6 py-4 space-y-5">
                <h2 className="text-xl text-text-dark">Order Summary</h2>
                <p className="text-text-dark mt-2">Selected Items: {selectedItems}</p>
                <h3 className="font-bold">Total Price: ${totalPrice.toFixed(2)}</h3>
                {/* <p>Tax: ({(taxRate * 100).toFixed(2)}%): ${tax.toFixed(2)}</p>
                <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3> */}

                {loading ? (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="text-center">
                            <img src={paymentLoader} alt="Loading..." className="w-16 h-16 mx-auto" />
                            <p className="text-white mt-4">Redirecting to Payment...</p>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 mb-6">
                        <button
                            className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center"
                            onClick={handleCheckout}
                        >
                            <span className="mr-2">Proceed Checkout</span>
                            <i className="ri-bank-card-line"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
