import React from 'react';

// Simple skeleton loader for page sections
const Skeleton = ({ height = '1.5rem', width = '100%', className = '' }) => (
  <div
    className={`animate-pulse bg-gray-800 rounded-md ${className}`}
    style={{ height, width }}
  />
);

// Example skeleton for a page layout
export const PageSkeleton = () => (
  <div className="relative min-h-screen bg-gray-950 font-sans antialiased">
    {/* Sidebar skeleton */}
    <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-r border-gray-800/50 z-40 animate-pulse" />

    {/* Blockchain loading message */}
    <div className="w-full flex items-center justify-center pt-10 pb-2">
      <span className="flex items-center gap-3 text-cyan-300 text-lg font-semibold animate-pulse">
        <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
        Loading From Blockchain...
      </span>
    </div>

    {/* Main content skeleton */}
    <div className="transition-all duration-300 pt-8 md:pt-0 md:pl-64">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10 animate-fade-in">
        {/* Header skeleton */}
        <div className="mb-8">
          <Skeleton height="3.5rem" width="60%" className="mx-auto mb-4" />
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton height="2.5rem" width="10rem" />
            <Skeleton height="2.5rem" width="10rem" />
            <Skeleton height="2.5rem" width="10rem" />
            <Skeleton height="2.5rem" width="10rem" />
          </div>
        </div>

        {/* Section skeletons */}
        <div className="space-y-10">
          {/* Summary */}
          <div className="rounded-2xl bg-gray-900/60 p-8">
            <Skeleton height="2rem" width="30%" className="mb-4" />
            <Skeleton height="1.25rem" width="80%" className="mb-2" />
            <Skeleton height="1.25rem" width="90%" className="mb-2" />
            <Skeleton height="1.25rem" width="70%" />
          </div>
          {/* Experience */}
          <div className="rounded-2xl bg-gray-900/60 p-8">
            <Skeleton height="2rem" width="30%" className="mb-4" />
            <Skeleton height="1.25rem" width="90%" className="mb-2" />
            <Skeleton height="1.25rem" width="85%" className="mb-2" />
            <Skeleton height="1.25rem" width="60%" />
          </div>
          {/* Projects */}
          <div className="rounded-2xl bg-gray-900/60 p-8">
            <Skeleton height="2rem" width="30%" className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
              <Skeleton height="10rem" />
              <Skeleton height="10rem" />
              <Skeleton height="10rem" className="hidden xl:block" />
            </div>
          </div>
          {/* Skills */}
          <div className="rounded-2xl bg-gray-900/60 p-8">
            <Skeleton height="2rem" width="30%" className="mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton height="3rem" />
              <Skeleton height="3rem" />
              <Skeleton height="3rem" />
              <Skeleton height="3rem" />
            </div>
          </div>
          {/* Education */}
          <div className="rounded-2xl bg-gray-900/60 p-8">
            <Skeleton height="2rem" width="30%" className="mb-4" />
            <Skeleton height="1.25rem" width="80%" className="mb-2" />
            <Skeleton height="1.25rem" width="60%" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-16">
          <Skeleton height="2.5rem" width="40%" className="mx-auto mb-4" />
          <Skeleton height="1.25rem" width="60%" className="mx-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
