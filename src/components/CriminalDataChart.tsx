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
import { Check, Download } from 'lucide-react';
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
  bonded_out: { convicted_criminal: number; pending_charges: number; other: number };
  order_of_recog: { convicted_criminal: number; pending_charges: number; other: number };
  order_of_supervision: { convicted_criminal: number; pending_charges: number; other: number };
  paroled: { convicted_criminal: number; pending_charges: number; other: number };
  proceedings_terminated: { convicted_criminal: number; pending_charges: number; other: number };
  release_to_removed: { convicted_criminal: number; pending_charges: number; other: number };
  relief_granted: { convicted_criminal: number; pending_charges: number; other: number };
  transferred_to_agency: { convicted_criminal: number; pending_charges: number; other: number };
  transferred: { convicted_criminal: number; pending_charges: number; other: number };
  other: { convicted_criminal: number; pending_charges: number; other: number };
}

interface DataStructure {
  book_outs: BookOutData[];
}

const CriminalDataChart: React.FC = () => {
  const [data, setData] = useState<DataStructure | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    convicted_criminal: true,
    pending_charges: true,
    other: true,
  });

  useEffect(() => {
    import('../data.json').then((jsonData) => {
      setData(jsonData.default);
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
    bonded_out: 'Bonded Out',
    order_of_recog: 'Order of Recognition',
    order_of_supervision: 'Order of Supervision',
    paroled: 'Paroled',
    proceedings_terminated: 'Proceedings Terminated',
    release_to_removed: 'Release to Removed',
    relief_granted: 'Relief Granted',
    transferred_to_agency: 'Transferred to Agency',
    transferred: 'Transferred',
    other: 'Other',
  };

  const categoryColors = {
    bonded_out: '#3B82F6',
    order_of_recog: '#10B981',
    order_of_supervision: '#F59E0B',
    paroled: '#EF4444',
    proceedings_terminated: '#8B5CF6',
    release_to_removed: '#F97316',
    relief_granted: '#06B6D4',
    transferred_to_agency: '#84CC16',
    transferred: '#EC4899',
    other: '#6B7280',
  };

  const downloadExcel = () => {
    if (!data) return;

    // Flatten the data for Excel format
    const flattenedData = data.book_outs.flatMap(item => {
      const date = item.date;
      return Object.entries(item).filter(([key]) => key !== 'date').map(([category, values]) => ({
        Date: date,
        Category: categoryLabels[category as keyof typeof categoryLabels] || category,
        'Convicted Criminal': (values as any).convicted_criminal,
        'Pending Criminal Charges': (values as any).pending_charges,
        'Other': (values as any).other,
        'Total': (values as any).convicted_criminal + (values as any).pending_charges + (values as any).other
      }));
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(flattenedData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Criminal Data');
    
    // Save file
    XLSX.writeFile(wb, 'criminal_data.xlsx');
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
        text: 'Criminal Data Over Time',
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Criminal Data Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Interactive visualization of criminal data trends over time
          </p>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Filter by Criminality Level:
            </h2>
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
                        <Check className="w-3 h-3 text-white" />
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
              <Download className="w-4 h-4 mr-2" />
              Download Excel File
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div style={{ height: '500px' }}>
              <Bar data={chartData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriminalDataChart;