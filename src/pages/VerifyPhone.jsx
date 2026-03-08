import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

const VerifyPhone = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const phoneNumber = location.state?.phoneNumber || "+91 98765 43210";
    const verificationId = useMemo(() => `#V${Math.floor(Math.random() * 100000)}`, []);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(45);
    const inputRefs = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index, value) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVerify = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            console.log('Verifying OTP:', otpValue);
            // Add verification logic here
            navigate('/home');
        }
    };

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-700">
            <PageHeader
                title="Verify Phone"
                subtitle={`Verification ID: ${verificationId}`}
            />

            <div className="flex-1 px-6 py-10 flex flex-col items-center gap-8">
                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <p className="text-gray-500 font-medium">Enter 6-digit OTP sent to</p>
                    <p className="text-[#3B82F6] font-bold text-lg">{phoneNumber}</p>
                </div>

                <div className="flex gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 bg-neutral-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-xl text-center text-xl font-bold outline-none transition-all shadow-sm"
                        />
                    ))}
                </div>

                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <p className="text-sm text-gray-400 font-medium">
                        Resend OTP in <span className="text-gray-600 font-semibold">{formatTime(timer)}</span>
                    </p>
                </div>

                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                    <Button
                        variant="primary"
                        onClick={handleVerify}
                        disabled={otp.join('').length !== 6}
                    >
                        Verify & Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VerifyPhone;
