"use client";

import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  Search,
  Calendar,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  Award,
  Gamepad2,
  Brain,
  BookOpen,
  Trophy
} from 'lucide-react';
import Link from 'next/link';
import { mockFacilitator, mockReportDates, participantsByDate } from '@/data/mockParticipantsData';

const ExampleParticipantsBody = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [facilitator, setFacilitator] = useState(null);
  const [reportDates, setReportDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedParticipant, setExpandedParticipant] = useState(null);

  // Simulate data loading with mock data
  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setFacilitator(mockFacilitator);
      setReportDates(mockReportDates);
      setSelectedDate(mockReportDates[0].id);
      // Don't set participants here anymore, as we'll load them based on selectedDate
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Load participants when date changes
  useEffect(() => {
    if (selectedDate) {
      loadParticipantsForDate(selectedDate);
    }
  }, [selectedDate]);

  // Load participants for the selected date
  const loadParticipantsForDate = (dateId) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const dateParticipants = participantsByDate[dateId] || [];
      setParticipants(dateParticipants);
      setFilteredParticipants(dateParticipants);
      setIsLoading(false);
    }, 800);
  };

  // Filter participants when search term changes
  useEffect(() => {
    if (participants.length > 0) {
      filterParticipants();
    }
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // The participants will be loaded by the useEffect that watches selectedDate
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      return new Date(isoString).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }
      );
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const toggleParticipantDetails = (id) => {
    if (expandedParticipant === id) {
      setExpandedParticipant(null);
    } else {
      setExpandedParticipant(id);
    }
  };

  const getSelectedDateFormatted = () => {
    const selectedReport = reportDates.find(report => report.id === selectedDate);
    return selectedReport ? selectedReport.formattedDate : 'Select date';
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Participants</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          View all participants and their progress details.
        </p>
        <Link
          href="/example/alternate-view"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
        >
          <ExternalLink className="h-3 w-3" />
          Alternate View
        </Link>
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

      {/* Control Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Date Selection */}
            <div className="w-full sm:w-auto">
              <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Report Date
              </label>
              <select
                id="reportDate"
                value={selectedDate || ''}
                onChange={handleDateChange}
                className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a date</option>
                {reportDates.map(report => (
                  <option key={report.id} value={report.id}>
                    {report.formattedDate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => selectedDate && loadParticipantsForDate(selectedDate)}
              disabled={isLoading || !selectedDate}
              className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
              aria-label="Refresh participants"
            >
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Participants for {getSelectedDateFormatted()}
          </h3>
        </div>

        <div className="overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading participants...</p>
              </div>
            </div>
          ) : filteredParticipants.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredParticipants.map((participant) => (
                <div key={participant.$id} className="transition-colors duration-150">
                  {/* Participant Summary Row (Always Visible) */}
                  <div
                    className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                    onClick={() => toggleParticipantDetails(participant.$id)}
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{participant.name || 'No Name'}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{participant.email || 'No Email'}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      {/* Progress Indicators */}
                      <div className="hidden md:flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-purple-500 mr-1" />
                          <span>{participant.noOfSkillBadgesCompleted || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Gamepad2 className="h-4 w-4 text-orange-500 mr-1" />
                          <span>{participant.noOfArcadeGamesCompleted || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Brain className="h-4 w-4 text-pink-500 mr-1" />
                          <span>{participant.noOfTriviaGamesCompleted || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-cyan-500 mr-1" />
                          <span>{participant.noOfLabFreeCoursesCompleted || 0}</span>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div>
                        {expandedParticipant === participant.$id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedParticipant === participant.$id && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                          {/* Profile Link */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              Google Cloud Skills Boost Profile
                            </h5>
                            {participant.skillBoostUrl ? (
                              <a
                                href={participant.skillBoostUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                              >
                                View Profile <ExternalLink size={14} className="ml-1" />
                              </a>
                            ) : (
                              <span className="text-sm text-gray-500 dark:text-gray-400">Not provided</span>
                            )}
                          </div>

                          {/* Status Information */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Access Code Status</h5>
                              <span className={`text-sm px-2 py-1 rounded-full ${participant.accessCodeStatus === 'Yes'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                {participant.accessCodeStatus || 'Unknown'}
                              </span>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Trophy className="h-4 w-4 inline mr-1 text-amber-500" />
                                Milestone Earned
                              </h5>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {participant.milestoneEarned === 'None' ? 'None' : participant.milestoneEarned || 'None'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {/* Skill Badges */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <Award className="h-4 w-4 mr-1 text-purple-500" />
                              Skill Badges Completed ({participant.noOfSkillBadgesCompleted || 0})
                            </h5>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {participant.skillBadgesCompleted?.length > 0 ? (
                                <ul className="list-disc pl-5">
                                  {participant.skillBadgesCompleted.map((badge, index) => (
                                    <li key={index}>{badge}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span>No skill badges completed</span>
                              )}
                            </div>
                          </div>

                          {/* Arcade Games */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <Gamepad2 className="h-4 w-4 mr-1 text-orange-500" />
                              Arcade Games Completed ({participant.noOfArcadeGamesCompleted || 0})
                            </h5>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {participant.arcadeGamesCompleted?.length > 0 ? (
                                <ul className="list-disc pl-5">
                                  {participant.arcadeGamesCompleted.map((game, index) => (
                                    <li key={index}>{game}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span>No arcade games completed</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Additional Rows (Full Width) */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Trivia Games */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <Brain className="h-4 w-4 mr-1 text-pink-500" />
                              Trivia Games Completed ({participant.noOfTriviaGamesCompleted || 0})
                            </h5>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {participant.triviaGamesCompleted?.length > 0 ? (
                                <ul className="list-disc pl-5">
                                  {participant.triviaGamesCompleted.map((game, index) => (
                                    <li key={index}>{game}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span>No trivia games completed</span>
                              )}
                            </div>
                          </div>

                          {/* Lab-free Courses */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-cyan-500" />
                              Lab-Free Courses Completed ({participant.noOfLabFreeCoursesCompleted || 0})
                            </h5>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {participant.labFreeCoursesCompleted?.length > 0 ? (
                                <ul className="list-disc pl-5">
                                  {participant.labFreeCoursesCompleted.map((course, index) => (
                                    <li key={index}>{course}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span>No lab-free courses completed</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {selectedDate ? 'No participants found.' : 'Please select a report date.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer with count */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredParticipants.length > 0
              ? `Showing ${filteredParticipants.length} of ${participants.length} participants`
              : '\u00A0' /* Non-breaking space to maintain height */
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExampleParticipantsBody;