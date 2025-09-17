export interface TableColumn {
  name: string;
  type: string;
  description: string;
  nullable: boolean;
  isPrimaryKey?: boolean;
}

export interface Table {
  id: string;
  name: string;
  records: number;
  columns: number;
  lastUpdated: string;
  status: 'success' | 'warning' | 'error';
  description: string;
  schema: string;
  dateRange: {
    from: string;
    to: string;
  };
  tags: string[];
  owners: string[];
  frequentUsers: number;
  tableColumns: TableColumn[];
}

export interface DataSource {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  description: string;
  tables: Table[];
  metrics: DataQualityMetrics;
}

export interface DataQualityMetrics {
  accuracy: number;
  completeness: number;
  consistency: number;
  timeliness: number;
  validity: number;
  uniqueness: number;
}

// Helper function to create minimal table data for other sources
const createSimpleTable = (id: string, name: string, records: number, columns: number, lastUpdated: string, status: 'success' | 'warning' | 'error', description: string, schema: string): Table => ({
  id,
  name,
  records,
  columns,
  lastUpdated,
  status,
  description,
  schema,
  dateRange: { from: 'Jan 1, 2020', to: 'Present' },
  tags: ['energy', 'trading', 'data'],
  owners: ['system@trading.com'],
  frequentUsers: Math.floor(Math.random() * 100) + 20,
  tableColumns: [
    { name: 'id', type: 'string', description: 'Primary identifier', nullable: false, isPrimaryKey: true },
    { name: 'timestamp', type: 'timestamp', description: 'Record timestamp', nullable: false },
    { name: 'value', type: 'decimal', description: 'Primary value', nullable: false },
    { name: 'status', type: 'string', description: 'Record status', nullable: true }
  ]
});

