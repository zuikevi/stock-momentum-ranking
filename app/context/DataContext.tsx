import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

// interfaces matching fetched data structure
interface CompanyData {
  columns: string[];
  data: (string | number)[][];
}

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

// interfaces with custom data
interface FilterData {
  symbol: string;
  sector: string;
  STM: number | 0;
  LTM: number | 0;
  '1D': number | 0;
  '5D': number | 0;
  '1M': number | 0;
  '1Y': number | 0;
  '3Y': number | 0;
  '5Y': number | 0;
  'max': number | 0;

  watchlist: boolean;

  colours: string;
  tags: {
    tagText: string;
    bgColor: string;
    borderColor: string;
  };
}

// interface Watchlist {
//   symbol: string;
// }

interface AssetData {
  symbol: string;
  price: number;
  volume: number;
  security: string;
  subIndustry: string;
  headquarters: string;
  founded: string;
}

interface CombinedDataPreview {
  columns: string[];
  data: {
    symbol: string;
    security: string;
    sector: string;
    price: number | 0;
    // volume: number | 0;
    STM: number | 0;
    LTM: number | 0;
  }[];
}

// interface to access other interfaces
interface UnifiedDataContext {
  filterData: FilterData[];
  assetData: AssetData[];
  watchlist: string[];
  combinedDataPreview: CombinedDataPreview;
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

        const watchlistResponse = await fetch('/watchlist.json');
        const watchlistData = await watchlistResponse.json();
        const symbols: string[] = watchlistData.symbols;

        const priceChangeResponse = await fetch('/fetchData?type=priceChange');
        const priceChangeData: PriceChange[] = await priceChangeResponse.json();

        const priceVolumeResponse = await fetch('/fetchData?type=priceVolume');
        const priceVolumeData: PriceVolume[] = await priceVolumeResponse.json();

        const filterData = companyData.data.map((companyRow) => {
          const symbol = companyRow[0] as string;
          const priceChange = priceChangeData.find(pc => pc.symbol === symbol);
          const stm = calcSTM(symbol, priceChangeData);
          const ltm = calcLTM(symbol, priceChangeData);

          const tagText = "tagTest";
          const bgColor = "#BEAAE0";
          const borderColor = "#773CBF";
          return {
            symbol: symbol,
            sector: companyRow[2] as string,
            STM: stm,
            LTM: ltm,
            '1D': Number((priceChange?.['1D'] || 0).toFixed(2)),
            '5D': Number((priceChange?.['5D'] || 0).toFixed(2)),
            '1M': Number((priceChange?.['1M'] || 0).toFixed(2)),
            '1Y': Number((priceChange?.['1Y'] || 0).toFixed(2)),
            '3Y': Number((priceChange?.['3Y'] || 0).toFixed(2)),
            '5Y': Number((priceChange?.['5Y'] || 0).toFixed(2)),
            'max': Number((priceChange?.max || 0).toFixed(2)),
            watchlist: symbols.includes(symbol),
            colours: '',
            tags: { tagText: tagText, bgColor: bgColor,  borderColor: borderColor},
          };
        });

        const assetData = companyData.data.map((companyRow) => {
          const symbol = companyRow[0] as string;
          const price = priceVolumeData.find(pv => pv.symbol === symbol)?.price ?? 0;
          const volume = priceVolumeData.find(pv => pv.symbol === symbol)?.volume ?? 0;
          return {
            symbol: symbol,
            price: price,
            volume: volume,
            security: companyRow[1] as string,
            subIndustry: companyRow[3] as string,
            headquarters: companyRow[4] as string,
            founded: companyRow[7] as string,
          };
        });

        const watchlist = symbols;

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
            STM: STM || 0 ,
            LTM: LTM || 0,
          };
        });
        // const topSTM = [...filteredData]
        //   .sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0));
        //  .slice(0, 16);
        setData({
          filterData,
          assetData,
          watchlist,
          combinedDataPreview: { columns: combinedDataPreviewColumns, data: combinedDataPreview },
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
  const percentile1D = priceChangeData.filter(x => x['1D'] <= symbolData['1D']).length / 507;
  const percentile5D = priceChangeData.filter(x => x['5D'] <= symbolData['5D']).length / 507;
  const percentile1M = priceChangeData.filter(x => x['1M'] <= symbolData['1M']).length / 507;
  const momentum = ((percentile1D * 0.6) + (percentile5D * 1.5) + (percentile1M * 0.9)) / 3;
  return parseFloat(momentum.toFixed(2));
}

function calcLTM(symbol: string, priceChangeData: PriceChange[]): number {
  const symbolData = priceChangeData.find(pc => pc.symbol === symbol);
  if (!symbolData) {
    console.error(`Symbol not found in priceChangeData: ${symbol}`);
    return 0;
  }
  const percentile1D = priceChangeData.filter(x => x['1Y'] <= symbolData['1Y']).length / 507;
  const percentile5D = priceChangeData.filter(x => x['3Y'] <= symbolData['3Y']).length / 507;
  const percentile1M = priceChangeData.filter(x => x['5Y'] <= symbolData['5Y']).length / 507;
  const momentum = ((percentile1D * 0.85) + (percentile5D * 1.25) + (percentile1M * 0.95)) / 3;
  return parseFloat(momentum.toFixed(2));
}