import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon for the eye icon
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importing eye and eye-slash icons
import logo from '../assets/logo.png'; // Importing the logo image
import { toast } from 'react-toastify'; // Importing toast for notifications
import Cookies from 'js-cookie'; // Importing js-cookie for handling cookies

const API_URL = process.env.REACT_APP_API_URL; // Getting the API URL from environment variables

const Login = () => {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            console.log('Sending login request with:', { email, password });
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send email and password in the request body
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Login failed: ${errorData.error}`); // Show error toast if login fails
                throw new Error(`Login failed: ${errorData.error}`);
            }

            const data = await response.json();

            // Store token and user email in cookies
            Cookies.set('token', data.token, { expires: 1 }); // Set token cookie with 1-day expiration
            Cookies.set('userEmail', email, { expires: 1 }); // Set user email cookie with 1-day expiration

            navigate('/home'); // Navigate to home page on successful login
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    // Function to toggle password visibility
    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle showPassword state
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Market Analysis Logo" className="w-32 h-32" /> {/* Render the logo */}
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                            id="password"
                            className="w-full px-3 py-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            required
                        />
                        <span
                            onClick={toggleShowPassword} // Toggle password visibility when clicked
                            className="absolute right-3 top-10 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> {/* Toggle eye icon */}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
