import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        city: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limit phone number to 10 digits
        if (name === 'phoneNumber' && value.length > 10) return;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add registration logic here
    };

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-700">
            {/* Header Section */}
            <PageHeader
                title="Create Account"
                subtitle="Sell your bike in 3 steps"
            />

            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className="flex-1 px-6 py-4 flex flex-col gap-0 overflow-y-auto"
            >
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <Input
                        label="Full Name"
                        name="fullName"
                        placeholder="Raj Kumar"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    <Input
                        label="Phone Number"
                        name="phoneNumber"
                        type="tel"
                        placeholder="9876543210"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        maxLength={10}
                    />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="raj@email.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                    <Input
                        label="City"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                    <Button variant="primary" type="submit">
                        Send OTP & Register
                    </Button>
                    <p className="text-center text-xs text-gray-500 mt-4 font-medium">
                        By signing up you agree to our <span className="text-[#3B82F6] cursor-pointer hover:underline">Terms</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;
