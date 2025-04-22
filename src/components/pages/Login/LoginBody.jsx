"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import appwrite from '@/lib/appwrite';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import Link from 'next/link';
import { Github } from 'lucide-react';

const LoginBody = () => {
    const router = useRouter();
    const { user } = useGlobalContext();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null);
    const [securityPhrase, setSecurityPhrase] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Placeholder - Replace with actual report date fetching logic
    const reportDate = new Date().toLocaleDateString();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
        setIsClient(true);
    }, []);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('Sending OTP...');
        setSecurityPhrase('');
        try {
            const tokenResponse = await appwrite.account.createEmailToken(
                appwrite.ID.unique(),
                email,
                true
            );
            setUserId(tokenResponse.userId);
            setSecurityPhrase(tokenResponse.phrase);
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
            try {
                await appwrite.account.deleteSession('current');
            } catch (deleteError) {
                console.warn('Could not delete existing session:', deleteError.message);
            }

            const session = await appwrite.account.createSession(
                userId,
                otp
            );
            toast.success('OTP verified successfully!');
            console.log('Appwrite Session:', session);
            setMessage('Login successful!');
            router.push("/");
        } catch (error) {
            console.error('Appwrite Verify OTP Error:', error);
            if (error.code === 401) {
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
        setSecurityPhrase('');
        setIsLoading(true);
        setMessage('Resending OTP...');
        try {
            const tokenResponse = await appwrite.account.createEmailToken(
                appwrite.ID.unique(),
                email,
                true
            );
            setUserId(tokenResponse.userId);
            setSecurityPhrase(tokenResponse.phrase);
            setMessage(`OTP resent to ${email}. Please check your inbox and verify the security phrase.`);
        } catch (error) {
            console.error('Appwrite Resend OTP Error:', error);
            setMessage(error.message || 'Failed to resend OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col py-8 bg-gray-50 dark:bg-gray-950">
            {/* Main Content */}
            <main className="flex items-center justify-center p-4">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Check Your Arcade Facilitator Progress
                        </h1>
                        <hr className="w-24 h-1 mx-auto my-2 bg-primary border-0 rounded" />
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Enter the email address you used in the arcade program:
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1"
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'SEND VERIFICATION CODE'}
                            </Button>
                            {message && <p className="text-sm text-center text-red-500 dark:text-red-400 mt-2">{message}</p>}
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                A verification code has been sent to <span className="font-medium">{email}</span>.
                            </p>
                            {/* Display Security Phrase */}
                            {securityPhrase && (
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-md text-center">
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Security Phrase:</p>
                                    <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">{securityPhrase}</p>
                                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                                        Ensure this phrase matches the one in the email you received before entering the code.
                                    </p>
                                </div>
                            )}
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                Please enter the verification code below (expires in 5 minutes):
                            </p>
                            <div>
                                <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">Verification Code:</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d{6}"
                                    placeholder="Enter 6-digit code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={6}
                                    className="mt-1"
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'VERIFY CODE'}
                            </Button>
                            <div className="text-center">
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={handleResendOtp}
                                    disabled={isLoading}
                                    className="text-sm p-0 h-auto"
                                >
                                    {isLoading ? 'Resending...' : "Didn't receive code? Resend code"}
                                </Button>
                            </div>
                            {message && <p className="text-sm text-center text-red-500 dark:text-red-400 mt-2">{message}</p>}
                        </form>
                    )}

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        This is not an Official Website of the Arcade Program. All the data in this website is provided by your facilitator.
                    </p>
                </div>
            </main>

           
        </div>
    );
}

export default LoginBody;