
import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { toast } from 'react-toastify'; // Import toast notifications from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS for styling notifications

// Base URL for the API, sourced from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const Signup = () => {
    // State to manage the full name input value
    const [name, setName] = useState('');
    // State to manage the email input value
    const [email, setEmail] = useState('');
    // State to manage the password input value
    const [password, setPassword] = useState('');
    // State to manage the confirm password input value
    const [confirmPassword, setConfirmPassword] = useState('');
    // Hook to handle navigation after successful signup
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (password !== confirmPassword) {
            toast.error('Passwords do not match'); // Show error if passwords do not match
            return;
        }

        try {
            // Send a POST request to the signup API
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify({ name, email, password }), // Send name, email, and password in the request body
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                toast.error(`Signup failed: ${errorData.error}`); // Show error notification
                throw new Error(`Signup failed: ${errorData.error}`); // Throw error to be caught
            }

            toast.success('Signup successful!'); // Show success notification
            navigate('/'); // Navigate to the login page after successful signup
        } catch (error) {
            console.error('Signup failed:', error.message); // Log any errors that occur
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            className="w-full px-3 py-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update name state on input change
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-3 py-2 border rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on input change
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="/" className="text-blue-500">Login</a> {/* Link to login page */}
                </p>
            </div>
        </div>
    );
};

export default Signup; // Export the component for use in other parts of the application
