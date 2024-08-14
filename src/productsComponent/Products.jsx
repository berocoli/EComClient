import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7281/api/Products/list(stored)', {
                    responseType: 'json',
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getProducts(); // Call the function to fetch the products when the component mounts
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
                return (
                    <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            className="w-full h-48 object-cover"
                            src={`../../assets/${product.imageUrl}`}
                            alt={product.name}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <p className="text-gray-800 font-semibold mt-4">Price: ${product.price}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductsComponent;
