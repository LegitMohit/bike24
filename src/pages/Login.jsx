import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);

        // Navigate to home and pass loginSuccess state
        navigate('/home', { state: { loginSuccess: true }, replace: true });
    };

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-700 relative">

            {/* Header Section */}
            <PageHeader
                title="Welcome Back"
                subtitle="Login to your account"
            />

            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className="flex-1 px-6 py-8 flex flex-col gap-2 overflow-y-auto"
            >
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="raj@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <p className="text-center text-xs text-gray-500 mt-4 font-medium">
                        Don't have an account? <span onClick={() => navigate('/signup')} className="text-[#3B82F6] cursor-pointer hover:underline">Sign up</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
