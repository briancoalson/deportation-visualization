import React from 'react';
import ICEBookOutsChart from '../components/ICEBookOutsChart';

const Dashboards: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Data Dashboards
            </h1>
            <p className="text-gray-600">
              Interactive visualizations and analytics for ICE operations data
            </p>
          </div>
          
          <div className="grid gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  ICE Final Book Outs by Release Reason
                </h2>
                <p className="text-gray-600">
                  Track trends in ICE final book outs categorized by release reason over time
                </p>
              </div>
              <div className="p-0">
                <ICEBookOutsChart />
              </div>
            </div>
            
            {/* Placeholder for future dashboards */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">More Dashboards Coming Soon</h3>
                <p className="text-gray-500">Additional analytics and visualizations will be added here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;