import React, { memo } from 'react';
import { Icon } from '../common/Icon';

/**
 * Loading component with spinner and message
 * @param {string} message - Loading message to display
 * @returns {JSX.Element} - Loading component
 */
const LoadingScreen = memo(({ message = "Loading data from the blockchain..." }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
    <Icon name="Loading" />
    <p className="mt-4 text-gray-400">{message}</p>
  </div>
));

/**
 * Error component for displaying error messages
 * @param {string} message - Error message to display
 * @returns {JSX.Element} - Error component
 */
const ErrorScreen = memo(({ message = "Failed to load portfolio data. Please check the console for errors." }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
    <p className="text-red-500">{message}</p>
  </div>
));

LoadingScreen.displayName = 'LoadingScreen';
ErrorScreen.displayName = 'ErrorScreen';

export { LoadingScreen, ErrorScreen };