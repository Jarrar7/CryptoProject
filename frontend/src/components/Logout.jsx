import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignOutAlt } from 'react-icons/fa';

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
            className="bg-red-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center text-sm"
            >
                <FaSignOutAlt className="mr-1" />
                <span>Logout</span>
        </button>
    );
};

export default Logout;
