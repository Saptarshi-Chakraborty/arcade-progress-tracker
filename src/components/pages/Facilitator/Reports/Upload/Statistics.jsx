import React from 'react';
import { CheckCircle, Users, Award, Gamepad2, Brain, BookOpen, Trophy } from 'lucide-react';

const Statistics = ({ statistics, errorRecords = [] }) => {
  if (!statistics) return null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-base font-semibold text-emerald-700 dark:text-emerald-300 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
          Upload Complete
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Students</div>
              <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="text-xl font-bold text-blue-800 dark:text-white">{statistics.totalParticipants}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-purple-800">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Skill Badges</div>
              <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </div>
            <div className="text-xl font-bold text-purple-800 dark:text-white">{statistics.skillBadgesCompleted}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-orange-200 dark:border-orange-800">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Arcade Games</div>
              <Gamepad2 className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="text-xl font-bold text-orange-800 dark:text-white">{statistics.arcadeGamesCompleted}</div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200 dark:border-pink-800">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-pink-700 dark:text-pink-300">Trivia Games</div>
              <Brain className="h-5 w-5 text-pink-500 dark:text-pink-400" />
            </div>
            <div className="text-xl font-bold text-pink-800 dark:text-white">{statistics.triviaGamesCompleted}</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/40 dark:to-cyan-800/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-cyan-200 dark:border-cyan-800">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Lab-Free Courses</div>
              <BookOpen className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-cyan-800 dark:text-white">{statistics.labFreeCoursesCompleted}</div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200 dark:border-amber-800">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Milestones</div>
              <Trophy className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-xl font-bold text-amber-800 dark:text-white">{statistics.totalMilestonesAchived}</div>
          </div>
        </div>

        {errorRecords.length > 0 && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {errorRecords.length} records failed to upload. You may want to try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;