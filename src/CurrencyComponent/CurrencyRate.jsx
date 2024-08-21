import React, { useState, useEffect } from 'react';

const CurrencyRates = () => {
    const [rates, setRates] = useState(null);
    const [isCacheActive, setIsCacheActive] = useState(false);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

        if (!isLoggedIn) {
            return;
        }

        const fetchRates = async () => {
            const cachedData = sessionStorage.getItem('cachedRates');
            if (cachedData) {
                setRates(JSON.parse(cachedData));
                setIsCacheActive(true);
                return;
            }

            try {
                const token = sessionStorage.getItem('token'); // Retrieve the stored token
                if (!token) {
                    console.error("No token found, user might not be authenticated.");
                    return;
                }

                const response = await fetch('https://localhost:7281/api/Currency/rates', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Send the token with the request
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setRates(data);
                    sessionStorage.setItem('cachedRates', JSON.stringify(data));

                    // Set a timeout to simulate the cache becoming active after 30 seconds
                    setTimeout(() => {
                        setIsCacheActive(true);
                    }, 30000);
                } else if (response.status === 401) {
                    console.error('Failed to fetch rates: Unauthorized (401). The token might be invalid or expired.');
                    // Handle token expiration (e.g., log the user out or refresh the token)
                } else {
                    console.error('Failed to fetch rates, status:', response.status);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchRates();
    }, []);

    const currencyEmojis = {
        USD: "🇺🇸",
        EUR: "🇪🇺",
        JPY: "🇯🇵",
        CHF: "🇨🇭",
        QAR: "🇶🇦",
    };

    if (!rates) {
        return <p>Loading currency rates...</p>;
    }

    return (
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
                    {rates.map((rate) => (
                        <tr key={rate.CurrencyCode}>
                            <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                {currencyEmojis[rate.CurrencyCode]} {rate.CurrencyCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                {rate.ForexBuying}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                {rate.ForexSelling}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrencyRates;