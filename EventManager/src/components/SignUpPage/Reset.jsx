import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../Modules/Api';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const api = Api;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const stored = sessionStorage.getItem('user');  // Changed from localStorage to sessionStorage
        if (stored) {
            const parsed = JSON.parse(stored);
            setToken(parsed.TOKEN);
            setUserData(parsed.result);
        }
    }, []);


    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const err = {};

       

        if (!form.newPassword) {
            err.newPassword = 'New password is required.';
        } else if (form.newPassword.length < 6) {
            err.newPassword = 'Password must be at least 6 characters.';
        }

        if (!form.confirmPassword) {
            err.confirmPassword = 'Confirm your new password.';
        } else if (form.confirmPassword !== form.newPassword) {
            err.confirmPassword = 'Passwords do not match.';
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) return;
    
        const payload = {
            username: userData?.username,
            name: userData?.name,
            phno: userData?.phno,
            password: form.newPassword,
        };
    
        try {
            const response = await axios.put(api + 'user', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'TOKEN': token,
                    'USERNAME': userData?.username,
                },
            });
    
            console.log("PAYLOAD= ", payload);
            console.log('Response:', response.data);
    
            // ✅ Display error from server if status is false
            if (response.data.status === false) {
                alert(`Error: ${response.data.error}`);
                return;
            }
    
            alert('Password updated successfully!');
            navigate('/admin');
        } catch (err) {
            console.error('Error updating password:', err.response?.data || err.message);
            alert('Failed to update password.');
        }
    };
    
    


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-gray-400 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default Reset;
