import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BookOutData {
  date: string;
  bond_set_by_IJ: { convicted_criminal: number; pending_charges: number; other: number };
  bond_set_by_ICE: { convicted_criminal: number; pending_charges: number; other: number };
  [key: string]: any;
}

interface DataStructure {
  book_outs: BookOutData[];
}

const BondSetByChart: React.FC = () => {
  const [data, setData] = useState<DataStructure | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    convicted_criminal: true,
    pending_charges: true,
    other: true,
  });

  useEffect(() => {
    // Force fresh import by adding timestamp to bypass cache
    import('../data.json?t=' + Date.now())
      .then((jsonData) => {
        console.log('Bond Set By Data loaded:', jsonData.default);
        setData(jsonData.default);
      })
      .catch((error) => {
        console.error('Error loading bond set by data:', error);
      });
  }, []);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const categoryLabels = {
    bond_set_by_IJ: 'Immigration Judge',
    bond_set_by_ICE: 'ICE',
  };

  const categoryColors = {
    bond_set_by_IJ: '#3B82F6',
    bond_set_by_ICE: '#10B981',
  };

  const downloadExcel = () => {
    if (!data) return;

    // Flatten the data for Excel format
    const flattenedData = data.book_outs.map(item => ({
      Date: item.date,
      'Immigration Judge - Convicted Criminal': item.bond_set_by_IJ.convicted_criminal,
      'Immigration Judge - Pending Criminal Charges': item.bond_set_by_IJ.pending_charges,
      'Immigration Judge - Other': item.bond_set_by_IJ.other,
      'Immigration Judge - Total': item.bond_set_by_IJ.convicted_criminal + item.bond_set_by_IJ.pending_charges + item.bond_set_by_IJ.other,
      'ICE - Convicted Criminal': item.bond_set_by_ICE.convicted_criminal,
      'ICE - Pending Criminal Charges': item.bond_set_by_ICE.pending_charges,
      'ICE - Other': item.bond_set_by_ICE.other,
      'ICE - Total': item.bond_set_by_ICE.convicted_criminal + item.bond_set_by_ICE.pending_charges + item.bond_set_by_ICE.other,
      'Grand Total': (item.bond_set_by_IJ.convicted_criminal + item.bond_set_by_IJ.pending_charges + item.bond_set_by_IJ.other) +
                     (item.bond_set_by_ICE.convicted_criminal + item.bond_set_by_ICE.pending_charges + item.bond_set_by_ICE.other)
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(flattenedData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Bond Set By');
    
    // Save file
    XLSX.writeFile(wb, 'bond_set_by_data.xlsx');
  };

  const chartData = useMemo(() => {
    if (!data) return null;

    const labels = data.book_outs.map(item => formatDate(item.date));
    const datasets = Object.keys(categoryLabels).map(category => {
      const categoryData = data.book_outs.map(item => {
        const categoryValues = item[category as keyof BookOutData] as {
          convicted_criminal: number;
          pending_charges: number;
          other: number;
        };
        
        let total = 0;
        if (selectedFilters.convicted_criminal) total += categoryValues.convicted_criminal;
        if (selectedFilters.pending_charges) total += categoryValues.pending_charges;
        if (selectedFilters.other) total += categoryValues.other;
        
        return total;
      });

      return {
        label: categoryLabels[category as keyof typeof categoryLabels],
        data: categoryData,
        backgroundColor: categoryColors[category as keyof typeof categoryColors],
        borderColor: categoryColors[category as keyof typeof categoryColors],
        borderWidth: 1,
      };
    });

    return {
      labels,
      datasets,
    };
  }, [data, selectedFilters]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Bond Set By Authority',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: 20,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const handleFilterChange = (filterKey: keyof typeof selectedFilters) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const filterLabels = {
    convicted_criminal: 'Convicted Criminal',
    pending_charges: 'Pending Criminal Charges',
    other: 'Other',
  };

  if (!data || !chartData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-lg text-gray-600 text-center py-8">
          Loading bond set by data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Bond Set By Authority
        </h2>
        <p className="text-gray-600 mb-6">
          Breakdown of who set bonds for individuals who bonded out - Immigration Judge vs ICE
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Filter by Criminality Level:
          </h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(filterLabels).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedFilters[key as keyof typeof selectedFilters]}
                    onChange={() => handleFilterChange(key as keyof typeof selectedFilters)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      selectedFilters[key as keyof typeof selectedFilters]
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-300 group-hover:border-blue-400'
                    }`}
                  >
                    {selectedFilters[key as keyof typeof selectedFilters] && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-200">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={downloadExcel}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Excel File
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div style={{ height: '400px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BondSetByChart;