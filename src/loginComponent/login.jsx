import React, { useState } from 'react';
import './Login.css'; // Adjust the path as necessary
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
            const loginResponse = await fetch(`https://localhost:7281/api/Auth/Login?Email=${encodeURIComponent(formData.email)}&Password=${encodeURIComponent(formData.password)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (loginResponse.ok) {
                const data = await loginResponse.json();  // API'den dönen token verisini alıyoruz
                console.log('API Response:', data); // Log the full response for debugging

                const token = data.token?.access; // Access the token correctly
                if (token) {
                    sessionStorage.setItem('token', token);

                    // Token'ı decode etme ve içeriğini gösterme
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    console.log('Decoded JWT:', decodedToken);

                    const { name, email } = decodedToken;
                    sessionStorage.setItem('userName', name);
                    sessionStorage.setItem('userEmail', email);

                    alert('Logged in successfully!');
                    sessionStorage.setItem('isLoggedIn', 'true');
                    window.location.reload();
                } else {
                    console.error('Token is undefined:', data);
                    alert('Failed to retrieve a valid token.');
                    sessionStorage.setItem('isLoggedIn', 'false');
                }
            } else {
                alert('Failed to log in. Please try again.');
                sessionStorage.setItem('isLoggedIn', 'false');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
            sessionStorage.setItem('isLoggedIn', 'false');
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
