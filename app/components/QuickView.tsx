import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface QuickViewProps {
    onSymbolSelect: (symbol: string) => void;
}

const QuickView: React.FC<QuickViewProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.filterData;
    const momentum = 0;

    const [sym, setSym] = useState(' ');

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
    if (momentum === 0) {
        assetsToDisplay = assets;
    }

    const topSTM = assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0));

    const lowRisk = topSTM?.filter(item => (item.STM >= 0.9 && item.LTM >= 0.9)).slice(0, 2);
    const longtermOpportunity = topSTM?.filter(item => (item.STM <= 0.3 && item.LTM >= 0.9)).slice(0, 2);
    const risky = topSTM?.filter(item => (item.STM >= 0.9 && item.LTM < 0.3)).slice(0, 2);

    return (
        <div className='flex flex-col place-content-start text-[#141414] lg:w-[980px]'>
            <section className='flex flex-row flex-wrap gap-1 pb-6 sm:pb-6 lg:pb-2'>
                {lowRisk!.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                            ${(sym === row.symbol) ? 'border-none bg-[#F2F1EF] underline underline-offset-4' : 'border-[#C2D75B] bg-[#DCF367]'} `}>

                        <p>{row.symbol}</p>
                    </button>
                ))}

                {longtermOpportunity!.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1
                            ${(sym === row.symbol) ? 'border-none bg-[#F2F1EF] underline underline-offset-4' : 'border-[#C14F38] bg-[#E1B3A9]'} `}>

                        <p>{row.symbol}</p>
                    </button>
                ))}

                {risky!.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                        ${(sym === row.symbol) ? 'border-none bg-[#F2F1EF] underline underline-offset-4' : 'border-[#C2D75B] bg-[#DCF367]'} `}>

                        <p>{row.symbol}</p>
                    </button>
                ))}
            </section>
        </div>
    );
}

export default QuickView;