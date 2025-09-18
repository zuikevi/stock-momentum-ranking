import React, { useState } from 'react';
import { useData } from '../context/DataContext';

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

interface StocksByTagProps {
    onSymbolSelect: (symbol: string) => void;
    tagText: string;
    assetsToDisplay: FilterData[] | undefined;
    view: string;
}

const StocksByTag: React.FC<StocksByTagProps> = ({ onSymbolSelect, tagText, assetsToDisplay, view }) => {

    const data = useData();
    const [sym, setSym] = useState(' ');
    if (!data) { return <div>Loading...</div>; }
    if (!data.filterData) { return <div>Loading...</div>; }

    const topSTM = (view === 'Both') ? assetsToDisplay?.sort((a, b) => (b.STM + b.LTM) - (a.STM + a.LTM))
        : (view === 'STM') ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
        : (view === 'LTM') ? assetsToDisplay?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0))
        : assetsToDisplay?.sort((a, b) => Number(b[view as keyof typeof b]) - Number(a[view as keyof typeof a]));

    return (
        <div className='flex flex-col place-content-start text-[#FFFFFF] sm:w-fit lg:w-[600px]'>
            <p className='font-semibold text-sm'>{tagText}</p>
            <section className='flex flex-row flex-wrap pb-6 sm:pb-6 lg:pb-2 gap-0.5'>
                {topSTM?.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 shrink cursor-pointer content-center justify-center sm:min-w-0 lg:min-w-4 font-semibold text-sm px-2 rounded-md border border-1 
                            hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#141414]

                        ${(sym === row.symbol) ? 'border-[#141414] text-[#F2F1EF] bg-[#141414]'
                        : ((row.STM < 0.1 && row.LTM >= 0.9) && view == 'Both') ? 'border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]'
                        : ((row.STM >= 0.9 && row.LTM < 0.1) && view == 'Both') ? 'border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]'

                        : (((row.STM + row.LTM >= 1.8) && view == 'Both') || (row.STM >= 0.9 && view === 'STM') || (row.LTM >= 0.9 && view === 'LTM')) ? 'btnBlueThemeT1'
                        : (((row.STM + row.LTM >= 1.6) && view === 'Both') || (row.STM >= 0.8 && view === 'STM') || (row.LTM >= 0.8 && view === 'LTM')) ? 'btnBlueThemeT2'
                        : ( ((row.STM + row.LTM >= 1.3) && view === 'Both') || (row.STM >= 0.65 && view === 'STM') || (row.LTM >= 0.65 && view === 'LTM')) ? 'btnBlueThemeT3'
                        : ( ((row.STM + row.LTM >= 1.0) && view === 'Both') || (row.STM >= 0.5 && view === 'STM') || (row.LTM >= 0.5 && view === 'LTM')) ? 'btnBlueThemeWhiteT1'
                        : ( ((row.STM + row.LTM >= 0.7) && view === 'Both') || (row.STM >= 0.35 && view === 'STM') || (row.LTM >= 0.35 && view === 'LTM')) ? 'btnWhiteT2'
                        : ( ((row.STM + row.LTM >= 0.2) && view === 'Both') || (row.STM >= 0.1 && view === 'STM') || (row.LTM >= 0.1 && view === 'LTM')) ? 'btnRedT2'
                        : ( ((row.STM + row.LTM < 0.2) && view === 'Both') || (row.STM < 0.1 && view === 'STM') || (row.LTM < 0.1 && view === 'LTM')) ? 'btnRedT1'

                        : (Number(row[view as keyof typeof row]) >= 10) ? 'btnBlueThemeT1'
                        : (Number(row[view as keyof typeof row]) <= -10) ? 'btnRedT1'
                        : (Number(row[view as keyof typeof row]) >= 3) ? 'btnBlueThemeT2'
                        : (Number(row[view as keyof typeof row]) <= -3) ? 'btnRedT2'
                        : (Number(row[view as keyof typeof row]) >= 0) ? 'btnBlueThemeWhiteT1'
                        : (Number(row[view as keyof typeof row]) < 0) ? 'btnWhiteT2'
                        
                        : 'border-[#CAC8C7] bg-[#E1DFDD]'}
                        `}>

                        <p >{row.symbol}</p>

                        <div className={`flex flex-row gap-1 
                            ${view == '1D' && Math.abs(Number(row['1D'])) >= 3 ? '' : 'hidden'} `}>
                            <p >{row['1D']}</p>
                        </div>
                    </button>
                ))}
            </section>

        </div>
    );
}

export default StocksByTag;