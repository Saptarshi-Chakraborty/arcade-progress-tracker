import React, { useState, useEffect } from 'react';
import { mockFacilitator, mockReportDates, participantsByDate } from '@/data/mockParticipantsData';
import { AlertCircle, Search, Calendar, RefreshCcw, User, ExternalLink, Award, Gamepad2, Brain, BookOpen, Trophy, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
// Assuming these components can work with the mock data structure
import ProgressTrendsSection from '@/components/pages/Index/ProgressTrendsSection';
import CompletionDetailsSection from '@/components/pages/Index/CompletionDetailsSection';
import ReportHistorySection from '@/components/pages/Index/ReportHistorySection';

const ExampleAlternateViewBody = () => {
  const [isLoading, setIsLoading] = useState(true); // For initial load simulation
  const [facilitator, setFacilitator] = useState(null);
  const [participants, setParticipants] = useState([]); // Participants from the latest date
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null); // Basic info of selected participant
  const [participantReports, setParticipantReports] = useState([]); // All reports for the selected participant
  const [latestReport, setLatestReport] = useState(null); // Latest report for the selected participant
  const [expandedSections, setExpandedSections] = useState({
    progressTrends: true,
    details: true,
    history: true
  });
  const [isLoadingParticipantData, setIsLoadingParticipantData] = useState(false);
  const [reportDates, setReportDates] = useState([]); // Store mock report dates

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setFacilitator(mockFacilitator);
      setReportDates(mockReportDates); // Use mock dates

      // Get participants from the latest date (date1)
      const latestDateId = mockReportDates[0]?.id; // Assuming mockReportDates is sorted latest first
      if (latestDateId && participantsByDate[latestDateId]) {
        const latestParticipants = participantsByDate[latestDateId];
        setParticipants(latestParticipants);
        setFilteredParticipants(latestParticipants);
      } else {
        console.warn("Could not find participants for the latest mock date.");
        setParticipants([]);
        setFilteredParticipants([]);
      }

      setIsLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Filter participants when search term changes
  useEffect(() => {
    filterParticipants();
  }, [searchTerm, participants]);

  const filterParticipants = () => {
    if (!searchTerm.trim()) {
      setFilteredParticipants(participants);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = participants.filter(participant =>
      participant.name?.toLowerCase().includes(term) ||
      participant.email?.toLowerCase().includes(term)
    );

    setFilteredParticipants(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const selectParticipant = (participant) => {
    setSelectedParticipant(participant); // Store the basic info ($id, name, email)
    setIsLoadingParticipantData(true);
    fetchParticipantReportsMock(participant.email); // Fetch mock reports for this participant
  };

  // Simulate fetching all reports for a specific participant from mock data
  const fetchParticipantReportsMock = (email) => {
    // Simulate API delay
    setTimeout(() => {
      const reports = [];
      // Iterate through mock dates (assuming sorted latest first)
      mockReportDates.forEach(reportDate => {
        const dateId = reportDate.id;
        const participantDataForDate = participantsByDate[dateId]?.find(p => p.email === email);
        if (participantDataForDate) {
          // Add the reportDate to the participant data for use in history/trends
          reports.push({ ...participantDataForDate, reportDate: reportDate.date });
        }
      });

      if (reports.length > 0) {
        setParticipantReports(reports); // Reports are already sorted latest first due to mockReportDates order
        setLatestReport(reports[0]);
      } else {
        setParticipantReports([]);
        setLatestReport(null);
        // Optionally show a toast or message, but maybe not needed for example page
        console.warn(`No mock reports found for participant: ${email}`);
      }
      setIsLoadingParticipantData(false);
    }, 800); // Simulate network delay
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
      // Find the corresponding formatted date from mockReportDates if available
      const matchingDate = reportDates.find(d => d.date === isoString);
      if (matchingDate) return matchingDate.formattedDate;

      // Fallback formatting if not found in mockReportDates (shouldn't happen with current setup)
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getLatestReportDateFormatted = () => {
    const latestDateId = reportDates[0]?.id;
    const latestDate = reportDates.find(d => d.id === latestDateId);
    return latestDate ? latestDate.formattedDate : 'Loading...';
  };


  // Initial loading state for the whole page
  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Main content render
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Participant Progress Viewer</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          View detailed progress for individual participants.
        </p>
        <Link
          href="/example/participants"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
        >
          Back to Standard View
        </Link>
      </div>

      {/* Participant Selection Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium dark:text-gray-100">Select a Participant</h3>
          {filteredParticipants.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Report Date: {getLatestReportDateFormatted()}</span>
            </div>
          )}
        </div>

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
          {participants.length === 0 && !isLoading ? ( // Check participants length here
             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
               No participants found for the latest date.
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
                  {participant.milestoneEarned && participant.milestoneEarned !== 'None' && (
                    <Trophy className="h-4 w-4 text-amber-500" />
                  )}
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
               No participants match your search.
             </div>
          )}
        </div>
      </div>

      {/* Participant Detail View */}
      {selectedParticipant ? (
        isLoadingParticipantData ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Loading participant data...</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Retrieving mock reports for {selectedParticipant?.name || selectedParticipant?.email || 'selected participant'}
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
                   {/* Access Code Status from latest report */}
                   <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${latestReport.accessCodeStatus === 'Yes'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                    <span className="text-xs font-medium">
                      Access Code: {latestReport.accessCodeStatus || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Skill Badges Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Skill Badges</div>
                  <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                </div>
                <div className="text-xl font-bold text-purple-800 dark:text-white">{latestReport.noOfSkillBadgesCompleted || 0}</div>
              </div>
              {/* Arcade Games Card */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-orange-200 dark:border-orange-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Arcade Games</div>
                  <Gamepad2 className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div className="text-xl font-bold text-orange-800 dark:text-white">{latestReport.noOfArcadeGamesCompleted || 0}</div>
              </div>
              {/* Trivia Games Card */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-pink-200 dark:border-pink-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-pink-700 dark:text-pink-300">Trivia Games</div>
                  <Brain className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                </div>
                <div className="text-xl font-bold text-pink-800 dark:text-white">{latestReport.noOfTriviaGamesCompleted || 0}</div>
              </div>
              {/* Lab-Free Courses Card */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/40 dark:to-cyan-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-cyan-200 dark:border-cyan-800">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Lab-Free Courses</div>
                  <BookOpen className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <div className="text-xl font-bold text-cyan-800 dark:text-white">{latestReport.noOfLabFreeCoursesCompleted || 0}</div>
              </div>
            </div>

            {/* Plug in the separated components */}
            {/* Ensure these components are adapted or confirmed to work with the mock data structure */}
            <ProgressTrendsSection
              latestReport={latestReport}
              allReports={participantReports} // Pass all fetched reports for the participant
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
              allReports={participantReports} // Pass all fetched reports
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              formatDate={formatDate}
            />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <p className="dark:text-gray-300">No mock reports found for this participant.</p>
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
        /* Dark mode scrollbar */
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ExampleAlternateViewBody;