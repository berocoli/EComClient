import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginForm from './loginComponent/login';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import PdfButtonComponent from './PdfButtonComponent/pdfComponent';

function App() {
  const [apiData, setApiData] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    setIsSignedIn(!!user);
    setIsLoggedIn(!!user);
  }, []);

  const fetchData = async () => {
    // Set other sections to null or false
    setCurrencies(null);
    setShowForm(false);
    setShowButton(false);

    if (apiData) {
      setApiData(null);
    } else {
      try {
        const response = await axios.get('https://localhost:7281/api/Customers/list');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const fetchCurrencies = async () => {
    // Set other sections to null or false
    setApiData(null);
    setShowForm(false);

    if (currencies) {
      setCurrencies(null);
    } else {
      try {
        const tableData = await axios.get('https://localhost:7281/api/Currency/rates');
        const currencyData = typeof tableData.data === 'string' ? JSON.parse(tableData.data) : tableData.data;
        setCurrencies(currencyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const currencyEmojis = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    JPY: "🇯🇵",
    CHF: "🇨🇭",
    QAR: "🇶🇦",
  };

  const toggleForm = () => {
    // Set other sections to null or false
    setApiData(null);
    setCurrencies(null);
    setShowButton(false);

    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    alert("Logged out successfully!");
    window.location.reload();
  };

  const toggleButton = () => {
    setApiData(null);
    setCurrencies(null);
    setShowForm(false);

    setShowButton((prevShowButton) => !prevShowButton);
  }

  return (
    <>
      <nav className="flex fixed justify-between items-center top-0 left-0 w-full bg-slate-600 text-white p-4 shadow z-50">
        <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-help">هاوڕێ</span>
        <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchData}>
          {apiData ? 'Close Table' : 'Fetch API Data'}
        </span>
        <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchCurrencies}>
          {currencies ? 'Close Currencies' : 'Fetch Currencies'}
        </span>
        {!isLoggedIn && (
          <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={toggleForm}>
            {showForm ? 'Main Menu' : 'Login'}
          </span>
        )}
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2 bg-zinc-700 hover:bg-zinc-800 px-3 py-2 rounded-lg cursor-pointer">
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
      <>
        <div id="main-content" className="container mx-auto p-4 mt-20">
          {apiData && (
            <div>
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
          {currencies && (
            <div className="overflow-x-auto shadow-lg rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="table-header-group bg-gray-700">
                  <tr className="table-row">
                    <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Currency Code 🌐
                    </th>
                    <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Forex Buying 💰
                    </th>
                    <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Forex Selling 💸
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currencies.map((currency) => (
                    <tr key={currency.CurrencyCode}>
                      <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                        {currencyEmojis[currency.CurrencyCode]} {currency.CurrencyCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                        {currency.ForexBuying}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                        {currency.ForexSelling}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showForm && <LoginForm />}
        </div>
      </>
      );
}

      export default App;
