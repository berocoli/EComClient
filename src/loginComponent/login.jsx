import React, { useState } from 'react';
import './login.css'; // Adjust the path as necessary
import FormComponent from '../signupComponent/signup'; // Adjust the path if necessary

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
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegEx.test(formData.input)) {
            console.log('Sending email login request');
            try {
                const response = await axios.post('https://localhost:7281/api/Customers/LoginWithEmail', {
                    email: formData.input,
                    password: formData.password
                });
                if (response.status === 200) {
                    console.log('Login with email successful');
                    sessionStorage.setItem('user', response.data);
                    window.location.reload();
                } else {
                    console.error('Error logging in:', response.data);
                }
            } catch (error) {
                console.error('Error logging in', error);
            }
            } else {
                console.log('Sending name login request');
                try {
                    const response = await axios.post('https://localhost:7281/api/Customers/LoginWithName', {
                        name: formData.input,
                        password: formData.password
                    });
                    if(response.status === 200){
                        console.log('Login with username successful');
                        sessionStorage.setItem('user', response.data);
                        window.location.reload();
                    } else {
                        console.error('Error logging in:', response.data);
                    }
                } catch {
                    console.error('Error logging in:', error);
                }
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
                            <label htmlFor="input" className="block text-gray-700 font-bold mb-2">Name or Email:</label>
                            <input
                                type="text"
                                id="input"
                                name="input"
                                value={formData.email || formData.name}
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
