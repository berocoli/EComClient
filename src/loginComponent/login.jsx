import React, { useState } from 'react';
import './login.css'; // Adjust the path as necessary
import FormComponent from '../signupComponent/signup'; // Adjust the path if necessary
import { root } from 'postcss';

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            // Simulate a sign-up process
            const loginResponse = await fetch("AYOOO/CHANGETHIS", {
                method: "POST ",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (loginResponse.ok) {
                // Simulate logging in by storing user info in sessionStorage
                sessionStorage.setItem('user', JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                }));

                alert("Logged in successfully!");

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                });

                // Refresh the page
                window.location.reload();
            } else {
                alert("Failed to sign up. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const toggleForm = () => {
        setShowSignupForm(!showSignupForm);
    };

    return (
        <>
            <div className='px-4 py-4'>
                {showSignupForm ? (
                    <FormComponent /> // Render the signup form
                ) : (
                    <form onSubmit={handleSubmit} className='bg-white shadow-md'>
                        <div className="mb-4 px-4 py-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4 px-4 py-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>

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
