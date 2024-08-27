import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginComponent from './loginComponent/Login';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import PdfButtonComponent from './PdfButtonComponent/PdfComponent';
import ProductsComponent from './productsComponent/Products';
import CurrencyRates from './CurrencyComponent/CurrencyRate';
import Profile from './ProfileComponent/Profile';
import { Navigate } from 'react-router-dom';

function App() {
  const [apiData, setApiData] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const uRole = sessionStorage.getItem('userRole');
  useEffect(() => {
    const loggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    setIsLoggedIn(loggedIn === true);
  }, []);

  const toggleCurrencies = () => {
    if (isLoggedIn) {
      setApiData(null);
      setShowForm(false);
      setShowButton(false);

      setCurrencies((prevCurrencies) => !prevCurrencies);
    } else {
      setCurrencies(false);
    }
  };

  const fetchData = async () => {
    // Hide other sections
    setCurrencies(null);
    setShowForm(false);
    setShowButton(false);

    if (apiData) {
      setApiData(null);
    } else {
      try {
        const response = await axios.get('https://localhost:7281/api/User/list');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const pageReloader = () => {
    window.location.reload();
  };

  if (uRole === 'Admin') {
    return <Navigate to="/admin" replace />;
  }

  const toggleForm = () => {
    // Hide other sections
    setApiData(null);
    setCurrencies(null);
    setShowButton(false);

    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    alert("Logged out successfully!");
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');
    window.location.reload();
  };

  const toggleButton = () => {
    setApiData(null);
    setCurrencies(null);
    setShowForm(false);

    setShowButton((prevShowButton) => !prevShowButton);
  };

  const toggleProfile = () => {
    setApiData(null);
    setCurrencies(null);
    setShowForm(false);

    setShowProfile((prevShowProfile) => !prevShowProfile);
  }

    return (
      <div>
        <nav className="flex fixed justify-between items-center top-0 left-0 w-full bg-slate-600 text-white p-4 shadow z-50">
          <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-help" onClick={pageReloader}>BERKE ÖZTÜRK</span>
          <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchData}>
            {apiData ? 'Close Table' : 'Fetch API Data'}
          </span>
          {isLoggedIn && (
            <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={toggleCurrencies}>
              {currencies ? 'Close Currencies' : 'Fetch Currencies'}
            </span>
          )}
          {!isLoggedIn && (
            <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={toggleForm}>
              {showForm ? 'Main Menu' : 'Login'}
            </span>
          )}
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2 bg-zinc-700 hover:bg-zinc-800 px-3 py-2 rounded-lg cursor-pointer" onClick={toggleProfile}>
                <FaUserCircle size={24} />
                <span>Logged In</span>
              </span>
              <span onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 hover:bg-red-700 px-3 py-2 rounded-lg">
                <FaSignOutAlt size={20} />
                <span>Logout</span>
              </span>
            </div>
          )}
        </nav>

        {currencies && (
          <div className='px-16 py-16'>
            <CurrencyRates />
          </div>
        )}

        {showProfile && (
          <div className='px-16 py-16'>
            <Profile />
          </div>
        )}

        <div id="main-content" className="container mx-auto p-4 mt-20">
          {apiData && (
            <div>
              <div className='flex justify-center items-center center text-center content-center'>
                <h2 className='text-gray-100 font-medium italic bg-zinc-600 rounded-md px-2 py-2'>Customers List</h2>
              </div>
              <div className="relative mt-4 overflow-x-auto shadow-md">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="table-header-group">
                    <tr className="table-row bg-gray-300">
                      <th className="table-cell py-2 px-4 border-b">Name</th>
                      <th className="table-cell py-2 px-4 border-b">Email</th>
                      <th className="table-cell py-2 px-4 border-b">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.map((item) => (
                      <tr key={item.id} className="odd:bg-white even:bg-slate-100">
                        <td className="py-2 px-4 border-b">{item.name}</td>
                        <td className="py-2 px-4 border-b">{item.email}</td>
                        <td className="py-2 px-4 border-b">{item.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PdfButtonComponent />
            </div>
          )}

          {showForm && <LoginComponent />}

          {/* Show ProductsComponent only when none of the others are shown */}
          {!apiData && !currencies && !showForm && !showProfile && (
            <div className="mt-8">
              <ProductsComponent />

            </div>
          )}
        </div>
      </div>
    );
};

export default App;