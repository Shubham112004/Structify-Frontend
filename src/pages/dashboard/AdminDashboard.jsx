import React from 'react'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch()
  const handleLogout = async (s) => {
    try {
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
        await logoutUser().unwrap();
        dispatch(logout());
        navigate('/');
      }

    } catch (err) {
      console.error("Failed to logout:", err);
    }
  }
  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="nav__logo">
          <Link to="/" >MobiShop<span>.</span></Link>
          <p className='text-xs '>Admin dashboard</p>
        </div>
        <hr className='mt-5' />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-new-post"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-products"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Manage Products
            </NavLink>
          </li>

          <li className="mb-3">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Users
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/dashboard/manage-orders"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm">
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard