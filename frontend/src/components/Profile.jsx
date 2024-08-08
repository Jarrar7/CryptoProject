import React, { useEffect, useState } from 'react';
import Header from './Header'
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000';

const Profile = () => {
    const [user, setUser] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const email = localStorage.getItem('userEmail'); // Get the user email from local storage

    useEffect(() => {
        if (email) {
            const url = `${API_URL}/api/profile?email=${email}`;
            console.log('Fetching user profile from:', url);
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('User data received:', data);
                    setUser(data);
                })
                .catch(error => console.error('Error fetching user profile:', error));
        }
    }, [email]);

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match')
            return;
        }

        fetch(`${API_URL}/api/profile/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        })
            .then(response => response.json())
            .then(data => toast.success(data.message))
            .catch(error => toast.error('Error updating password:', error));
    };

    return (
        <div>
            <Header />
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
                        onClick={() => setShowPasswordChange(true)}
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
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm New Password:</label>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <button
                            onClick={handlePasswordChange}
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
