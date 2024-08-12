import React from "react";
import axios from "axios";
import './Products.css';

const ProductsComponent = () => {
    
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try{
            const response = await axios.get('https://localhost:7281/api/Products/list(stored)', {
                responseType: 'json',
            });
            setProducts(response.data);
        } catch{error}{
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div id="root">
            <span className="bg-gradient-to-br from-green-500 to-purple-600 rounded-xl text-white px-4 py-4">
                <button onClick={getProducts}>Get Products</button>
            </span>
            <div className="products">
                {products.map((product, index) => (
                    <div key={index} className="product">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img src='{product.}' alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
};