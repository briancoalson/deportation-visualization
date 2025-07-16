# ICE Final Book Outs Dashboard

An interactive data visualization dashboard that displays ICE final book outs by release reason over time. Features filterable stacked bar charts and Excel export functionality.

## Features

- **Interactive Filtering**: Filter data by criminality level (Convicted Criminal, Pending Criminal Charges, Other)
- **Stacked Bar Chart**: Visualize trends over time with color-coded release reasons
- **Excel Export**: Download the complete dataset in Excel format
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Updates**: Chart updates instantly when filters are changed

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ice-final-book-outs-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   The application will be available at `http://localhost:5173` (or another port if 5173 is busy)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Data Structure

The application reads data from `src/data.json`. The JSON structure includes:

- **Date**: Monthly data points (YYYY-MM-DD format)
- **Release Reasons**: Categories like bonded_out, paroled, order_of_recog, etc.
- **Criminality Levels**: Each release reason contains data for convicted_criminal, pending_charges, and other

## Technology Stack

- **React** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Chart.js** - Interactive charting library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **XLSX** - Excel file generation for data export

## Project Structure

```
src/
├── components/                 # Different charts and React components
│   └── ICEBookOutsChart.tsx    
├── data.json                   # Data source (manually updated from published data)
├── App.tsx                     # Root component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.