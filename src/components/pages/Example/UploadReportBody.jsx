import React, { useState, useEffect } from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';
import { Calendar, Upload, FileText, X, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '@/components/pages/Facilitator/Reports/Upload/DataTable';
import Statistics from '@/components/pages/Facilitator/Reports/Upload/Statistics';

// Add delay helper function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const ExampleUploadReportBody = () => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isDataPreviewExpanded, setIsDataPreviewExpanded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [completedRecords, setCompletedRecords] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorRecords, setErrorRecords] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);

  // Fake facilitator details
  const facilitator = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    code: "FAC12345",
    $id: "example-facilitator-id"
  };

  // Add useEffect for beforeunload event to prevent accidental navigation during upload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isUploading) {
        // Standard way to show the dialog in most browsers
        e.preventDefault();
        // Custom message (note: most modern browsers show their own generic message)
        e.returnValue = 'Report upload in progress. Are you sure you want to leave? Your upload will be lost.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isUploading]);

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setError(null);
    setErrorDetails(null);
    setUploadProgress(0);
    setCompletedRecords(0);
    setTotalRecords(uploadedData.length);
    setErrorRecords([]);
    setUploadStats(null);

    // Simulate upload process with progress
    for (let i = 0; i < uploadedData.length; i++) {
      // Simulate processing time for each record
      await delay(50);
      setCompletedRecords(prev => prev + 1);
      setUploadProgress(Math.floor(((i + 1) / uploadedData.length) * 100));
    }

    // Simulate some random failures (about 3% of records)
    const randomFailures = uploadedData
      .filter(() => Math.random() < 0.03)
      .slice(0, Math.floor(Math.random() * 3)); // 0-2 failures
      
    setErrorRecords(randomFailures);
    
    // Simulate statistics calculations
    const statistics = {
      totalParticipants: uploadedData.length - randomFailures.length,
      skillBadgesCompleted: Math.floor(Math.random() * 50) + 10,
      arcadeGamesCompleted: Math.floor(Math.random() * 30) + 5,
      triviaGamesCompleted: Math.floor(Math.random() * 40) + 8,
      labFreeCoursesCompleted: Math.floor(Math.random() * 20) + 3,
      totalAccessCodeRedeemed: Math.floor(Math.random() * uploadedData.length) + 5,
      totalMilestonesAchived: Math.floor(Math.random() * 15) + 2,
      errorRecords: randomFailures
    };
    
    await delay(1000); // Final delay before completing
    setUploadStats(statistics);
    
    toast.success(`Upload complete! ${statistics.totalParticipants} records uploaded successfully.`);
    setIsUploading(false);
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

    await simulateUpload();
  };

  function toggleDataPreview() {
    setIsDataPreviewExpanded(prev => !prev);
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Upload Progress Report</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Upload a CSV file containing your participants' progress data.
        </p>
      </div>

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
                className={`w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${isUploading ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                required
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Report File (.csv) <span className="text-red-500">*</span>
              </label>

              <CSVReader
                onUploadAccepted={(results) => {
                  if (!isUploading) {
                    setUploadedData(results.data);
                    setZoneHover(false);
                    toast.success('CSV file processed successfully');
                  }
                }}
                onDragOver={(event) => {
                  if (!isUploading) {
                    event.preventDefault();
                    setZoneHover(true);
                  }
                }}
                onDragLeave={(event) => {
                  if (!isUploading) {
                    event.preventDefault();
                    setZoneHover(false);
                  }
                }}
                config={{
                  header: true,
                  skipEmptyLines: true
                }}
                disabled={isUploading}
              >
                {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps
                }) => (
                  <div
                    {...(!isUploading ? getRootProps() : {})}
                    className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${isUploading
                        ? 'border-gray-300 dark:border-gray-600 opacity-60 cursor-not-allowed'
                        : zoneHover
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
                            {...(!isUploading ? getRemoveFileProps() : {})}
                            disabled={isUploading}
                            className={`p-1 rounded-full ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                              } transition-colors duration-200`}
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
                        <Upload className={`mx-auto h-8 w-8 ${isUploading ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400'}`} />
                        <p className={`mt-2 text-sm ${isUploading ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                          {isUploading ? 'Upload in progress...' : 'Drop CSV file here or click to upload'}
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
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                      {errorDetails && (
                        <details className="mt-2">
                          <summary className="text-xs text-red-600 dark:text-red-400 cursor-pointer">
                            Show technical details
                          </summary>
                          <p className="mt-1 text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-auto max-h-24">
                            {errorDetails}
                          </p>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="mt-6 mb-4">
                <div className="flex justify-between items-center mb-1 text-sm text-gray-700 dark:text-gray-300">
                  <span>{isRetrying ? 'Retrying failed uploads...' : 'Uploading reports...'}</span>
                  <span>{completedRecords} of {totalRecords} ({Math.round(uploadProgress)}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

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

        {/* statistics display component */}
        {uploadStats && !isUploading && (
          <Statistics statistics={uploadStats} errorRecords={errorRecords} />
        )}

        {uploadedData && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDataPreview}
              className="flex items-center justify-between w-full p-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Data Preview</span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({uploadedData.length} rows)</span>
              </div>
              {isDataPreviewExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {isDataPreviewExpanded && (
              <div className="mt-2">
                <DataTable data={uploadedData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExampleUploadReportBody;