import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import appwrite from '@/lib/appwrite';
import { AlertCircle, Search, Calendar, RefreshCcw, User, ExternalLink, Award, Gamepad2, Brain, BookOpen, Trophy, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ProgressTrendsSection from '@/components/pages/Index/ProgressTrendsSection';
import CompletionDetailsSection from '@/components/pages/Index/CompletionDetailsSection';
import ReportHistorySection from '@/components/pages/Index/ReportHistorySection';

const AlternateViewBody = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [facilitator, setFacilitator] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participantReports, setParticipantReports] = useState([]);
  const [latestReport, setLatestReport] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    progressTrends: true,
    details: true,
    history: true
  });
  const [isLoadingParticipantData, setIsLoadingParticipantData] = useState(false);
  
  const { user, isFacilitatorLoggedIn, fetchUser } = useGlobalContext();
  
  // Check auth and fetch facilitator data
  useEffect(() => {
    if (!user) {
      fetchUser();
    } else if (user && isFacilitatorLoggedIn && !facilitator) {
      fetchFacilitatorData();
    } else if (user && !isFacilitatorLoggedIn) {
      setIsLoading(false);
    }
  }, [user, isFacilitatorLoggedIn, fetchUser]);
  
  const fetchFacilitatorData = async () => {
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
        await fetchAllParticipants(response.documents[0].code);
      } else {
        toast.error('Could not find facilitator details.');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching facilitator data:', error);
      toast.error('Failed to fetch facilitator details');
      setIsLoading(false);
    }
  };
  
  const fetchAllParticipants = async (facilitatorCode) => {
    setIsLoading(true);
    try {
      // First, get all daily reports for this facilitator
      const reportsResponse = await appwrite.database.listDocuments(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.DAILY_REPORTS,
        [
          appwrite.Query.equal('facilitatorCode', facilitatorCode.toUpperCase()),
          appwrite.Query.orderDesc('reportDate'),
          appwrite.Query.limit(1) // Get the most recent report
        ]
      );
      
      if (reportsResponse.documents.length === 0) {
        setIsLoading(false);
        return;
      }
      
      // Get the most recent daily report
      const latestDailyReport = reportsResponse.documents[0];
      
      // Get all participants from the latest daily report
      const participantsResponse = await appwrite.database.listDocuments(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.INDIVIDUAL_REPORTS,
        [
          appwrite.Query.equal('dailyReport', latestDailyReport.$id),
          appwrite.Query.limit(500)
        ]
      );
      
      setParticipants(participantsResponse.documents);
      setFilteredParticipants(participantsResponse.documents);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast.error('Failed to fetch participants data');
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredParticipants(participants);
      return;
    }
    
    const filtered = participants.filter(participant => 
      participant.name?.toLowerCase().includes(term) ||
      participant.email?.toLowerCase().includes(term)
    );
    
    setFilteredParticipants(filtered);
  };
  
  const selectParticipant = async (participant) => {
    setSelectedParticipant(participant);
    setIsLoadingParticipantData(true);
    await fetchParticipantReports(participant.email);
  };
  
  const fetchParticipantReports = async (email) => {
    try {
      const response = await appwrite.database.listDocuments(
        appwrite.DATABASE.ID,
        appwrite.DATABASE.COLLECTIONS.INDIVIDUAL_REPORTS,
        [
          appwrite.Query.equal('email', email),
          appwrite.Query.orderDesc('$createdAt'),
        ]
      );
      
      if (response.total > 0) {
        setParticipantReports(response.documents);
        setLatestReport(response.documents[0]);
      } else {
        setParticipantReports([]);
        setLatestReport(null);
        toast.error('No reports found for this participant.');
      }
    } catch (error) {
      console.error('Error fetching participant reports:', error);
      toast.error('Failed to fetch participant reports');
    }
    setIsLoadingParticipantData(false);
  };
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  // If not authenticated or not a facilitator, show unauthorized message
  if (!user || !isFacilitatorLoggedIn) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {isLoading ? "Checking authorization..." : "Unauthorized Access"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isLoading 
                ? "Please wait while we verify your access." 
                : "You need to be logged in as a facilitator to access this page."}
            </p>
            {!isLoading && (
              <Link 
                href="/login"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Login
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Only render this content if the user is an authenticated facilitator
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Participant Progress Viewer</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          View detailed progress for individual participants.
        </p>
        <Link
          href="/facilitator/participants"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
        >
          Back to Standard View
        </Link>
      </div>
      
      {/* Participant Selection Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 p-6">
        <h3 className="text-lg font-medium mb-4">Select a Participant</h3>
        
        <div className="mb-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto custom-scrollbar">
          {isLoading && !selectedParticipant ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredParticipants.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredParticipants.map((participant) => (
                <div 
                  key={participant.$id} 
                  onClick={() => selectParticipant(participant)}
                  className={`p-2 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between ${
                    selectedParticipant && selectedParticipant.$id === participant.$id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                      : ''
                  }`}
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {participant.name || 'No Name'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {participant.email || 'No Email'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {participant.milestoneEarned && participant.milestoneEarned !== 'None' && (
                      <Trophy className="h-4 w-4 text-amber-500" />
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(participant.reportDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No participants found.
            </div>
          )}
        </div>
      </div>
      
      {/* Participant Detail View - Similar to HomePageBody */}
      {selectedParticipant ? (
        isLoadingParticipantData ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Loading participant data...</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Retrieving reports for {selectedParticipant?.name || selectedParticipant?.email || 'selected participant'}
                </p>
              </div>
            </div>
          </div>
        ) : latestReport ? (
          <>
            {/* User Profile Summary */}
            <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{latestReport.name || "No name found"}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{latestReport.email || "No email found"}</p>
                    {latestReport.skillBoostUrl && (
                      <a
                        href={latestReport.skillBoostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Skill Boost Profile
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Latest Report: {formatDate(latestReport.reportDate)}
                    </span>
                  </div>
                  {latestReport.milestoneEarned && latestReport.milestoneEarned !== 'None' && (
                    <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium text-amber-800 dark:text-amber-300">
                        {latestReport.milestoneEarned}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-green-800 dark:text-green-300">
                      Access Code: {latestReport.accessCodeStatus || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Skill Badges</div>
                  <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                </div>
                <div className="text-xl font-bold text-purple-800 dark:text-white">{latestReport.noOfSkillBadgesCompleted || 0}</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-orange-200 dark:border-orange-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Arcade Games</div>
                  <Gamepad2 className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div className="text-xl font-bold text-orange-800 dark:text-white">{latestReport.noOfArcadeGamesCompleted || 0}</div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-pink-200 dark:border-pink-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-pink-700 dark:text-pink-300">Trivia Games</div>
                  <Brain className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                </div>
                <div className="text-xl font-bold text-pink-800 dark:text-white">{latestReport.noOfTriviaGamesCompleted || 0}</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/40 dark:to-cyan-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-cyan-200 dark:border-cyan-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Lab-Free Courses</div>
                  <BookOpen className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <div className="text-xl font-bold text-cyan-800 dark:text-white">{latestReport.noOfLabFreeCoursesCompleted || 0}</div>
              </div>
            </div>

            {/* Plug in the separated components */}
            <ProgressTrendsSection 
              latestReport={latestReport} 
              allReports={participantReports} 
              expandedSections={expandedSections} 
              toggleSection={toggleSection}
              formatDate={formatDate}
            />

            <CompletionDetailsSection 
              latestReport={latestReport} 
              expandedSections={expandedSections} 
              toggleSection={toggleSection}
            />

            <ReportHistorySection 
              allReports={participantReports}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              formatDate={formatDate}
            />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <p>No reports found for this participant.</p>
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center min-h-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <User className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>Select a participant to view their detailed progress.</p>
          </div>
        </div>
      )}

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AlternateViewBody;