import React, { useState, useEffect } from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';
import { Calendar, Upload, FileText, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import { useRouter } from 'next/router';
import appwrite from '@/lib/appwrite';
import DataTable from './DataTable';

const UploadReportBody = () => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);
  const [error, setError] = useState(null);
  const [facilitator, setFacilitator] = useState(null);

  const router = useRouter();
  const { user, isFacilitatorLoggedIn, fetchUser } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else if (!isFacilitatorLoggedIn) {
      toast.error('Only facilitators can access this page');
    }

    if (user && isFacilitatorLoggedIn && !facilitator) {
      fetchFacilitatorData();
    }
  }, [user, isFacilitatorLoggedIn, fetchUser, router]);

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
  };

  async function fetchFacilitatorData() {
    try {
      const response = await appwrite.database.listDocuments(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.FACILITATORS,
        [
          appwrite.Query.equal('email', user.email),
          appwrite.Query.equal('status', 'active'),
          appwrite.Query.limit(1),
        ]
      );

      if (response.documents.length > 0) {
        setFacilitator(response.documents[0]);
      } else {
        toast.error('You are not authorized to access this page. Please contact support.');
      }
    } catch (error) {
      console.error('Error fetching facilitator data:', error);
      toast.error('Failed to fetch facilitator details. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('Please select a date for this report');
      return;
    }

    if (!uploadedData) {
      toast.error('Please upload a CSV file');
      return;
    }

    setIsUploading(true);

    try {
      console.log('Report data:', {
        date: selectedDate,
        data: uploadedData,
        facilitatorId: user?.$id
      });

      toast.success('Report uploaded successfully!');
      setUploadedData(null);
      setSelectedDate('');
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error('Failed to upload report. Please try again.');
      setError('Failed to upload report');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user || !isFacilitatorLoggedIn || !facilitator) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Checking authorization...</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Please wait while we verify your access.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Upload Progress Report</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Upload a CSV file containing your students' progress data.
        </p>
      </div>

      {facilitator && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facilitator Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Name</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{facilitator.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Email</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{facilitator.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Facilitator Code</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{facilitator.code}</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="reportDate" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Report Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="reportDate"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <FileText className="h-4 w-4" />
                CSV File <span className="text-red-500">*</span>
              </label>

              <CSVReader
                onUploadAccepted={(results) => {
                  setUploadedData(results.data);
                  setZoneHover(false);
                  toast.success('CSV file processed successfully');
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setZoneHover(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setZoneHover(false);
                }}
                config={{
                  header: true,
                  skipEmptyLines: true
                }}
              >
                {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps,
                }) => (
                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${zoneHover
                      ? 'border-gray-600 dark:border-gray-400 bg-gray-50 dark:bg-gray-700/50'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                  >
                    {acceptedFile ? (
                      <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg w-full">
                        <div className="flex-1 overflow-hidden">
                          <div className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded mb-1 inline-block">
                            {formatFileSize(acceptedFile.size)}
                          </div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                            {acceptedFile.name}
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            {...getRemoveFileProps()}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-0 w-full px-4">
                          <ProgressBar />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Drop CSV file here or click to upload
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          Only .csv files are accepted
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CSVReader>

              {error && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> {error}
                </p>
              )}
            </div>

            {uploadedData && <DataTable data={uploadedData} />}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isUploading || !uploadedData || !selectedDate}
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReportBody;