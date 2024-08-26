import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const AdminNavbar = () => {
    const [userData, setUserData] = useState(null);
    const [ordersData, setOrdersData] = useState(null);
    const [productsData, setProductsData] = useState(null);

    const fetchUsers = async () => {
        if (userData) {
            setUserData(null);
        } else {
            try {
                const users = await axios.get('https://localhost:7281/api/User/list');
                setUserData(users.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setOrdersData(null);
            setProductsData(null);
        }
    };

    const fetchOrders = async () => {
        if (ordersData) {
            setOrdersData(null);
        } else {
            try {
                const orders = await axios.get('https://localhost:7281/api/Order/list');
                setOrdersData(orders.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setUserData(null);
            setProductsData(null);
        }
    };

    const fetchProducts = async () => {
        if (productsData) {
            setProductsData(null);
        } else {
            try {
                const products = await axios.get('https://localhost:7281/api/Products/list');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setUserData(null);
            setOrdersData(null);
        }
    };

    return (
        <nav className="flex fixed justify-between items-center top-0 left-0 w-full bg-slate-600 text-white p-4 shadow z-50" >
            <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchUsers}>
                {userData ? 'Close Table' : 'Fetch User Data'}
            </span>
            <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchOrders}>
                {ordersData ? 'Close Currencies' : 'Fetch Currencies'}
            </span>
            <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchProducts}>
                {productsData ? 'Main Menu' : 'Login'}
            </span>
            <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2 bg-red-500 hover:bg-red-700 px-3 py-2 rounded-lg">
                    <span>Logged in as Admin</span>
                </span>
            </div>
        </nav >
    );
};
export default AdminNavbar;