import { Award, BookOpen, Brain, Eye, FileText, Gamepad2, RefreshCcw, Search, Trash2, Upload, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Importing the example components (assuming they exist or would be created similarly)
import ChartVisualizations from '../Facilitator/Reports/ViewAll/ChartVisualizations';
import FacilitatorMilestones from '../Facilitator/Reports/ViewAll/FacilitatorMilestones';
import { mockFacilitator } from '@/data/mockParticipantsData';

const ExampleViewAllReportsBody = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [facilitator, setFacilitator] = useState(null);
  const [stats, setStats] = useState({
      totalParticipants: 0,
      skillBadgesCompleted: 0,
      arcadeGamesCompleted: 0,
      triviaGamesCompleted: 0,
      labFreeCoursesCompleted: 0,
      totalReports: 0
  });

  useEffect(() => {
      // Simulate loading data
      fetchSampleData();
  }, []);

  const fetchSampleData = async () => {
      // Simulate API delay
      setTimeout(() => {
          
          const mockReports = [
              {
                  $id: '1',
                  reportDate: '2025-04-23T00:00:00.000Z',
                  totalParticipants: 85,
                  skillBadgesCompleted: 1050,
                  arcadeGamesCompleted: 420,
                  triviaGamesCompleted: 450,
                  labFreeCoursesCompleted: 220,
                  totalAccessCodeRedeemed: 85,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '2',
                  reportDate: '2025-04-22T00:00:00.000Z',
                  totalParticipants: 82,
                  skillBadgesCompleted: 980,
                  arcadeGamesCompleted: 395,
                  triviaGamesCompleted: 425,
                  labFreeCoursesCompleted: 210,
                  totalAccessCodeRedeemed: 82,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '3',
                  reportDate: '2025-04-21T00:00:00.000Z',
                  totalParticipants: 79,
                  skillBadgesCompleted: 920,
                  arcadeGamesCompleted: 370,
                  triviaGamesCompleted: 410,
                  labFreeCoursesCompleted: 200,
                  totalAccessCodeRedeemed: 79,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '4',
                  reportDate: '2025-04-20T00:00:00.000Z',
                  totalParticipants: 77,
                  skillBadgesCompleted: 850,
                  arcadeGamesCompleted: 340,
                  triviaGamesCompleted: 395,
                  labFreeCoursesCompleted: 190,
                  totalAccessCodeRedeemed: 77,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '5',
                  reportDate: '2025-04-19T00:00:00.000Z',
                  totalParticipants: 73,
                  skillBadgesCompleted: 780,
                  arcadeGamesCompleted: 310,
                  triviaGamesCompleted: 370,
                  labFreeCoursesCompleted: 180,
                  totalAccessCodeRedeemed: 73,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '6',
                  reportDate: '2025-04-18T00:00:00.000Z',
                  totalParticipants: 68,
                  skillBadgesCompleted: 710,
                  arcadeGamesCompleted: 285,
                  triviaGamesCompleted: 345,
                  labFreeCoursesCompleted: 165,
                  totalAccessCodeRedeemed: 68,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '7',
                  reportDate: '2025-04-17T00:00:00.000Z',
                  totalParticipants: 65,
                  skillBadgesCompleted: 650,
                  arcadeGamesCompleted: 260,
                  triviaGamesCompleted: 320,
                  labFreeCoursesCompleted: 150,
                  totalAccessCodeRedeemed: 65,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '8',
                  reportDate: '2025-04-16T00:00:00.000Z',
                  totalParticipants: 62,
                  skillBadgesCompleted: 590,
                  arcadeGamesCompleted: 235,
                  triviaGamesCompleted: 290,
                  labFreeCoursesCompleted: 140,
                  totalAccessCodeRedeemed: 62,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '9',
                  reportDate: '2025-04-15T00:00:00.000Z',
                  totalParticipants: 58,
                  skillBadgesCompleted: 520,
                  arcadeGamesCompleted: 210,
                  triviaGamesCompleted: 270,
                  labFreeCoursesCompleted: 130,
                  totalAccessCodeRedeemed: 58,
                  facilitatorCode: 'FACIL123'
              },
              {
                  $id: '10',
                  reportDate: '2025-04-14T00:00:00.000Z',
                  totalParticipants: 55,
                  skillBadgesCompleted: 470,
                  arcadeGamesCompleted: 190,
                  triviaGamesCompleted: 250,
                  labFreeCoursesCompleted: 120,
                  totalAccessCodeRedeemed: 55,
                  facilitatorCode: 'FACIL123'
              }
          ];
          
          const latestReport = mockReports[0];
          const mockStats = {
              totalParticipants: latestReport.totalParticipants || 0,
              skillBadgesCompleted: latestReport.skillBadgesCompleted || 0,
              arcadeGamesCompleted: latestReport.arcadeGamesCompleted || 0,
              triviaGamesCompleted: latestReport.triviaGamesCompleted || 0,
              labFreeCoursesCompleted: latestReport.labFreeCoursesCompleted || 0,
              totalReports: mockReports.length
          };
          
          setFacilitator(mockFacilitator);
          setReports(mockReports);
          setStats(mockStats);
          setIsLoading(false);
      }, 1500); // 1.5 second delay to simulate loading
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

  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
  };

  const renderDelta = (currentValue, index, reports, fieldName) => {
      if (index === reports.length - 1 || reports.length <= 1) return null;

      const nextValue = reports[index + 1][fieldName] || 0;
      const currentVal = currentValue || 0;
      const delta = currentVal - nextValue;

      if (delta === 0) {
          return <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(+0)</span>;
      } else if (delta > 0) {
          return <span className="ml-1 text-xs text-green-600 dark:text-green-400">(+{delta})</span>;
      } else {
          return <span className="ml-1 text-xs text-red-600 dark:text-red-400">({delta})</span>;
      }
  };

  const filteredReports = reports.filter(report =>
      report.facilitatorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(report.reportDate).toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleDeleteReport(reportId) {
      toast.success('This is a demo action - report deletion would happen in the actual app');
  }

  return (
      <div className="w-full p-4 sm:p-6">
          <div className="mb-6">
              <h2 className="text-2xl font-semibold dark:text-white">Progress Reports</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  View all your uploaded progress reports and statistics.
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

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Overall Statistics
              </h3>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200 dark:border-blue-800">
                      <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Reports</div>
                          <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="text-xl font-bold text-blue-800 dark:text-white">{stats.totalReports}</div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-200 dark:border-indigo-800">
                      <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Students</div>
                          <Users className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                      </div>
                      <div className="text-xl font-bold text-indigo-800 dark:text-white">{stats.totalParticipants}</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-purple-200 dark:border-purple-800">
                      <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Skill Badges</div>
                          <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                      </div>
                      <div className="text-xl font-bold text-purple-800 dark:text-white">{stats.skillBadgesCompleted}</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-orange-200 dark:border-orange-800">
                      <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Arcade Games</div>
                          <Gamepad2 className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                      </div>
                      <div className="text-xl font-bold text-orange-800 dark:text-white">{stats.arcadeGamesCompleted}</div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-pink-200 dark:border-pink-800">
                      <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-pink-700 dark:text-pink-300">Trivia Games</div>
                          <Brain className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                      </div>
                      <div className="text-xl font-bold text-pink-800 dark:text-white">{stats.triviaGamesCompleted}</div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/40 dark:to-cyan-800/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-cyan-200 dark:border-cyan-800">
                      <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Lab-Free Courses</div>
                          <BookOpen className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                      </div>
                      <div className="text-xl font-bold text-cyan-800 dark:text-white">{stats.labFreeCoursesCompleted}</div>
                  </div>
              </div>
          </div>

          {/* Using placeholder components - you would need to create these with static data */}
          <FacilitatorMilestones
              arcadeGamesCompleted={stats.arcadeGamesCompleted}
              triviaGamesCompleted={stats.triviaGamesCompleted}
              skillBadgesCompleted={stats.skillBadgesCompleted}
          />

          <ChartVisualizations 
              reports={reports}
              stats={stats}
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      All Reports
                  </h3>

                  <div className="flex items-center gap-2">
                      <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                              type="text"
                              placeholder="Search reports..."
                              value={searchTerm}
                              onChange={handleSearch}
                              className="pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>

                      <button
                          onClick={fetchSampleData}
                          disabled={isLoading}
                          className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                          aria-label="Refresh reports"
                      >
                          <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      </button>

                      <Link href="/example/upload-report"
                          className="p-2 sm:px-3 sm:py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
                          aria-label="Upload new report"
                      >
                          <Upload className="h-4 w-4" /> <span className="hidden sm:inline">Upload New</span>
                      </Link>
                  </div>
              </div>

              <div className="overflow-x-auto">
                  {isLoading ? (
                      <div className="py-20 flex items-center justify-center">
                          <div className="flex flex-col items-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading reports...</p>
                          </div>
                      </div>
                  ) : (
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-900/50">
                              <tr>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Participants</th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Skill Badges</th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Arcade Games</th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trivia Games</th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lab-Free Courses</th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Access Code Redeemed</th>
                                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {filteredReports.length > 0 ? (
                                  filteredReports.map((report, index) => (
                                      <tr key={report.$id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(report.reportDate)}</td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                              {report.totalParticipants || 0}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                              {report.skillBadgesCompleted || 0}
                                              {renderDelta(report.skillBadgesCompleted, index, filteredReports, 'skillBadgesCompleted')}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                              {report.arcadeGamesCompleted || 0}
                                              {renderDelta(report.arcadeGamesCompleted, index, filteredReports, 'arcadeGamesCompleted')}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                              {report.triviaGamesCompleted || 0}
                                              {renderDelta(report.triviaGamesCompleted, index, filteredReports, 'triviaGamesCompleted')}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                              {report.labFreeCoursesCompleted || 0}
                                              {renderDelta(report.labFreeCoursesCompleted, index, filteredReports, 'labFreeCoursesCompleted')}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                              {report.totalAccessCodeRedeemed || 0}
                                              {renderDelta(report.totalAccessCodeRedeemed, index, filteredReports, 'totalAccessCodeRedeemed')}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                              <div className="flex items-center justify-center space-x-2">
                                                  <button
                                                      className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                                                      title="View Details"
                                                      onClick={() => {
                                                          toast.success('This is an example - view functionality would be here in the actual app');
                                                      }}
                                                  >
                                                      <Eye className="h-4 w-4" />
                                                  </button>

                                                  <button
                                                      className="p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                                                      title="Delete Report"
                                                      onClick={() => { handleDeleteReport(report.$id) }}
                                                  >
                                                      <Trash2 className="h-4 w-4" />
                                                  </button>
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr>
                                      <td colSpan="8" className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                          {reports.length === 0 ?
                                              'No reports found. Start by uploading your first progress report.' :
                                              'No reports match your search criteria.'
                                          }
                                      </td>
                                  </tr>
                              )}
                          </tbody>
                      </table>
                  )}
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                      {!isLoading && filteredReports.length > 0 ?
                          `Showing ${filteredReports.length} of ${reports.length} reports` :
                          '\u00A0'
                      }
                  </p>
              </div>
          </div>
      </div>
  );
};

export default ExampleViewAllReportsBody;