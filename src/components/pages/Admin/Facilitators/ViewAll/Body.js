import React, { useState, useEffect } from 'react';
import { RefreshCcw, Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import appwrite from '@/lib/appwrite';
import Link from 'next/link';

const ViewAllFacilitatorsBody = () => {
    const [facilitators, setFacilitators] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchFacilitators() {
        setIsLoading(true);
        // Mock API call with setTimeout
        try {
            const respoinse = await appwrite.database.listDocuments(
                appwrite.DATABASE.ID,
                appwrite.DATABASE.COLLECTIONS.FACILITATORS,
                [
                    appwrite.Query.select(["name", "email", "code", "description", "status"]),
                    appwrite.Query.equal("status", "active"),
                    appwrite.Query.orderAsc("$createdAt"),
                ]
            )

            console.log("response facilitators", respoinse);

            if (respoinse.documents.length > 0) {
                const facilitatorsData = respoinse.documents.map(facilitator => ({
                    id: facilitator.$id,
                    name: facilitator.name,
                    email: facilitator.email,
                    code: facilitator.code,
                    createdBy: facilitator.createdBy,
                    description: facilitator.description || '-',
                    status: facilitator.status,
                }));

                setFacilitators(facilitatorsData);
            } else {
                setFacilitators([]);
            }

        } catch (error) {
            toast.error('Error fetching facilitators');
            console.log("error fetching facilitators");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFacilitators();
    }, []);

    const refreshData = () => {
        fetchFacilitators();
        toast.success('Facilitator data refreshed!');
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-500/20 text-green-500 border border-green-500/50';
            case 'inactive':
                return 'bg-red-500/20 text-red-500 border border-red-500/50';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50';
            default:
                return 'bg-gray-500/20 text-gray-500 border border-gray-500/50';
        }
    };

    const filteredFacilitators = facilitators.filter(facilitator =>
        facilitator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facilitator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facilitator.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full p-4 sm:p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-semibold dark:text-white">All Facilitators</h2>
                    <Link href="/admin/facilitators/new">
                        <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            <span>Create New</span>
                        </button>
                    </Link>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search facilitators..."
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={refreshData}
                        disabled={isLoading}
                        className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                    >
                        <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="py-20 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading facilitators...</p>
                            </div>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>

                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>

                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredFacilitators.length > 0 ? (
                                    filteredFacilitators.map((facilitator) => (
                                        <tr key={facilitator.$id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{facilitator.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{facilitator.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{facilitator.code}</td>

                                            {/* Description */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{facilitator.description}</td>

                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(facilitator.status)}`}>
                                                    {facilitator.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No facilitators found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {!isLoading && filteredFacilitators.length > 0 ? (
                    <p>Showing {filteredFacilitators.length} facilitator{filteredFacilitators.length !== 1 ? 's' : ''}</p>
                ) : null}
            </div>
        </div>
    );
};

export default ViewAllFacilitatorsBody;