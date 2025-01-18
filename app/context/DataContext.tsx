import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
// import _ from 'lodash';

// local data
interface CompanyData {
  columns: string[];
  data: (string | number)[][];
}

// API data
interface PriceChange {
  symbol: string;
  "1D": number;
  "5D": number;
  "1M": number;
  "3M": number;
  "6M": number;
  ytd: number;
  "1Y": number;
  "3Y": number;
  "5Y": number;
  "10Y": number;
  max: number;
}

interface PriceVolume {
  symbol: string;
  price: number;
  volume: number;
}

// custom data
interface FilterData {
  symbol: string;
  sector: string;
  STM: number | 0;
  LTM: number | undefined;

  dayChange: string;
  fiveDayChange: string;
  monthChange: string;
  yearChange: string;
  threeYearChange: string;
  fiveYearChange: string;
}

interface AssetData {
  symbol: string;
  STM: number | undefined;
  LTM: number | undefined;
  price: number;
  volume: number;

  priceChange: PriceChange[];
}

interface CombinedDataPreview {
  columns: string[];
  data: {
    symbol: string;
    security: string;
    sector: string;
    price: number | undefined;
    STM: number | undefined;
    LTM: number | undefined;
  }[];
}

interface UnifiedDataContext {
  filterData: FilterData[];
  assetData: AssetData[];
  combinedDataPreview: CombinedDataPreview;

  companyData: CompanyData;
}

const DataContext = createContext<UnifiedDataContext | null>(null);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<UnifiedDataContext | null>(null);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;

    const fetchData = async () => {
      try {
        const localResponse = await fetch('/details.json');
        const companyData: CompanyData = await localResponse.json();

        const priceChangeResponse = await fetch('/fetchData?type=priceChange');
        const priceChangeData: PriceChange[] = await priceChangeResponse.json();

        const priceVolumeResponse = await fetch('/fetchData?type=priceVolume');
        const priceVolumeData: PriceVolume[] = await priceVolumeResponse.json();

        const filterData = companyData.data.map((companyRow) => {
          const symbol = companyRow[0] as string;
          const priceChange = priceChangeData.find(pc => pc.symbol === symbol);

          return {
            symbol: symbol,
            sector: companyRow[2] as string,
            STM: calcSTM(symbol, priceChangeData),
            LTM: calcLTM(symbol, priceChangeData),
            dayChange: (priceChange?.['1D'] || 0).toFixed(2),
            fiveDayChange: (priceChange?.['5D'] || 0).toFixed(2),
            monthChange: (priceChange?.['1M'] || 0).toFixed(2),
            yearChange: (priceChange?.['1Y'] || 0).toFixed(2),
            threeYearChange: (priceChange?.['3Y'] || 0).toFixed(2),
            fiveYearChange: (priceChange?.['5Y'] || 0).toFixed(2),
          };
        });

        const assetData = companyData.data.map((companyRow) => {
          const symbol = companyRow[0] as string;
          const STM = calcSTM(symbol, priceChangeData);
          const LTM = calcLTM(symbol, priceChangeData);

          const price = priceVolumeData.find(pv => pv.symbol === symbol)?.price ?? 0;
          const volume = priceVolumeData.find(pv => pv.symbol === symbol)?.volume ?? 0;

          return {
            symbol: symbol,
            STM: STM,
            LTM: LTM,
            price: price,
            volume: volume,
            details: companyData,
            priceChange: priceChangeData,
          };
        });

        // table data
        const combinedDataPreviewColumns = ["symbol", "security", "sector", "price", "STM", "LTM"];

        const combinedDataPreview = companyData.data.map((companyRow) => {
          const symbol = companyRow[0] as string;
          const security = companyRow[1] as string;
          const gicsSector = companyRow[2] as string;

          const price = priceVolumeData.find(pv => pv.symbol === symbol)?.price ?? 0;

          // const volume = priceVolumeData.find(pv => pv.symbol === symbol)?.volume ?? 0;
          const STM = calcSTM(symbol, priceChangeData);
          const LTM = calcLTM(symbol, priceChangeData);

          return {
            symbol: symbol,
            security: security,
            sector: gicsSector,
            price: price,
            // volume: volume,
            STM: STM,
            LTM: LTM
          };
        });

        // const excludeFirstTwoColumns = (combinedDataPreview: any[]) =>
        //   combinedDataPreview.map(({ security, sector, price, ...rest }) => rest);

        // const filteredData = excludeFirstTwoColumns(combinedDataPreview);

        // const topSTM = [...filteredData]
        //   .sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0));
        //  .slice(0, 16);

        // const topLTM = [...filteredData]
        //   .sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0))
        //   .slice(0, 16);

        setData({
          filterData,
          assetData,
          combinedDataPreview: { columns: combinedDataPreviewColumns, data: combinedDataPreview },
          companyData,
        });

        dataFetchedRef.current = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

function calcSTM(symbol: string, priceChangeData: PriceChange[]): number {
  const symbolData = priceChangeData.find(pc => pc.symbol === symbol);
  if (!symbolData) {
    console.error(`Symbol not found in priceChangeData: ${symbol}`);
    return 0;
  }

  const percentile1D = priceChangeData.filter(x => x['1D'] <= symbolData['1D']).length / 501;
  const percentile5D = priceChangeData.filter(x => x['5D'] <= symbolData['5D']).length / 501;
  const percentile1M = priceChangeData.filter(x => x['1M'] <= symbolData['1M']).length / 501;
  const momentum = ((percentile1D * 0.6) + (percentile5D * 1.5) + (percentile1M * 0.9)) / 3;

  return parseFloat(momentum.toFixed(2));
}

function calcLTM(symbol: string, priceChangeData: PriceChange[]): number {
  const symbolData = priceChangeData.find(pc => pc.symbol === symbol);
  if (!symbolData) {
    console.error(`Symbol not found in priceChangeData: ${symbol}`);
    return 0;
  }

  const percentile1D = priceChangeData.filter(x => x['1Y'] <= symbolData['1Y']).length / 501;
  const percentile5D = priceChangeData.filter(x => x['3Y'] <= symbolData['3Y']).length / 501;
  const percentile1M = priceChangeData.filter(x => x['5Y'] <= symbolData['5Y']).length / 501;
  const momentum = ((percentile1D * 0.85) + (percentile5D * 1.25) + (percentile1M * 0.95)) / 3;

  return parseFloat(momentum.toFixed(2));
}