import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully!');
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="text-white cursor-pointer"
        >
            Logout
        </button>
    );
};

export default Logout;
