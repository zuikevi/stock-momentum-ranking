import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import _ from 'lodash';

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
  STM: number | undefined;
  LTM: number | undefined;
  dayChange: string;
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

const API_KEY = "OWzcq3yTKmmXKnSxFKJ3Vgek5RknFNiM";
const stocksStr = 'A,AAL,AAPL,ABBV,ABNB,ABT,ACGL,ACN,ADBE,ADI,ADM,ADP,ADSK,AEE,AEP,AES,AFL,AIG,AIZ,AJG,AKAM,ALB,ALGN,ALL,ALLE,AMAT,AMCR,AMD,AME,AMGN,AMP,AMT,AMZN,ANET,ANSS,AON,AOS,APA,APD,APH,APTV,ARE,ATO,AVB,AVGO,AVY,AWK,AXON,AXP,AZO,BA,BAC,BALL,BAX,BBWI,BBY,BDX,BEN,BG,BIIB,BIO,BK,BKNG,BKR,BLDR,BLK,BMY,BR,BRO,BSX,BWA,BX,BXP,C,CAG,CAH,CARR,CAT,CB,CBOE,CBRE,CCI,CCL,CDNS,CDW,CE,CEG,CF,CFG,CHD,CHRW,CHTR,CI,CINF,CL,CLX,CMCSA,CME,CMG,CMI,CMS,CNC,CNP,COF,COO,COP,COR,COST,CPAY,CPB,CPRT,CPT,CRL,CRM,CRWD,CSCO,CSGP,CSX,CTAS,CTLT,CTRA,CTSH,CTVA,CVS,CVX,CZR,D,DAL,DAY,DD,DE,DECK,DFS,DG,DGX,DHI,DHR,DIS,DLR,DLTR,DOC,DOV,DOW,DPZ,DRI,DTE,DUK,DVA,DVN,DXCM,EA,EBAY,ECL,ED,EFX,EG,EIX,EL,ELV,EMN,EMR,ENPH,EOG,EPAM,EQIX,EQR,EQT,ES,ESS,ETN,ETR,ETSY,EVRG,EW,EXC,EXPD,EXPE,EXR,F,FANG,FAST,FCX,FDS,FDX,FE,FFIV,FI,FICO,FIS,FITB,FMC,FOX,FOXA,FRT,FSLR,FTNT,FTV,GD,GDDY,GE,GEHC,GEN,GEV,GILD,GIS,GL,GLW,GM,GNRC,GOOG,GOOGL,GPC,GPN,GRMN,GS,GWW,HAL,HAS,HBAN,HCA,HD,HES,HIG,HII,HLT,HOLX,HON,HPE,HPQ,HRL,HSIC,HST,HSY,HUBB,HUM,HWM,IBM,ICE,IDXX,IEX,IFF,INCY,INTC,INTU,INVH,IP,IPG,IQV,IR,IRM,ISRG,IT,ITW,IVZ,J,JBHT,JBL,JCI,JKHY,JNJ,JNPR,JPM,K,KDP,KEY,KEYS,KHC,KIM,KKR,KLAC,KMB,KMI,KMX,KO,KR,KVUE,L,LDOS,LEN,LH,LHX,LIN,LKQ,LLY,LMT,LNT,LOW,LRCX,LULU,LUV,LVS,LW,LYB,LYV,MA,MAA,MAR,MAS,MCD,MCHP,MCK,MCO,MDLZ,MDT,MET,META,MGM,MHK,MKC,MKTX,MLM,MMC,MMM,MNST,MO,MOH,MOS,MPC,MPWR,MRK,MRNA,MRO,MS,MSCI,MSFT,MSI,MTB,MTCH,MTD,MU,NCLH,NDAQ,NDSN,NEE,NEM,NFLX,NI,NKE,NOC,NOW,NRG,NSC,NTAP,NTRS,NUE,NVDA,NVR,NWS,NWSA,NXPI,O,ODFL,OKE,OMC,ON,ORCL,ORLY,OTIS,OXY,PANW,PARA,PAYC,PAYX,PCAR,PCG,PEG,PEP,PFE,PFG,PG,PGR,PH,PHM,PKG,PLD,PM,PNC,PNR,PNW,PODD,POOL,PPG,PPL,PRU,PSA,PSX,PTC,PWR,PYPL,QCOM,QRVO,RCL,REG,REGN,RF,RJF,RL,RMD,ROK,ROL,ROP,ROST,RSG,RTX,RVTY,SBAC,SBUX,SCHW,SHW,SJM,SLB,SMCI,SNA,SNPS,SO,SOLV,SPG,SPGI,SRE,STE,STLD,STT,STX,STZ,SW,SWK,SWKS,SYF,SYK,SYY,T,TAP,TDG,TDY,TECH,TEL,TER,TFC,TFX,TGT,TJX,TMO,TMUS,TPR,TRGP,TRMB,TROW,TRV,TSCO,TSLA,TSN,TT,TTWO,TXN,TXT,TYL,UAL,UBER,UDR,UHS,ULTA,UNH,UNP,UPS,URI,USB,V,VICI,VLO,VLTO,VMC,VRSK,VRSN,VRTX,VST,VTR,VTRS,VZ,WAB,WAT,WBA,WBD,WDC,WEC,WELL,WFC,WM,WMB,WMT,WRB,WST,WTW,WY,WYNN,XEL,XOM,XYL,YUM,ZBH,ZBRA,ZTS';

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
          const dayChange = priceChange?.['1D'] || 0;

          return {
            symbol: symbol,
            sector: companyRow[2] as string,
            STM: calcSTM(symbol, priceChangeData),
            LTM: calcLTM(symbol, priceChangeData),
            dayChange: dayChange.toFixed(2),
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

        const excludeFirstTwoColumns = (combinedDataPreview: any[]) =>
          combinedDataPreview.map(({ security, sector, price, ...rest }) => rest);

        const filteredData = excludeFirstTwoColumns(combinedDataPreview);

        const topSTM = [...filteredData]
          .sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0));
        // .slice(0, 16);

        const topLTM = [...filteredData]
          .sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0))
          .slice(0, 16);

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