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

        if (name === 'phoneNumber') {
            // Extract only the actual digits the user typed (after common prefixes)
            let digits = value.replace(/\D/g, '');

            // Handle clearing the field
            if (value === '' || (value === '+' || value === '+9' || value === '+91')) {
                setFormData(prev => ({ ...prev, [name]: '' }));
                return;
            }

            // Logic to strip the internal '91' if it's from the +91 prefix
            // If the field already had +91 and digits starts with 91, it's likely the prefix we extracted
            if (digits.startsWith('91')) {
                // Only strip if there are more digits or if the input actually contains '+91'
                if (digits.length > 2 || value.includes('+91')) {
                    digits = digits.substring(2);
                }
            }

            // Limit to 10 user-entered digits
            digits = digits.substring(0, 10);

            // Reconstruct formatted string
            let formatted = '';
            if (digits.length > 0) {
                formatted = '+91 ' + digits.substring(0, 5);
                if (digits.length > 5) {
                    formatted += ' ' + digits.substring(5);
                }
            } else if (value.includes('+91')) {
                // If they are backspacing through the digits but haven't cleared the prefix entirely
                formatted = '+91 ';
            }

            setFormData(prev => ({ ...prev, [name]: formatted }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/verify', { state: { phoneNumber: formData.phoneNumber } });
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
                        placeholder="+91 98765 43210"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        maxLength={15}
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
