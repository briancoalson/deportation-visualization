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
              This project is intended to take data about US Immigrations and Custom Enforcement (ICE) that is publically available and take it from spreadsheets of numbers to an impactful visual representation.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sources & Methodology</h2>
            <p className="text-gray-600 mb-6">
              All data is taken directly from the latest reports published by ICE.  The source data is available <a className="text-blue-700" href="https://www.ice.gov/detain/detention-management#stats">here</a>.  We look through published data to find interesting trends and then display these visually in our dashboards.
            </p>
                        
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Future Improvements</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">


              <li>Add data from other sources such as <a className="text-blue-700" href="https://deportationdata.org/">Deportation Data Project</a>.</li>


              <li>Automatically import data from ICE statistics as they are released.</li>


            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Contact Information</h3>
              <p className="text-gray-600 mb-6">
                Visit our Github repository at <a className="text-blue-700" href="https://github.com/briancoalson/deportation-visualization">https://github.com/briancoalson/deportation-visualization</a> to help contribute, or reach out to the team at <a className="text-blue-700" href="mailto:ICEAnalytics@briancoalson.com">ICEAnalytics@briancoalson.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;