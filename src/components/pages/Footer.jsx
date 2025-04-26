import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Made with <span className="text-blue-500">💙</span>
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <a href="mailto:hello@saptarshi.xyz?subject=Arcade+Facilitator+Progress+Tracker" className="hover:underline underline-offset-2 text-yellow-600 dark:text-yellow-400 transition-colors">Email Us</a>
            <span className="mx-2">|</span>
            <span>© 2025</span>

            {/* <span className="mx-2">|</span>
            <a href="https://github.com/Saptarshi-Chakraborty/arcade-progress-tracker" className="hover:underline underline-offset-2 text-green-600 dark:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">Source Code</a> */}

          </div>

          {/* Disclaimer that this is not an official website of arcade or google cloud */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            This is not an official website of Arcade or Google Cloud.
          </p>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer