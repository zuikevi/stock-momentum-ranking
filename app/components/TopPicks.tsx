import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaChevronDown } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.filterData;

    const [sym, setSym] = useState(' '); // selected ticker

    const [filterSelection, setFilterSelection] = useState('Momentum'); // momentum or price change

    const [sortSelection, setSortSelection] = useState('Both'); // both, stm, ltm
    const [momentum, setMomentum] = useState(0.8); //momentum


    const [sectorSort, setSector] = useState('All');
    const sectors = ["All", "Watchlist", "Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials",
        "Health Care", "Industrials", "Information Technology", "Materials", "Real Estate", "Utilities"];

    const watchlist = ["NVDA", "SMCI", "KEYS"];



    const [sel, setSelected] = useState(true);

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
    else if (momentum < 0.5) {
        assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! <= momentum && item.LTM! <= momentum && item.STM! > momentum - 0.1 && item.LTM! > momentum - 0.1))
            : sortSelection === 'STM' ? assets?.filter(item => item.STM! <= momentum)
                : assets?.filter(item => item.LTM! <= momentum);
    }
    else if (momentum >= 0.9) {
        assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! >= momentum && item.LTM! >= momentum))
            : sortSelection === 'STM' ? assets?.filter(item => item.STM! >= momentum)
                : assets?.filter(item => item.LTM! >= momentum);
    }
    else {
        assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! >= momentum && item.LTM! >= momentum && item.STM! < momentum + 0.1 && item.LTM! < momentum + 0.1))
            : sortSelection === 'STM' ? assets?.filter(item => item.STM! >= momentum && item.STM! < momentum + 0.1)
                : assets?.filter(item => item.LTM! >= momentum && item.LTM! < momentum + 0.1);
    }

    if (sectorSort !== 'All') {
        assetsToDisplay = assetsToDisplay?.filter(item => (item.sector === sectorSort));
    }

    const topSTM = sortSelection === 'Both' ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
        : sortSelection === 'STM' ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
            : assetsToDisplay?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0));


    return (
        <div className='flex flex-col place-content-start text-[#141414] lg:min-w-[1060px]'>

            <section className='flex flex-row gap-3 p-1 font-semibold text-sm'>

                {['Momentum', 'Price Change'].map((option) => (
                    <button
                        key={option}
                        type="button"
                        id={`filter-${option.toLowerCase()}`}
                        aria-pressed={filterSelection === option}
                        aria-labelledby={`filter-${option.toLowerCase()}`}
                        onClick={() => setFilterSelection(option)}
                        className={`${filterSelection === option ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                    >
                        {option}
                    </button>
                ))}

                <p className='text-[#CAC8C7]'>|</p>

                <div className={`flex flex-row gap-3 ${filterSelection == 'Momentum' ? '' : 'hidden'}`}>

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

                    {[0.9, 0.8, 0.7, 0.2, 0.1, 0].map((value) => (
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
                </div>

                <div className={`flex flex-row gap-3 ${filterSelection == 'Price Change' ? '' : 'hidden'}`}>

                    {['1D', '5D', '1M', '1Y', '3Y', '5Y'].map((option) => (
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
                </div>


                {/* <p className='text-[#CAC8C7]'>|</p> */}

                {/* <button
                    onClick={() => setSelected(true)}
                    className="flex flex-row">
                    <p className='pr-1'>{sectorSort}</p>
                    <FaChevronDown size={12} className="content-center mt-1 z-50" />
                </button> */}

                <div className={`absolute left-60 text-xs text-nowrap cursor-pointer z-40 w-[180px]`}>
                    <div className='relative flex flex-col'>
                        {sectors?.map((sector) => (
                            <button
                                key={sector}
                                onClick={() => { setSelected(true); setSector(sector); }}
                                className={`text-left px-1 py-1 rounded-md hover:bg-[#E7E3DC] ${sectorSort == sector ? 'border-[#C2D75B] bg-[#DCF367]' : ''}`}>
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
                        className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 

                        ${(filterSelection == 'Momentum' && row.STM! >= 0.8 && row.LTM! >= 0.8) ? 'border-[#C2D75B] bg-[#DCF367]' :
                          (filterSelection == 'Momentum' && (row.STM! >= 0.8 || row.LTM! >= 0.8)) ? 'border-[#BACC5D] bg-[#C9DD66]' :
                          (filterSelection == 'Momentum' && row.STM! <= 0.2 && row.LTM! <= 0.2) ? 'border-[#C14F38] bg-[#E25B40]' :

                          (filterSelection == 'Price Change' && Number(row.dayChange) >= 6) ? 'border-[#C2D75B] bg-[#DCF367]' :
                          (filterSelection == 'Price Change' && Number(row.dayChange) >= 3) ? 'border-[#BACC5D] bg-[#C9DD66]' :
                          (filterSelection == 'Price Change' && Number(row.dayChange) <= -3) ? 'border-[#C14F38] bg-[#E25B40]' :
                                        'border-[#CAC8C7] bg-[#E1DFDD]'}
                        `}>

                        <p> {row.symbol}</p>

                        <div className={`flex flex-row gap-1 ${filterSelection == 'Momentum' && (row.STM! >= 0.8 || sym === row.symbol) ? '' : 'hidden'} `}>
                            <p >{row.STM}</p>
                            <p className="text-[#141414] font-bold content-center text-xs">S</p>
                        </div>

                        <div className={`flex flex-row gap-1 ${filterSelection == 'Momentum' && (row.LTM! >= 0.8 || sym === row.symbol) ? '' : 'hidden'} `}>
                            <p >{row.LTM}</p>
                            <p className="text-[#141414] font-bold content-center text-xs">L</p>
                        </div>

                        <div className={`flex flex-row gap-1 ${filterSelection == 'Price Change' && Math.abs(Number(row.dayChange)) >= 3 ? '' : 'hidden'} `}>
                            <p >{row.dayChange}</p>
                        </div>
                    </button>
                ))}
            </section>

            {/* <section className='flex flex-row flex-wrap gap-1 pb-6 sm:pb-6 lg:pb-2'>
                {topSTM?.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 cursor-pointer min-w-24 justify-center font-semibold text-sm px-2 rounded-md border border-1 
                        ${sym == row.symbol ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>

                        <div className='flex flex-col content-center leading-tight p-1'>
                            <p className='content-center'> {row.symbol}</p>
                            <p>{row.STM} / {row.LTM}</p>
                        </div>


                    </button>
                ))}
            </section> */}

        </div>
    );
}

export default TopPicks;

// function filterAssets(data: string, momentum: number): number {
//     if(momentum >= 0.9){

//     }
//     return 0;
//   }