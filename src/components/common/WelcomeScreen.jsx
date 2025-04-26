import React from 'react';
import Link from 'next/link';
import { Trophy, User } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4">
                <Trophy className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
              Welcome to the Arcade Progress Tracker
            </h1>
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-3">
                Track your progress in Google Cloud Arcade games and compare it with the Facilitator's  data.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                View your completed skill badges, arcade games, trivia games, and lab-free courses all in one place. 
                Monitor your achievements and milestones with beautiful visualizations.
              </p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sign in to access your personal dashboard and view your progress.
              </p>
              <Link href="/login">
                <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto">
                  <User className="h-5 w-5" />
                  Sign in to your account
                </button>
              </Link>
            </div>
          {/* Disclaimer that this is not an official website of arcade or google cloud */}
          <p className=" mt-2 text-base text-center ">
            Disclaimer: This is not an official website of Arcade or Google Cloud.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
