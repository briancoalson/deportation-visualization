import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About ICE Analytics Platform
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sources & Methodology</h2>
            <p className="text-gray-600 mb-6">
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Interactive data visualizations with real-time filtering capabilities</li>
              <li>Comprehensive analytics dashboard for ICE operations data</li>
              <li>Export functionality for detailed data analysis</li>
              <li>Responsive design optimized for desktop and mobile devices</li>
              <li>Secure data handling and privacy protection measures</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Implementation</h2>
            <p className="text-gray-600 mb-6">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Future Development</h2>
            <p className="text-gray-600 mb-6">
              Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Contact Information</h3>
              <p className="text-blue-700">
                For questions about this platform or to request additional features, please contact the development team through the appropriate channels within your organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;