export const mockDataSources: DataSource[] = [
  {
    id: 'reuters-commodities',
    name: 'Reuters Commodities',
    status: 'success',
    description: 'Real-time commodity prices and market data from Reuters',
    tables: [
      { 
        id: 'oil-prices', 
        name: 'Oil Prices', 
        records: 45672, 
        columns: 12, 
        lastUpdated: '2024-01-15 09:30:00', 
        status: 'success',
        description: 'Real-time oil price data from global markets including WTI, Brent, and regional benchmarks',
        schema: 'reuters_commodities',
        dateRange: { from: 'Jan 1, 2020', to: 'Present' },
        tags: ['oil', 'commodities', 'real-time', 'pricing'],
        owners: ['john.doe@trading.com', 'sarah.smith@trading.com'],
        frequentUsers: 156,
        tableColumns: [
          { name: 'timestamp', type: 'timestamp', description: 'Trade execution timestamp', nullable: false, isPrimaryKey: true },
          { name: 'symbol', type: 'string', description: 'Oil contract symbol (WTI, Brent, etc.)', nullable: false },
          { name: 'price', type: 'decimal', description: 'Price per barrel in USD', nullable: false },
          { name: 'volume', type: 'integer', description: 'Trading volume', nullable: true },
          { name: 'bid_price', type: 'decimal', description: 'Highest bid price', nullable: true },
          { name: 'ask_price', type: 'decimal', description: 'Lowest ask price', nullable: true },
          { name: 'settlement_price', type: 'decimal', description: 'Daily settlement price', nullable: true },
          { name: 'open_interest', type: 'integer', description: 'Total open positions', nullable: true },
          { name: 'market_status', type: 'string', description: 'Market status (OPEN, CLOSED, HALT)', nullable: false },
          { name: 'exchange', type: 'string', description: 'Exchange identifier', nullable: false },
          { name: 'currency', type: 'string', description: 'Price currency (USD, EUR, GBP)', nullable: false },
          { name: 'quality_flag', type: 'string', description: 'Data quality indicator', nullable: true }
        ]
      },
      { 
        id: 'gas-futures', 
        name: 'Gas Futures', 
        records: 23451, 
        columns: 8, 
        lastUpdated: '2024-01-15 09:29:45', 
        status: 'success',
        description: 'Natural gas futures contracts and pricing data from major exchanges',
        schema: 'reuters_commodities',
        dateRange: { from: 'Mar 15, 2019', to: 'Present' },
        tags: ['gas', 'futures', 'energy', 'contracts'],
        owners: ['mike.johnson@trading.com'],
        frequentUsers: 89,
        tableColumns: [
          { name: 'contract_id', type: 'string', description: 'Unique contract identifier', nullable: false, isPrimaryKey: true },
          { name: 'expiry_date', type: 'date', description: 'Contract expiration date', nullable: false },
          { name: 'strike_price', type: 'decimal', description: 'Contract strike price', nullable: false },
          { name: 'current_price', type: 'decimal', description: 'Current market price', nullable: false },
          { name: 'volume_traded', type: 'integer', description: 'Daily volume traded', nullable: true },
          { name: 'delivery_point', type: 'string', description: 'Gas delivery location', nullable: false },
          { name: 'contract_size', type: 'integer', description: 'Contract size in MMBtu', nullable: false },
          { name: 'last_trade_time', type: 'timestamp', description: 'Last trade execution time', nullable: true }
        ]
      },
      { 
        id: 'commodity-index', 
        name: 'Commodity Index', 
        records: 8934, 
        columns: 15, 
        lastUpdated: '2024-01-15 09:28:30', 
        status: 'warning',
        description: 'Composite commodity price indices and market benchmarks',
        schema: 'reuters_commodities', 
        dateRange: { from: 'Jan 1, 2018', to: 'Present' },
        tags: ['index', 'benchmark', 'commodities', 'composite'],
        owners: ['alice.brown@trading.com', 'david.wilson@trading.com'],
        frequentUsers: 234,
        tableColumns: [
          { name: 'index_date', type: 'date', description: 'Index calculation date', nullable: false, isPrimaryKey: true },
          { name: 'index_name', type: 'string', description: 'Index identifier', nullable: false, isPrimaryKey: true },
          { name: 'index_value', type: 'decimal', description: 'Calculated index value', nullable: false },
          { name: 'daily_change', type: 'decimal', description: 'Day-over-day change', nullable: true },
          { name: 'percent_change', type: 'decimal', description: 'Percentage change from previous day', nullable: true }
        ]
      }
    ],
    metrics: { accuracy: 91.2, completeness: 88.7, consistency: 100.0, timeliness: 89.0, validity: 85.9, uniqueness: 98.5 }
  },
  {
    id: 'bloomberg-energy',
    name: 'Bloomberg Energy',
    status: 'warning',
    description: 'Energy market data and analytics from Bloomberg Terminal',
    tables: [
      createSimpleTable('energy-derivatives', 'Energy Derivatives', 67890, 18, '2024-01-15 09:25:12', 'warning', 'Energy derivative instruments', 'bloomberg_energy'),
      createSimpleTable('power-markets', 'Power Markets', 34567, 10, '2024-01-15 09:20:00', 'success', 'Electricity market data', 'bloomberg_energy')
    ],
    metrics: { accuracy: 87.3, completeness: 92.1, consistency: 95.8, timeliness: 78.2, validity: 89.4, uniqueness: 96.7 }
  },
  {
    id: 'sp-platts',
    name: 'S&P Platts',
    status: 'success',
    description: 'Petroleum and petrochemical price assessments',
    tables: [
      createSimpleTable('crude-assessments', 'Crude Assessments', 12345, 14, '2024-01-15 09:32:15', 'success', 'Daily crude oil assessments', 'sp_platts'),
      createSimpleTable('refined-products', 'Refined Products', 56789, 16, '2024-01-15 09:31:00', 'success', 'Refined petroleum products', 'sp_platts')
    ],
    metrics: { accuracy: 94.8, completeness: 96.3, consistency: 98.9, timeliness: 91.7, validity: 93.2, uniqueness: 99.1 }
  },
  {
    id: 'ice-futures',
    name: 'ICE Futures',
    status: 'error',
    description: 'Intercontinental Exchange futures and options data',
    tables: [
      createSimpleTable('brent-futures', 'Brent Futures', 78901, 20, '2024-01-15 08:45:30', 'error', 'Brent crude futures', 'ice_futures'),
      createSimpleTable('gas-options', 'Gas Options', 23456, 12, '2024-01-15 08:30:00', 'error', 'Natural gas options', 'ice_futures')
    ],
    metrics: { accuracy: 76.4, completeness: 68.9, consistency: 82.1, timeliness: 45.3, validity: 71.8, uniqueness: 88.9 }
  },
  {
    id: 'nymex-trading',
    name: 'NYMEX Trading',
    status: 'success',
    description: 'New York Mercantile Exchange trading data',
    tables: [
      createSimpleTable('wti-crude', 'WTI Crude', 89012, 22, '2024-01-15 09:33:45', 'success', 'WTI crude oil contracts', 'nymex_trading'),
      createSimpleTable('heating-oil', 'Heating Oil', 34567, 11, '2024-01-15 09:32:30', 'success', 'Heating oil futures', 'nymex_trading')
    ],
    metrics: { accuracy: 96.1, completeness: 94.7, consistency: 99.2, timeliness: 93.5, validity: 95.8, uniqueness: 97.9 }
  },
  {
    id: 'argus-media',
    name: 'Argus Media',
    status: 'warning',
    description: 'Independent energy and commodity price reporting',
    tables: [
      createSimpleTable('petroleum-prices', 'Petroleum Prices', 45678, 13, '2024-01-15 09:15:20', 'warning', 'Petroleum price reports', 'argus_media')
    ],
    metrics: { accuracy: 85.7, completeness: 91.2, consistency: 87.6, timeliness: 82.4, validity: 88.9, uniqueness: 94.3 }
  },
  {
    id: 'eia-reports',
    name: 'EIA Reports',
    status: 'success',
    description: 'U.S. Energy Information Administration statistical data',
    tables: [
      createSimpleTable('weekly-petroleum', 'Weekly Petroleum Status', 2345, 25, '2024-01-15 09:00:00', 'success', 'Weekly petroleum statistics', 'eia_reports')
    ],
    metrics: { accuracy: 99.1, completeness: 97.8, consistency: 99.5, timeliness: 95.2, validity: 98.7, uniqueness: 99.8 }
  },
  {
    id: 'iea-statistics',
    name: 'IEA Statistics',
    status: 'success',
    description: 'International Energy Agency global energy statistics',
    tables: [
      createSimpleTable('monthly-oil', 'Monthly Oil Market Report', 1234, 30, '2024-01-15 08:00:00', 'success', 'Monthly oil market analysis', 'iea_statistics')
    ],
    metrics: { accuracy: 97.5, completeness: 95.9, consistency: 98.1, timeliness: 88.7, validity: 96.4, uniqueness: 99.2 }
  },
  {
    id: 'opec-data',
    name: 'OPEC Data',
    status: 'warning',
    description: 'Organization of Petroleum Exporting Countries production data',
    tables: [
      createSimpleTable('production-quotas', 'Production Quotas', 567, 8, '2024-01-15 07:30:00', 'warning', 'OPEC production quotas', 'opec_data'),
      createSimpleTable('monthly-bulletin', 'Monthly Oil Market Bulletin', 890, 35, '2024-01-15 07:00:00', 'success', 'Monthly market bulletin', 'opec_data')
    ],
    metrics: { accuracy: 89.3, completeness: 85.6, consistency: 92.4, timeliness: 76.8, validity: 87.2, uniqueness: 95.7 }
  },
  {
    id: 'internal-trading',
    name: 'Internal Trading',
    status: 'success',
    description: 'Internal proprietary trading and risk management data',
    tables: [
      createSimpleTable('trade-positions', 'Trade Positions', 123456, 40, '2024-01-15 09:35:00', 'success', 'Current trading positions', 'internal_trading'),
      createSimpleTable('risk-metrics', 'Risk Metrics', 78901, 15, '2024-01-15 09:34:30', 'success', 'Risk management metrics', 'internal_trading')
    ],
    metrics: { accuracy: 98.7, completeness: 99.1, consistency: 99.8, timeliness: 97.3, validity: 99.2, uniqueness: 99.9 }
  }
];

export const getDataSourceById = (id: string): DataSource | undefined => {
  return mockDataSources.find(source => source.id === id);
};