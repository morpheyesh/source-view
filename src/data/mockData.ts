export interface DataSource {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  description: string;
  tables: Table[];
  metrics: DataQualityMetrics;
}

export interface Table {
  id: string;
  name: string;
  records: number;
  columns: number;
  lastUpdated: string;
  status: 'success' | 'warning' | 'error';
}

export interface DataQualityMetrics {
  accuracy: number;
  completeness: number;
  consistency: number;
  timeliness: number;
  validity: number;
  uniqueness: number;
}

export const mockDataSources: DataSource[] = [
  {
    id: 'reuters-commodities',
    name: 'Reuters Commodities',
    status: 'success',
    description: 'Real-time commodity prices and market data from Reuters',
    tables: [
      { id: 'oil-prices', name: 'Oil Prices', records: 45672, columns: 12, lastUpdated: '2024-01-15 09:30:00', status: 'success' },
      { id: 'gas-futures', name: 'Gas Futures', records: 23451, columns: 8, lastUpdated: '2024-01-15 09:29:45', status: 'success' },
      { id: 'commodity-index', name: 'Commodity Index', records: 8934, columns: 15, lastUpdated: '2024-01-15 09:28:30', status: 'warning' }
    ],
    metrics: { accuracy: 91.2, completeness: 88.7, consistency: 100.0, timeliness: 89.0, validity: 85.9, uniqueness: 98.5 }
  },
  {
    id: 'bloomberg-energy',
    name: 'Bloomberg Energy',
    status: 'warning',
    description: 'Energy market data and analytics from Bloomberg Terminal',
    tables: [
      { id: 'energy-derivatives', name: 'Energy Derivatives', records: 67890, columns: 18, lastUpdated: '2024-01-15 09:25:12', status: 'warning' },
      { id: 'power-markets', name: 'Power Markets', records: 34567, columns: 10, lastUpdated: '2024-01-15 09:20:00', status: 'success' }
    ],
    metrics: { accuracy: 87.3, completeness: 92.1, consistency: 95.8, timeliness: 78.2, validity: 89.4, uniqueness: 96.7 }
  },
  {
    id: 'sp-platts',
    name: 'S&P Platts',
    status: 'success',
    description: 'Petroleum and petrochemical price assessments',
    tables: [
      { id: 'crude-assessments', name: 'Crude Assessments', records: 12345, columns: 14, lastUpdated: '2024-01-15 09:32:15', status: 'success' },
      { id: 'refined-products', name: 'Refined Products', records: 56789, columns: 16, lastUpdated: '2024-01-15 09:31:00', status: 'success' }
    ],
    metrics: { accuracy: 94.8, completeness: 96.3, consistency: 98.9, timeliness: 91.7, validity: 93.2, uniqueness: 99.1 }
  },
  {
    id: 'ice-futures',
    name: 'ICE Futures',
    status: 'error',
    description: 'Intercontinental Exchange futures and options data',
    tables: [
      { id: 'brent-futures', name: 'Brent Futures', records: 78901, columns: 20, lastUpdated: '2024-01-15 08:45:30', status: 'error' },
      { id: 'gas-options', name: 'Gas Options', records: 23456, columns: 12, lastUpdated: '2024-01-15 08:30:00', status: 'error' }
    ],
    metrics: { accuracy: 76.4, completeness: 68.9, consistency: 82.1, timeliness: 45.3, validity: 71.8, uniqueness: 88.9 }
  },
  {
    id: 'nymex-trading',
    name: 'NYMEX Trading',
    status: 'success',
    description: 'New York Mercantile Exchange trading data',
    tables: [
      { id: 'wti-crude', name: 'WTI Crude', records: 89012, columns: 22, lastUpdated: '2024-01-15 09:33:45', status: 'success' },
      { id: 'heating-oil', name: 'Heating Oil', records: 34567, columns: 11, lastUpdated: '2024-01-15 09:32:30', status: 'success' }
    ],
    metrics: { accuracy: 96.1, completeness: 94.7, consistency: 99.2, timeliness: 93.5, validity: 95.8, uniqueness: 97.9 }
  },
  {
    id: 'argus-media',
    name: 'Argus Media',
    status: 'warning',
    description: 'Independent energy and commodity price reporting',
    tables: [
      { id: 'petroleum-prices', name: 'Petroleum Prices', records: 45678, columns: 13, lastUpdated: '2024-01-15 09:15:20', status: 'warning' }
    ],
    metrics: { accuracy: 85.7, completeness: 91.2, consistency: 87.6, timeliness: 82.4, validity: 88.9, uniqueness: 94.3 }
  },
  {
    id: 'eia-reports',
    name: 'EIA Reports',
    status: 'success',
    description: 'U.S. Energy Information Administration statistical data',
    tables: [
      { id: 'weekly-petroleum', name: 'Weekly Petroleum Status', records: 2345, columns: 25, lastUpdated: '2024-01-15 09:00:00', status: 'success' }
    ],
    metrics: { accuracy: 99.1, completeness: 97.8, consistency: 99.5, timeliness: 95.2, validity: 98.7, uniqueness: 99.8 }
  },
  {
    id: 'iea-statistics',
    name: 'IEA Statistics',
    status: 'success',
    description: 'International Energy Agency global energy statistics',
    tables: [
      { id: 'monthly-oil', name: 'Monthly Oil Market Report', records: 1234, columns: 30, lastUpdated: '2024-01-15 08:00:00', status: 'success' }
    ],
    metrics: { accuracy: 97.5, completeness: 95.9, consistency: 98.1, timeliness: 88.7, validity: 96.4, uniqueness: 99.2 }
  },
  {
    id: 'opec-data',
    name: 'OPEC Data',
    status: 'warning',
    description: 'Organization of Petroleum Exporting Countries production data',
    tables: [
      { id: 'production-quotas', name: 'Production Quotas', records: 567, columns: 8, lastUpdated: '2024-01-15 07:30:00', status: 'warning' },
      { id: 'monthly-bulletin', name: 'Monthly Oil Market Bulletin', records: 890, columns: 35, lastUpdated: '2024-01-15 07:00:00', status: 'success' }
    ],
    metrics: { accuracy: 89.3, completeness: 85.6, consistency: 92.4, timeliness: 76.8, validity: 87.2, uniqueness: 95.7 }
  },
  {
    id: 'internal-trading',
    name: 'Internal Trading',
    status: 'success',
    description: 'Internal proprietary trading and risk management data',
    tables: [
      { id: 'trade-positions', name: 'Trade Positions', records: 123456, columns: 40, lastUpdated: '2024-01-15 09:35:00', status: 'success' },
      { id: 'risk-metrics', name: 'Risk Metrics', records: 78901, columns: 15, lastUpdated: '2024-01-15 09:34:30', status: 'success' }
    ],
    metrics: { accuracy: 98.7, completeness: 99.1, consistency: 99.8, timeliness: 97.3, validity: 99.2, uniqueness: 99.9 }
  }
];

export const getDataSourceById = (id: string): DataSource | undefined => {
  return mockDataSources.find(source => source.id === id);
};