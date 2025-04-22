import React, { useState, useEffect } from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';
import { Calendar, Upload, FileText, X, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import { useRouter } from 'next/router';
import appwrite from '@/lib/appwrite';
import DataTable from './DataTable';
import Statistics from './Statistics';

const UploadReportBody = () => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [facilitator, setFacilitator] = useState(null);
  const [isDataPreviewExpanded, setIsDataPreviewExpanded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [completedRecords, setCompletedRecords] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorRecords, setErrorRecords] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);

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
    setError(null);
    setErrorDetails(null);
    setUploadProgress(0);
    setCompletedRecords(0);
    setTotalRecords(uploadedData.length);
    setErrorRecords([]);
    setUploadStats(null);

    try {
      let dailyReportRecord = await createNewDailyReport();
      if (!dailyReportRecord) {
        setIsUploading(false);
        return;
      }
      const uploadResults = await uploadAllIndividualReports(dailyReportRecord);
      if (!uploadResults) {
        setIsUploading(false);
        return;
      }

      const statistics = { ...uploadResults };
      const updateResult = await updateDailyReportStatistics(dailyReportRecord['$id'], statistics);

      if (!updateResult) {
        setIsUploading(false);
        toast.error('Failed to update daily report with statistics.');
        return;
      }

      setUploadStats(statistics);
      setErrorRecords(uploadResults.errorRecords || []);
      setError(null);
      setSelectedDate('');
      setUploadedData(null);
      setUploadProgress(0);
      setCompletedRecords(0);
      setTotalRecords(0);
      setErrorRecords([]);
      setIsDataPreviewExpanded(false);
      setUploadStats(statistics);

      toast.success(`Upload complete! ${completedRecords} records uploaded successfully.`);

    } catch (err) {
      console.error('Error in upload process:', err);
      setError('An unexpected error occurred during the upload process.');
      setErrorDetails(err.message || 'Unknown error');
    } finally {
      setIsUploading(false);
    }
  };

  async function createNewDailyReport() {
    const date = new Date(selectedDate).toISOString();
    const facilitatorCode = String(facilitator?.code || '').toUpperCase().trim();

    if (!facilitator) {
      setError('Facilitator information is missing.');
      return null;
    }

    if (!facilitatorCode) {
      setError('Facilitator code is required.');
      return null;
    }

    try {
      const response = await appwrite.database.createDocument(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.DAILY_REPORTS,
        appwrite.ID.unique(),
        {
          reportDate: date,
          facilitatorCode: facilitatorCode,
          totalParticipants: 0,
          skillBadgesCompleted: 0,
          arcadeGamesCompleted: 0,
          triviaGamesCompleted: 0,
          labFreeCoursesCompleted: 0,
          totalAccessCodeRedeemed: 0,
          totalMilestonesAchived: 0,
          uploadedBy: user['$id'],
        },
        [
          appwrite.Permission.update(appwrite.Role.user(user['$id'])),
          appwrite.Permission.delete(appwrite.Role.user(user['$id'])),
        ]
      );

      console.log('Daily report created:', response);
      toast.success('Daily report created successfully!');

      return response;
    } catch (error) {
      console.error('Error creating daily report:', error);

      if (error.code === 401 || error.message?.includes('not authorized')) {
        setError('Authorization error: You do not have permission to create reports.');
        setErrorDetails('Your current session may have expired or you lack the necessary permissions. Try logging out and back in.');
        toast.error('Authorization error. Please log out and log back in.');
      } else if (error.code === 409 || error.message?.includes('duplicate')) {
        setError('A report for this date already exists.');
        toast.error('A report for this date already exists.');
      } else {
        setError(`Failed to create daily report: ${error.message || 'Unknown error'}`);
        setErrorDetails(JSON.stringify(error, null, 2));
        toast.error('Failed to create daily report. Please try again.');
      }

      return null;
    }
  }

  async function uploadAllIndividualReports(dailyReportRecord) {
    if (!uploadedData) {
      toast.error('No data to upload. Please upload a CSV file first.');
      return null;
    }
    if (uploadedData.length === 0) {
      toast.error('No data to upload. Please upload a CSV file first.');
      return null;
    }

    if (!facilitator) {
      toast.error('Facilitator information is missing.');
      return null;
    }

    const date = new Date(selectedDate).toISOString();
    const facilitatorCode = String(facilitator?.code || '').toUpperCase().trim();

    let totalParticipants = 0, totalAccessCodeRedeemed = 0, totalMilestonesAchived = 0,
      skillBadgesCompleted = 0, arcadeGamesCompleted = 0, triviaGamesCompleted = 0, labFreeCoursesCompleted = 0;

    let errors = [];
    setErrorRecords([]);
    setCompletedRecords(0);

    for (let i = 0; i < uploadedData.length; i++) {
      const row = uploadedData[i];
      const result = await uploadIndividualReport(row, dailyReportRecord['$id'], date, facilitatorCode);

      setCompletedRecords(prev => prev + 1);
      setUploadProgress(Math.floor(((i + 1) / uploadedData.length) * 100));

      if (result) {
        totalParticipants++;
        totalAccessCodeRedeemed += (row['Access Code Redemption Status'] == "Yes" ? 1 : 0);
        totalMilestonesAchived += (row['Milestone Earned'] == "None" ? 0 : 1);
        skillBadgesCompleted += (row['# of Skill Badges Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Skill Badges Completed']);
        arcadeGamesCompleted += (row['# of Arcade Games Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Arcade Games Completed']);
        triviaGamesCompleted += (row['# of Trivia Games Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Trivia Games Completed']);
        labFreeCoursesCompleted += (row['# of Lab-free Courses Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Lab-free Courses Completed']);
      } else {
        errors.push(row);
      }
    }

    if (errors.length > 0) {
      setIsRetrying(true);
      toast.info(`Retrying failed uploads (${errors.length} records)...`);

      const retryErrors = [];
      for (let i = 0; i < errors.length; i++) {
        const row = errors[i];
        const result = await uploadIndividualReport(row, dailyReportRecord['$id'], date, facilitatorCode);

        if (result) {
          totalParticipants++;
          totalAccessCodeRedeemed += (row['Access Code Redemption Status'] == "Yes" ? 1 : 0);
          totalMilestonesAchived += (row['Milestone Earned'] == "None" ? 0 : 1);
          skillBadgesCompleted += (row['# of Skill Badges Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Skill Badges Completed']);
          arcadeGamesCompleted += (row['# of Arcade Games Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Arcade Games Completed']);
          triviaGamesCompleted += (row['# of Trivia Games Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Trivia Games Completed']);
          labFreeCoursesCompleted += (row['# of Lab-free Courses Completed'] ?? "0") == "0" ? 0 : parseInt(row['# of Lab-free Courses Completed']);
        } else {
          retryErrors.push(row);
        }
      }

      setIsRetrying(false);
      setErrorRecords(retryErrors);

      if (retryErrors.length > 0) {
        toast.error(`${retryErrors.length} records failed to upload even after retry.`);
      } else {
        toast.success('All failed records were successfully uploaded on retry!');
      }
    }

    return {
      totalParticipants,
      totalAccessCodeRedeemed,
      totalMilestonesAchived,
      skillBadgesCompleted,
      arcadeGamesCompleted,
      triviaGamesCompleted,
      labFreeCoursesCompleted,
    };
  }

  async function uploadIndividualReport(reportData, dailyReportId, date, facilitatorCode) {
    if (!facilitator) {
      setError('Facilitator information is missing.');
      return null;
    }

    if (!facilitatorCode) {
      setError('Facilitator code is required.');
      return null;
    }

    console.log('Uploading individual report:', reportData);
    console.log('Daily report ID:', dailyReportId);

    let userData = {
      name: reportData['User Name'] ?? "",
      email: reportData['User Email'] ?? "",
      dailyReport: dailyReportId,
      skillBoostUrl: reportData['Google Cloud Skills Boost Profile URL'] ?? "",
      profileUrlStatus: reportData['Profile URL Status'] == "All Good" ? "true" : reportData['Profile URL Status'],
      accessCodeStatus: reportData['Access Code Redemption Status'],
      milestoneEarned: reportData['Milestone Earned'],
      noOfSkillBadgesCompleted: (reportData['# of Skill Badges Completed'] ?? "0") == "0" ? 0 : parseInt(reportData['# of Skill Badges Completed']),
      skillBadgesCompleted: String(reportData['Names of Completed Skill Badges'] ?? "").split('|').map(item => item.trim()).filter(item => item !== ""),
      noOfArcadeGamesCompleted: (reportData['# of Arcade Games Completed'] ?? "0") == "0" ? 0 : parseInt(reportData['# of Arcade Games Completed']),
      arcadeGamesCompleted: String(reportData['Names of Completed Arcade Games'] ?? "").split('|').map(item => item.trim()).filter(item => item !== ""),
      noOfTriviaGamesCompleted: (reportData['# of Trivia Games Completed'] ?? "0") == "0" ? 0 : parseInt(reportData['# of Trivia Games Completed']),
      triviaGamesCompleted: String(reportData['Names of Completed Trivia Games'] ?? "").split('|').map(item => item.trim()).filter(item => item !== ""),
      noOfLabFreeCoursesCompleted: (reportData['# of Lab-free Courses Completed'] ?? "0") == "0" ? 0 : parseInt(reportData['# of Lab-free Courses Completed']),
      labFreeCoursesCompleted: String(reportData['Names of Completed Lab-free Courses'] ?? "").split('|').map(item => item.trim()).filter(item => item !== ""),
      uploadedBy: user['$id'],
      reportDate: date
    }

    try {
      const response = await appwrite.database.createDocument(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.INDIVIDUAL_REPORTS,
        appwrite.ID.unique(),
        {
          ...userData,
        },
        [
          appwrite.Permission.update(appwrite.Role.user(user['$id'])),
          appwrite.Permission.delete(appwrite.Role.user(user['$id'])),
        ]
      );

      console.log('Individual report created:', response);
      // toast.success('Individual report created successfully!');

      return response;
    } catch (error) {
      console.error('Error creating individual report:', error);
      setError('Failed to create individual report.');
      setErrorDetails(error.message || 'Unknown error');
    }
    return null;
  }

  async function updateDailyReportStatistics(dailyReportId, statistics) {
    try {
      const response = await appwrite.database.updateDocument(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.DAILY_REPORTS,
        dailyReportId,
        {
          ...statistics,
        }
      );

      console.log('Daily report updated:', response);
      toast.success('Daily report updated with statistics successfully!');

      return response;
    } catch (error) {
      console.error('Error updating daily report:', error);
      setError('Failed to update daily report.');
      setErrorDetails(error.message || 'Unknown error');
      return false;
    }
  }

  const ProgressBar = ({ progress, completed, total, isRetrying }) => (
    <div className="mt-6 mb-4">
      <div className="flex justify-between items-center mb-1 text-sm text-gray-700 dark:text-gray-300">
        <span>{isRetrying ? 'Retrying failed uploads...' : 'Uploading reports...'}</span>
        <span>{completed} of {total} ({Math.round(progress)}%)</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  function toggleDataPreview() {
    setIsDataPreviewExpanded(prev => !prev);
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
              <ProgressBar
                progress={uploadProgress}
                completed={completedRecords}
                total={totalRecords}
                isRetrying={isRetrying}
              />
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

        {/* statistics display  component */}
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

export default UploadReportBody;