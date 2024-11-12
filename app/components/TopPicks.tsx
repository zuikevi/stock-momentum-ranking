import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaChevronDown } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.filterData;

    const [sym, setSym] = useState(' ');
    const [momentum, setMomentum] = useState(0.8);
    const [sortSelection, setSortSelection] = useState('Both');

    const [sectorSort, setSector] = useState('sector');
    const sectors = ["sector", "Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials",
        "Health Care", "Industrials", "Information Technology", "Materials", "Real Estate", "Utilities"];

    const [sel, setSelected] = useState(false);

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

    if (momentum < 0.5) {
        assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! <= momentum && item.LTM! <= momentum))
            : sortSelection === 'STM' ? assets?.filter(item => item.STM! <= momentum)
                : assets?.filter(item => item.LTM! <= momentum);
    }
    else {
        assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! >= momentum && item.LTM! >= momentum && item.STM! < momentum + 0.1 && item.LTM! < momentum + 0.1))
            : sortSelection === 'STM' ? assets?.filter(item => item.STM! >= momentum && item.STM! < momentum + 0.1)
                : assets?.filter(item => item.LTM! >= momentum && item.LTM! < momentum + 0.1);
    }

    if (sectorSort !== 'sector') {
        assetsToDisplay = assetsToDisplay?.filter(item => (item.sector === sectorSort));
    }

    const topSTM = sortSelection === 'Both' ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
        : sortSelection === 'STM' ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
            : assetsToDisplay?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0));


    return (
        <div className='flex flex-col place-content-start text-[#141414]'>

            <section className='flex flex-row gap-3 p-1 font-semibold text-sm'>

                {['Both', 'STM', 'LTM'].map((option) => (
                    <button
                        key={option}
                        type="button"
                        id={`sort-${option.toLowerCase()}`}
                        aria-pressed={sortSelection === option}
                        aria-labelledby={`sort-${option.toLowerCase()}`}
                        onClick={() => setSortSelection(option)}
                        className={`${sortSelection === option ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                    >
                        {option}
                    </button>
                ))}

                <p className='text-[#CAC8C7]'>|</p>

                {[0.9, 0.8, 0.7, 0.1].map((value) => (
                    <button
                        key={value}
                        type="button"
                        id={`momentum-${value}`}
                        aria-pressed={momentum === value}
                        aria-labelledby={`momentum-${value}`}
                        onClick={() => setMomentum(value)}
                        className={`${momentum === value ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                    >
                        {value}
                    </button>
                ))}

                <p className='text-[#CAC8C7]'>|</p>

                <button
                    onClick={() => setSelected(true)}
                    className="flex flex-row">
                    <p className='pr-1'>{sectorSort}</p>
                    <FaChevronDown size={12} className="content-center mt-1 z-50" />
                </button>

                <div className={`absolute text-xs text-nowrap cursor-pointer z-40 pt-6 w-[600px] ${sel ? '' : 'hidden'} `}>
                    <div className='relative flex flex-row flex-wrap gap-1 p-1 bg-[#E3E3E2] shadow-inner rounded-md border border-1 border-[#CAC8C7]'>
                        {sectors.map((sector) => (
                            <button
                                key={sector}
                                onClick={() => { setSelected(false); setSector(sector); }}
                                className="text-left px-1 py-1 bg-white rounded-md">
                                {sector}
                            </button>
                        ))}
                    </div>
                </div>
            </section>


            <section className='flex flex-row flex-wrap gap-1 pb-6 sm:pb-6 lg:pb-2'>
                {topSTM?.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 cursor-pointer font-semibold text-sm px-2 rounded-full border border-1 
                        ${sym == row.symbol ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>

                        <p> {row.symbol}</p>

                        <div className={`flex flex-row gap-1 ${sym == row.symbol ? '' : 'hidden'} `}>
                            <p >{row.STM}</p>
                            <p className="text-[#141414] font-bold content-center text-xs">STM</p>
                        </div>

                        <div className={`flex flex-row gap-1 ${sym == row.symbol ? '' : 'hidden'} `}>
                            <p >{row.LTM}</p>
                            <p className="text-[#141414] font-bold content-center text-xs">LTM</p>
                        </div>
                    </button>
                ))}
            </section>

        </div>
    );
}

export default TopPicks;