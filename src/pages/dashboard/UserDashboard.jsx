import React, { useState } from 'react';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';
import Swal from 'sweetalert2';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/dashboard/profile', label: 'Profile' },
  { path: '/dashboard/orders', label: 'Orders' },
  { path: '/dashboard/payments', label: 'Payments' },
  { path: '/dashboard/reviews', label: 'Reviews' },
];

const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await logoutUser().unwrap();
        dispatch(logout());
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <div className="bg-white flex flex-col justify-between md:h-screen p-5 md:p-8">
      {/* Header Section with Toggle Button */}
      <div className="flex justify-between items-center">
        <div className="nav__logo">
          <Link to="/" className="text-xl font-bold">
            MobiShop<span className="text-blue-600">.</span>
          </Link>
          <p className="text-xs text-gray-500">User dashboard</p>
        </div>
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      <hr className="mt-5" />

      {/* Navigation Menu */}
      <div
        className={`${menuOpen ? 'block' : 'hidden'
          } md:block space-y-3 md:space-y-5 pt-5 text-center md:text-left`}
      >
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-500'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Button inside Dropdown */}
        <div className="mt-5 md:mt-0">
          <hr className="mb-3" />
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-medium px-5 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
