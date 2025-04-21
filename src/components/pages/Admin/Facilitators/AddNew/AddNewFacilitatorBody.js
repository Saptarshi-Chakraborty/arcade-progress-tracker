import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Hash, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import appwrite from '@/lib/appwrite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/contexts/GlobalProvider';

const AddNewFacilitatorBody = () => {
    const { user, isAdminLoggedIn, fetchUser } = useGlobalContext();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [])



    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        code: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !isAdminLoggedIn) {
            console.log({ user })
            console.log({ isAdminLoggedIn })
            toast.error('You are not authorized to perform this action.');
            return;
        }

        // Basic validation
        if (!formData.name || !formData.email || !formData.code) {
            toast.error('Please fill all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            // Attempt to create new facilitator
            const dbResult = await appwrite.database.createDocument(
                appwrite.DATABASE.ID,
                appwrite.DATABASE.COLLECTIONS.FACILITATORS,
                appwrite.ID.unique(),
                {
                    name: formData.name.trim(),
                    email: formData.email.toLowerCase().trim(),
                    code: formData.code.trim(),
                    description: formData.description.trim() || '',
                    createdBy: user.$id,
                }
            );

            console.log(dbResult);
            toast.success('Facilitator added successfully!');

            resetForm(); // Reset form data

            // Redirect to facilitators page
            router.push('/admin/facilitators');
        } catch (error) {
            console.error('Error creating facilitator:', error);
            toast.error('Failed to add facilitator. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    async function resetForm() {
        setFormData({
            name: '',
            email: '',
            code: '',
            description: ''
        });
    }


    return (
        <div className="w-full p-4 sm:p-6">
            <div className="mb-6">
                <Link href="/admin/facilitators" className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to All Facilitators
                </Link>
                <h2 className="text-2xl font-semibold dark:text-white">Add New Facilitator</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Create a new facilitator account by filling in the details below.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <User className="h-4 w-4" />
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                placeholder="Enter facilitator's full name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        {/* Code Field */}
                        <div className="space-y-2">
                            <label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <Hash className="h-4 w-4" />
                                Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                placeholder="Unique facilitator code"
                                required
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                A unique code for the facilitator (e.g. FAC001)
                            </p>
                        </div>

                        {/* Description Field - Full width */}
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none"
                                placeholder="Enter additional details about the facilitator (optional)"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end space-x-4">
                        <Link href="/admin/facilitators">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Add Facilitator'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewFacilitatorBody;