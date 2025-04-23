import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { 
    ChevronDown, 
    ChevronUp, 
    LineChart as LineChartIcon, 
    BarChartIcon, 
    Clock,
    Award, 
    Gamepad2, 
    Brain, 
    BookOpen 
} from 'lucide-react';

const ExampleHomePageBody = () => {
  // Static data for example purposes
  const [expandedSections, setExpandedSections] = useState({
    progressTrends: true,
    details: true,
    history: true
  });

  // Sample latest report data
  const latestReport = {
    reportDate: '2023-10-22T00:00:00.000Z',
    noOfSkillBadgesCompleted: 15,
    noOfArcadeGamesCompleted: 7,
    noOfTriviaGamesCompleted: 12,
    noOfLabFreeCoursesCompleted: 5,
    skillBadgesCompleted: [
      "Google Cloud Essentials", 
      "Baseline: Infrastructure", 
      "Kubernetes", 
      "Cloud Architecture", 
      "Data Science", 
      "Machine Learning", 
      "DevOps Essentials"
    ],
    arcadeGamesCompleted: [
      "Cloud Run", 
      "BigQuery", 
      "Cloud Storage"
    ],
    triviaGamesCompleted: [
      "Cloud Computing Basics", 
      "Machine Learning Concepts", 
      "Big Data Essentials", 
      "Serverless Architecture"
    ],
    labFreeCoursesCompleted: [
      "Introduction to Cloud Computing", 
      "Machine Learning Crash Course"
    ]
  };

  // Sample historical reports
  const allReports = [
    {
      $id: '1',
      reportDate: '2023-10-22T00:00:00.000Z',
      noOfSkillBadgesCompleted: 15,
      noOfArcadeGamesCompleted: 7,
      noOfTriviaGamesCompleted: 12,
      noOfLabFreeCoursesCompleted: 5,
    },
    {
      $id: '2',
      reportDate: '2023-09-15T00:00:00.000Z',
      noOfSkillBadgesCompleted: 12,
      noOfArcadeGamesCompleted: 5,
      noOfTriviaGamesCompleted: 10,
      noOfLabFreeCoursesCompleted: 3,
    },
    {
      $id: '3',
      reportDate: '2023-08-10T00:00:00.000Z',
      noOfSkillBadgesCompleted: 8,
      noOfArcadeGamesCompleted: 3,
      noOfTriviaGamesCompleted: 7,
      noOfLabFreeCoursesCompleted: 2,
    },
    {
      $id: '4',
      reportDate: '2023-07-05T00:00:00.000Z',
      noOfSkillBadgesCompleted: 4,
      noOfArcadeGamesCompleted: 1,
      noOfTriviaGamesCompleted: 3,
      noOfLabFreeCoursesCompleted: 0,
    }
  ];

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Prepare data for trend chart
  const prepareProgressTrendData = () => {
    return allReports
      .slice()
      .sort((a, b) => new Date(a.reportDate) - new Date(b.reportDate))
      .map(report => ({
        date: formatDate(report.reportDate),
        skillBadges: report.noOfSkillBadgesCompleted || 0,
        arcadeGames: report.noOfArcadeGamesCompleted || 0,
        triviaGames: report.noOfTriviaGamesCompleted || 0,
        labFreeCourses: report.noOfLabFreeCoursesCompleted || 0
      }));
  };

  // Prepare data for category distribution chart
  const prepareCategoryDistribution = () => {
    return [
      { name: 'Skill Badges', value: latestReport.noOfSkillBadgesCompleted || 0, color: '#8b5cf6' },
      { name: 'Arcade Games', value: latestReport.noOfArcadeGamesCompleted || 0, color: '#f97316' },
      { name: 'Trivia Games', value: latestReport.noOfTriviaGamesCompleted || 0, color: '#ec4899' },
      { name: 'Lab-Free Courses', value: latestReport.noOfLabFreeCoursesCompleted || 0, color: '#06b6d4' },
    ];
  };

  // Helper function to render deltas for report history
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

  const trendData = prepareProgressTrendData();
  const categoryData = prepareCategoryDistribution();
  const totalCompleted = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Example Progress Dashboard
      </h1>
      <p className="text-center mb-10 text-gray-600 dark:text-gray-300">
        This is an example dashboard showing how your arcade progress might look.
        <br />
        All data shown here is synthetic and for demonstration purposes only.
      </p>

      {/* Progress Trends Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <div
          className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('progressTrends')}
        >
          <div className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Progress Trends</h3>
          </div>
          {expandedSections.progressTrends ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {expandedSections.progressTrends && (
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Progress Over Time</h4>
                <div className="h-48 sm:h-56 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickMargin={10} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="skillBadges"
                        name="Skill Badges"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="arcadeGames"
                        name="Arcade Games"
                        stroke="#f97316"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="triviaGames"
                        name="Trivia Games"
                        stroke="#ec4899"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="labFreeCourses"
                        name="Lab-Free Courses"
                        stroke="#06b6d4"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Distribution Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Category Distribution</h4>
                <div className="flex flex-col items-center h-48 sm:h-56 md:h-64">
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Total Completed: {totalCompleted}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Completion Details Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <div
          className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('details')}
        >
          <div className="flex items-center gap-2">
            <BarChartIcon className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Completion Details</h3>
          </div>
          {expandedSections.details ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {expandedSections.details && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Badges */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-purple-500" />
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                    Skill Badges ({latestReport.noOfSkillBadgesCompleted || 0})
                  </h4>
                </div>
                <div className="max-h-40 overflow-y-auto custom-scrollbar">
                  {latestReport.skillBadgesCompleted && latestReport.skillBadgesCompleted.length > 0 ? (
                    <ul className="space-y-1">
                      {latestReport.skillBadgesCompleted.map((badge, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                          {badge}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No skill badges completed yet.</p>
                  )}
                </div>
              </div>

              {/* Arcade Games */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gamepad2 className="h-5 w-5 text-orange-500" />
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                    Arcade Games ({latestReport.noOfArcadeGamesCompleted || 0})
                  </h4>
                </div>
                <div className="max-h-40 overflow-y-auto custom-scrollbar">
                  {latestReport.arcadeGamesCompleted && latestReport.arcadeGamesCompleted.length > 0 ? (
                    <ul className="space-y-1">
                      {latestReport.arcadeGamesCompleted.map((game, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                          {game}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No arcade games completed yet.</p>
                  )}
                </div>
              </div>

              {/* Trivia Games */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-pink-500" />
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                    Trivia Games ({latestReport.noOfTriviaGamesCompleted || 0})
                  </h4>
                </div>
                <div className="max-h-40 overflow-y-auto custom-scrollbar">
                  {latestReport.triviaGamesCompleted && latestReport.triviaGamesCompleted.length > 0 ? (
                    <ul className="space-y-1">
                      {latestReport.triviaGamesCompleted.map((game, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                          {game}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No trivia games completed yet.</p>
                  )}
                </div>
              </div>

              {/* Lab-Free Courses */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-cyan-500" />
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                    Lab-Free Courses ({latestReport.noOfLabFreeCoursesCompleted || 0})
                  </h4>
                </div>
                <div className="max-h-40 overflow-y-auto custom-scrollbar">
                  {latestReport.labFreeCoursesCompleted && latestReport.labFreeCoursesCompleted.length > 0 ? (
                    <ul className="space-y-1">
                      {latestReport.labFreeCoursesCompleted.map((course, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 py-1 px-2 rounded bg-white dark:bg-gray-800">
                          {course}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No lab-free courses completed yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report History Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div
          className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('history')}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Report History</h3>
          </div>
          {expandedSections.history ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {expandedSections.history && (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Skill Badges</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Arcade Games</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trivia Games</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lab-Free Courses</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {allReports.map((report, index) => (
                    <tr key={report.$id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(report.reportDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {report.noOfSkillBadgesCompleted || 0}
                        {renderDelta(report.noOfSkillBadgesCompleted, index, allReports, 'noOfSkillBadgesCompleted')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {report.noOfArcadeGamesCompleted || 0}
                        {renderDelta(report.noOfArcadeGamesCompleted, index, allReports, 'noOfArcadeGamesCompleted')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {report.noOfTriviaGamesCompleted || 0}
                        {renderDelta(report.noOfTriviaGamesCompleted, index, allReports, 'noOfTriviaGamesCompleted')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {report.noOfLabFreeCoursesCompleted || 0}
                        {renderDelta(report.noOfLabFreeCoursesCompleted, index, allReports, 'noOfLabFreeCoursesCompleted')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExampleHomePageBody;