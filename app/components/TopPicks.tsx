import React, { useState } from 'react';
import { useData } from '../context/DataContext';
// import { FaChevronDown } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
    sectorSelect: string;
    view: string;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect, sectorSelect, view }) => {

    const data = useData();
    const assets = data?.filterData;

    const [sym, setSym] = useState(' '); // selected ticker
    // const [view, setView] = useState('Both'); // both, stm, ltm

    // const [sectorSort, setSector] = useState('All Stocks');
    // const sectors = ["All Stocks", "Watchlist", "Health Care", "Information Technology", "Materials", "Communication Services", "Utilities",
    //     "Financials", "Consumer Staples", "Energy", "Industrials", "Real Estate", "Consumer Discretionary"];

    // const watchlist = ["NVDA", "SMCI", "KEYS"];
    // const [sel, setSelected] = useState(true);

    if (!data) {
        return (
            <div className='flex flex-col'>
                <div className='flex flex-row gap-4 rounded-full bg-[#DCF367] py-1 px-2'>
                    <p>API key</p>
                    <input id="key" name="key" className='rounded'></input>
                </div>
            </div>
        );
    }

    if (!data.filterData) { return <div>Loading...</div>; }

    let assetsToDisplay;

    if (sectorSelect !== 'All Stocks') {
        assetsToDisplay = assets?.filter(item => (item.sector === sectorSelect));
    }
    else assetsToDisplay = assets;

    const topSTM = (view === 'Both') ? assetsToDisplay?.sort((a, b) => (b.STM + b.LTM) - (a.STM + a.LTM))
        : (view === 'STM') ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
            : (view === 'LTM') ? assetsToDisplay?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0))
                : (view === '1D') ? assetsToDisplay?.sort((a, b) => (Number(b['1D']) + Number(b['1D'])) - (Number(a['1D']) + Number(a['1D'])))
                    : (view === '1M') ? assetsToDisplay?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
                        : (view === '1Y') ? assetsToDisplay?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
                            : (view === '5D') ? assetsToDisplay?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
                                : (view === '3Y') ? assetsToDisplay?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
                                    : (view === 'max') ? assetsToDisplay?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
                                        : assetsToDisplay?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])));

    return (
        <div className='flex flex-col place-content-start text-[#141414] sm:w-fit lg:w-[1060px]'>

            <section className='flex flex-row flex-wrap gap-0.5 pb-6 sm:pb-6 lg:pb-2'>
                {topSTM?.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 shrink cursor-pointer content-center justify-center sm:min-w-0 lg:min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                            hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#141414]

                        ${(sym === row.symbol) ? 'border-[#141414] text-[#F2F1EF] bg-[#141414]'
                        : ((row.STM < 0.1 && row.LTM >= 0.9) && view == 'Both') ? 'border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]'
                        : ((row.STM >= 0.9 && row.LTM < 0.1) && view == 'Both') ? 'border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]'

                        : (((row.STM + row.LTM >= 1.8) && view == 'Both') || (row.STM >= 0.9 && view === 'STM') || (row.LTM >= 0.9 && view === 'LTM')) ? 'btnGreenT1'
                        : (((row.STM + row.LTM >= 1.6) && view === 'Both') || (row.STM >= 0.8 && view === 'STM') || (row.LTM >= 0.8 && view === 'LTM')) ? 'btnGreenT2'
                        : ( ((row.STM + row.LTM >= 1.3) && view === 'Both') || (row.STM >= 0.65 && view === 'STM') || (row.LTM >= 0.65 && view === 'LTM')) ? 'btnGreenT3'
                        : ( ((row.STM + row.LTM >= 1.0) && view === 'Both') || (row.STM >= 0.5 && view === 'STM') || (row.LTM >= 0.5 && view === 'LTM')) ? 'btnWhiteT1'
                        : ( ((row.STM + row.LTM >= 0.7) && view === 'Both') || (row.STM >= 0.35 && view === 'STM') || (row.LTM >= 0.35 && view === 'LTM')) ? 'btnWhiteT2'
                        : ( ((row.STM + row.LTM >= 0.2) && view === 'Both') || (row.STM >= 0.1 && view === 'STM') || (row.LTM >= 0.1 && view === 'LTM')) ? 'btnRedT2'
                        : ( ((row.STM + row.LTM < 0.2) && view === 'Both') || (row.STM < 0.1 && view === 'STM') || (row.LTM < 0.1 && view === 'LTM')) ? 'btnRedT1'

                        : (Number(row[view as keyof typeof row]) >= 10) ? 'btnGreenT1'
                        : (Number(row[view as keyof typeof row]) <= -10) ? 'btnRedT1'
                        : (Number(row[view as keyof typeof row]) >= 3) ? 'btnGreenT2'
                        : (Number(row[view as keyof typeof row]) <= -3) ? 'btnRedT2'
                        : (Number(row[view as keyof typeof row]) >= 0) ? 'btnWhiteT1'
                        : (Number(row[view as keyof typeof row]) < 0) ? 'btnWhiteT2'
                        
                        : 'border-[#CAC8C7] bg-[#E1DFDD]'}
                        `}>

                        <p >{row.symbol}</p>

                        {/* <div className={`flex flex-row gap-1 
                            ${(filterSelection == 'Momentum' && sym === row.symbol) ? '' : 'hidden'} `}>
                            <p >{row.STM}</p>
                            <p className="font-bold content-center text-xs">S</p>
                        </div>

                        <div className={`flex flex-row gap-1 
                            ${(filterSelection == 'Momentum' && sym === row.symbol) ? '' : 'hidden'} `}>
                            <p >{row.LTM}</p>
                            <p className="font-bold content-center text-xs">L</p>
                        </div> */}

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

export default TopPicks;