import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importing the Header component
import { toast } from 'react-toastify'; // Importing toast for notifications
import Cookies from 'js-cookie'; // Importing js-cookie for handling cookies
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation

const API_URL = process.env.REACT_APP_API_URL; // Getting the API URL from environment variables

const Profile = () => {
    const [user, setUser] = useState({}); // State to hold user information
    const [newPassword, setNewPassword] = useState(''); // State for the new password input
    const [confirmPassword, setConfirmPassword] = useState(''); // State for the confirm password input
    const [showPasswordChange, setShowPasswordChange] = useState(false); // State to toggle password change form visibility
    const navigate = useNavigate(); // Hook for navigation

    // useEffect hook to fetch user profile data when the component mounts
    useEffect(() => {
        const email = Cookies.get('userEmail'); // Get the user's email from cookies
        const token = Cookies.get('token'); // Get the user's token from cookies

        // If email or token is not found, redirect to login page
        if (!email || !token) {
            navigate('/login');
            return;
        }

        // Fetch user profile data
        const url = `${API_URL}/api/profile?email=${email}`;
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => setUser(data)) // Set the user data in state
            .catch(error => {
                console.error('Error fetching user profile:', error);
                toast.error('Failed to fetch user profile.'); // Show error toast if fetching fails
            });
    }, [navigate]); // Dependencies for useEffect

    // Function to handle password change
    const handlePasswordChange = () => {
        const email = Cookies.get('userEmail'); // Get the user's email from cookies
        const token = Cookies.get('token'); // Get the user's token from cookies

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }

        // Make a PUT request to update the password
        fetch(`${API_URL}/api/profile/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
            body: JSON.stringify({ email, newPassword }), // Send email and new password in the request body
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => toast.success(data.message)) // Show success toast if password is updated
            .catch(error => toast.error('Error updating password:', error.message)); // Show error toast if updating fails
    };

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <p className="text-gray-900">{user.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>
                {!showPasswordChange && (
                    <button
                        onClick={() => setShowPasswordChange(true)} // Show password change form when clicked
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                )}
                {showPasswordChange && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password:</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} // Update new password state
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm New Password:</label>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <button
                            onClick={handlePasswordChange} // Trigger password change when clicked
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Confirm Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
