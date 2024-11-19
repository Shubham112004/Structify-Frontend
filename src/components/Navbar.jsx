import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/shop/CartModal'
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'
import 'tw-elements';
import Swal from 'sweetalert2';

const Navbar = () => {
    const products = useSelector((state) => state.cart.products)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate()

    const adminDropdownMenus = [
        { label: 'Dashboard', path: "/dashboard/admin" },
        { label: 'Manage Item', path: "/dashboard/manage-products" },
        { label: 'All Orders', path: "/dashboard/manage-orders" },
        { label: 'Add New Product', path: "/dashboard/add-new-post" },
    ]

    const userDropdownMenus = [
        { label: 'Dashboard', path: "/dashboard" },
        { label: 'Profile', path: "/dashboard/profile" },
        { label: 'Orders', path: "/dashboard/orders" },
        { label: 'Payments', path: "/dashboard/payments" },
    ]

    const dropdownMenus = user?.role === 'admin' ? [...adminDropdownMenus] : [...userDropdownMenus]

    const handleCartToggle = () => setIsCartOpen(!isCartOpen)
    const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen)

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to logout?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await logoutUser().unwrap();
                dispatch(logout());
                navigate('/');
            } catch (error) {
                console.error("Failed to logout", error);
            }
        }
    }

    return (
        <header className="w-full bg-white shadow-md fixed z-50">
            <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        Shoptix<span className="text-secondary">.</span>
                    </Link>
                </div>

                {/* Links for desktop */}
                <ul className={`hidden md:flex space-x-6`}>
                    <li className="link"><Link to="/">Home</Link></li>
                    <li className="link"><Link to="/shop">Shop</Link></li>
                    <li className="link"><Link to="/pages">Pages</Link></li>
                    <li className="link"><Link to="/contact">Contact</Link></li>
                </ul>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/search">
                        <i className="ri-search-2-line"></i>
                    </Link>
                    <button onClick={handleCartToggle} className="relative">
                        <i className="ri-shopping-cart-2-line"></i>
                        {products.length > 0 && (
                            <sup className="absolute -top-2 -right-2 text-xs px-1.5 text-white bg-primary rounded-full">{products.length}</sup>
                        )}
                    </button>
                    <div className="relative">
                        {user ? (
                            <>
                                <img
                                    onClick={handleDropdownToggle}
                                    src={user?.profileImage || avatarImg}
                                    alt="User avatar"
                                    className="w-8 h-8 rounded-full cursor-pointer"
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg">
                                        <ul className="p-2 space-y-2">
                                            {dropdownMenus.map((menu, index) => (
                                                <li key={index}>
                                                    <Link
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        to={menu.path}
                                                        className="block text-gray-700 hover:text-primary"
                                                    >
                                                        {menu.label}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left text-gray-700 hover:text-primary"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="text-sm font-medium">
                                Login/Register
                            </Link>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        className="block md:hidden focus:outline-none"
                        onClick={handleMobileMenuToggle}
                    >
                        <i className="ri-menu-line"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-white border-t`}>
                <ul className="space-y-2 p-4">
                    {[
                        { label: 'Home', path: '/' },
                        { label: 'Shop', path: '/shop' },
                        { label: 'Pages', path: '/pages' },
                        { label: 'Contact', path: '/contact' },
                    ].map((menu, index) => (
                        <li key={index}>
                            <Link
                                to={menu.path}
                                className="block text-gray-700 hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)} // Close the menu on click
                            >
                                {menu.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>


            {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
        </header>
    )
}

export default Navbar
