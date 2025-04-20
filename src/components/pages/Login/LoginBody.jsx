"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react'; // Import useEffect
import appwrite from '@/lib/appwrite'; // Import Appwrite config
import { toast } from 'react-hot-toast'; // Import toast if needed later

const LoginBody = () => {
    const [step, setStep] = useState(1); // 1 for email, 2 for OTP
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null); // Add state for userId
    const [securityPhrase, setSecurityPhrase] = useState(''); // Add state for security phrase
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false); // State to track client-side mount

    useEffect(() => {
        // This effect runs only on the client after the component mounts
        setIsClient(true);
    }, []);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('Sending OTP...');
        setSecurityPhrase(''); // Reset phrase on new request
        try {
            // Use Appwrite to create an email token (OTP) with security phrase enabled
            const tokenResponse = await appwrite.account.createEmailToken(
                appwrite.ID.unique(),
                email,
                true // Enable security phrase
            );
            setUserId(tokenResponse.userId);
            setSecurityPhrase(tokenResponse.phrase); // Store the security phrase
            setMessage(`OTP sent to ${email}. Please check your inbox and verify the security phrase.`);
            setStep(2);
        } catch (error) {
            console.error('Appwrite Send OTP Error:', error);
            setMessage(error.message || 'Failed to send OTP. Please check the email or try again.');
            setStep(1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!userId) {
            setMessage('User ID not found. Please request OTP again.');
            setStep(1);
            return;
        }
        setIsLoading(true);
        setMessage('Verifying OTP...');
        try {
            // Attempt to delete any existing session first
            try {
                await appwrite.account.deleteSession('current');
            } catch (deleteError) {
                // Ignore error if no session exists or other deletion issues
                console.warn('Could not delete existing session:', deleteError.message);
            }

            // Use Appwrite to create a session using the userId and OTP (secret)
            const session = await appwrite.account.createSession(
                userId,
                otp // The OTP entered by the user acts as the secret
            );
            toast.success('OTP verified successfully!');
            console.log('Appwrite Session:', session); // Log session details
            setMessage('Login successful!');
            // Handle successful login (e.g., redirect, update auth context)
            toast.success('Login Successful!');
            // Example: Redirect after a short delay
            // setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
        } catch (error) {
            console.error('Appwrite Verify OTP Error:', error);
            // Provide more specific error messages based on Appwrite error codes
            if (error.code === 401) { // Example: Unauthorized / Invalid credentials
                 setMessage('Invalid or expired OTP. Please try again.');
            } else {
                 setMessage(error.message || 'Failed to verify OTP. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setMessage('');
        setOtp('');
        setSecurityPhrase(''); // Reset phrase on resend request
        setIsLoading(true);
        setMessage('Resending OTP...');
        try {
            const tokenResponse = await appwrite.account.createEmailToken(
                appwrite.ID.unique(),
                email,
                true // Enable security phrase
            );
            setUserId(tokenResponse.userId);
            setSecurityPhrase(tokenResponse.phrase); // Store the new security phrase
            setMessage(`OTP resent to ${email}. Please check your inbox and verify the security phrase.`);
        } catch (error) {
            console.error('Appwrite Resend OTP Error:', error);
            setMessage(error.message || 'Failed to resend OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Arcade Progress Checker</h1>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">Admin Login</h2>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            Enter your registered Facilitator email address to receive a one-time password (OTP):
                        </p>
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Facilitator Email:</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1"
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'SEND OTP'}
                        </Button>
                        {message && <p className="text-sm text-center text-red-500 dark:text-red-400 mt-2">{message}</p>}
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">Verify Your Login</h2>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            An OTP has been sent to <span className="font-medium">{email}</span>.
                        </p>
                        {/* Display Security Phrase */}
                        {securityPhrase && (
                             <div className="p-3 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-md text-center">
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Security Phrase:</p>
                                <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">{securityPhrase}</p>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                                    Ensure this phrase matches the one in the email you received before entering the OTP.
                                </p>
                            </div>
                        )}
                         <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            Please enter the OTP below (expires in 5 minutes):
                        </p>
                        <div>
                            <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">One-Time Password (OTP):</Label>
                            <Input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                pattern="\d{6}"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                className="mt-1"
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'VERIFY OTP'}
                        </Button>
                        <div className="text-center">
                             <Button
                                type="button"
                                variant="link"
                                onClick={handleResendOtp}
                                disabled={isLoading}
                                className="text-sm p-0 h-auto"
                            >
                                {isLoading ? 'Resending...' : "Didn't receive OTP? Resend OTP"}
                            </Button>
                        </div>
                        {message && <p className="text-sm text-center text-red-500 dark:text-red-400 mt-2">{message}</p>}
                    </form>
                )}

                <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                    {/* Conditionally render the year only on the client */}
                    © {isClient ? new Date().getFullYear() : ''} Arcade Progress Checker. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default LoginBody;