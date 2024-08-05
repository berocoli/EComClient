import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import FormComponent from './loginComponent/login';

function App() {
  const [apiData, setApiData] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
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
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (

      <>
      <nav className="flex fixed justify-between items-center top-0 left-0 w-full bg-slate-600 text-white p-4 shadow z-50">
      <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-help">هاوڕێ</span>
      <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={fetchData}>
        {apiData ? 'Close Table' : 'Fetch API Data'}
      </span>
      <span className='rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer' onClick={fetchCurrencies}>
        {currencies ? 'Close Currencies' : 'Fetch Currencies'}
      </span>
      <span className="rounded-lg bg-zinc-700 hover:bg-zinc-800 px-2 py-1 cursor-pointer" onClick={toggleForm}>
        {showForm ? 'Close Form' : 'Show Form'}
      </span>
    </nav><div id="root" className="container mx-auto p-4 mt-20">
        {apiData && (
          <div className="table mt-4 overflow-x-auto shadow-md">
            <div className="min-w-full bg-white border border-gray-200">
              <div className='table-header-group'>
                <div className='table-row bg-gray-300'>
                  <div className="table-cell py-2 px-4 border-b">Name</div>
                  <div className="table-cell py-2 px-4 border-b">Email</div>
                  <div className="table-cell py-2 px-4 border-b">ID</div>
                </div>
              </div>
              <tbody>
                {apiData.map((item) => (
                  <tr key={item.id} className='odd:bg-white even:bg-slate-100'>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.email}</td>
                    <td className="py-2 px-4 border-b">{item.id}</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>
        )}
        {currencies && (
          <div className="overflow-x-auto shadow-lg rounded-xl">
            <div className="table min-w-full divide-y divide-gray-200">
              <div className="table-header-group bg-gray-700">
                <div className='table-row'>
                  <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                    Currency Code 🌐
                  </div>
                  <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                    Forex Buying 💰
                  </div>
                  <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                    Forex Seling 💸
                  </div>
                </div>
              </div>
              <tbody className="bg-white divide-y divide-gray-200">
                {currencies.map((currency) => (
                  <tr key={currency.CurrencyCode}>
                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                    {currencyEmojis[currency.CurrencyCode]} {currency.CurrencyCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">{currency.ForexBuying}</td>
                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">{currency.ForexSelling}</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>
        )}
        {showForm && <FormComponent />} {/* This should be the only place where FormComponent is rendered */}
      </div>
      </>
  );
}

export default App;
