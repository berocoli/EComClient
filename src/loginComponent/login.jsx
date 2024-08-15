import React, { useState } from 'react';
import './login.css'; // Adjust the path as necessary
import FormComponent from '../signupComponent/signup'; // Adjust the path if necessary

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showSignupForm, setShowSignupForm] = useState(false); // State to toggle forms

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await fetch(`https://localhost:7281/api/Customers/Login?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
                // No body needed as parameters are sent in the query string
            });
    
            if (loginResponse.ok) {
                sessionStorage.setItem('user', JSON.stringify({
                    email: formData.email
                }));
                alert('Logged in successfully!');
                window.location.reload();
            } else {
                alert('Failed to log in. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    const toggleForm = () => {
        setShowSignupForm(!showSignupForm);
    }

    return (
        <>
            <div className='px-4 py-4'>
                {showSignupForm ? (
                    <FormComponent /> // Render the signup form
                ) : (
                    <form onSubmit={handleSubmit} className='bg-white shadow-md'>
                        <div className="mb-4 px-4 py-4">
                            <label htmlFor="input" className="block text-gray-700 font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4 px-4 py-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Login
                        </button>
                    </form>
                )}
            </div>
            <div className='rounded-full bg-white shadow-green-200 shadow-md'>
                <span className='px-4 py-1'>
                    {showSignupForm ? (
                        <>
                            Already have an account? Login
                            <button onClick={toggleForm} className='text-green-600 px-2 py-2'>here</button>
                        </>
                    ) : (
                        <>
                            Don't have an account yet? Sign up
                            <button onClick={toggleForm} className='text-green-600 px-2 py-2'>here</button>
                        </>
                    )}
                </span>
            </div>
        </>
    );
};
export default LoginComponent;
