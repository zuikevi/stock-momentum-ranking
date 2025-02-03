import React, { useState } from 'react';
import { useData } from '../context/DataContext';
// import { FaChevronDown } from "react-icons/fa";

interface TierListProps {
    onSymbolSelect: (symbol: string) => void;
}

const TierList: React.FC<TierListProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.filterData;
    const momentum = 0;

    const [sym, setSym] = useState(' '); // selected ticker

    const [filterSelection, setFilterSelection] = useState('Momentum'); // momentum or price change

    const [sortSelection, setSortSelection] = useState('Both'); // both, stm, ltm
    // const [momentum, setMomentum] = useState(0.8); //momentum

    const [sortPriceChange, setSortPriceChange] = useState('1D'); // both, stm, ltm


    const [sectorSort, setSector] = useState('All');
    const sectors = ["All", "Watchlist", "Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials",
        "Health Care", "Industrials", "Information Technology", "Materials", "Real Estate", "Utilities"];

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
    if (momentum === 0) {
        assetsToDisplay = assets;
    }
    // else if (momentum < 0.5) {
    //     assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! <= momentum && item.LTM! <= momentum && item.STM! > momentum - 0.1 && item.LTM! > momentum - 0.1))
    //         : sortSelection === 'STM' ? assets?.filter(item => item.STM! <= momentum)
    //             : assets?.filter(item => item.LTM! <= momentum);
    // }
    // else if (momentum >= 0.9) {
    //     assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! >= momentum && item.LTM! >= momentum))
    //         : sortSelection === 'STM' ? assets?.filter(item => item.STM! >= momentum)
    //             : assets?.filter(item => item.LTM! >= momentum);
    // }
    // else {
    //     assetsToDisplay = sortSelection === 'Both' ? assets?.filter(item => (item.STM! >= momentum && item.LTM! >= momentum && item.STM! < momentum + 0.1 && item.LTM! < momentum + 0.1))
    //         : sortSelection === 'STM' ? assets?.filter(item => item.STM! >= momentum && item.STM! < momentum + 0.1)
    //             : assets?.filter(item => item.LTM! >= momentum && item.LTM! < momentum + 0.1);
    // }

    if (sectorSort !== 'All') {
        assetsToDisplay = assetsToDisplay?.filter(item => (item.sector === sectorSort));
    }

    const topSTM = sortSelection === 'Both' ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
        : sortSelection === 'STM' ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
            : assetsToDisplay?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0));

    const top10 = topSTM?.filter(item => item.STM >= 0.9);
    const top20 = topSTM?.filter(item => (item.STM >= 0.8 && item.STM < 0.9));
    const top30 = topSTM?.filter(item => (item.STM >= 0.7 && item.STM < 0.8));
    const top40 = topSTM?.filter(item => (item.STM >= 0.6 && item.STM < 0.7));
    const point6 = topSTM?.filter(item => (item.STM >= 0.5 && item.STM < 0.6));
    const point5 = topSTM?.filter(item => (item.STM >= 0.4 && item.STM < 0.5));
    const point4 = topSTM?.filter(item => (item.STM >= 0.3 && item.STM < 0.4));
    const point3 = topSTM?.filter(item => (item.STM >= 0.2 && item.STM < 0.3));
    const point2 = topSTM?.filter(item => (item.STM >= 0.1 && item.STM < 0.2));
    const point1 = topSTM?.filter(item => (item.STM < 0.1));

    return (
        <div className='flex flex-col place-content-start text-[#141414] lg:w-[980px]'>

            <section className='flex flex-row gap-3 p-1 font-semibold text-sm'>

                {['Momentum', 'Price Change'].map((option) => (
                    <button
                        key={option}
                        type="button"
                        id={`filter-${option.toLowerCase()}`}
                        aria-pressed={filterSelection === option}
                        aria-labelledby={`filter-${option.toLowerCase()}`}
                        onClick={() => setFilterSelection(option)}
                        className={`text-nowrap ${filterSelection === option ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
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

                    {/* <p className='text-[#CAC8C7]'>|</p> */}

                    {/* {[0.9, 0.8, 0.7, 0.2, 0.1, 0].map((value) => (
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
                    ))} */}
                </div>

                <div className={`flex flex-row gap-3 ${filterSelection == 'Price Change' ? '' : 'hidden'}`}>

                    {['1D', '5D', '1M', '1Y', '3Y', '5Y'].map((option) => (
                        <button
                            key={option}
                            type="button"
                            id={`sort-${option}`}
                            aria-pressed={sortPriceChange === option}
                            aria-labelledby={`sort-${option}`}
                            onClick={() => setSortPriceChange(option)}
                            className={`${sortPriceChange === option ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* <p className='text-[#CAC8C7]'>|</p>

                <button
                    onClick={() => setSelected(true)}
                    className="flex flex-row">
                    <p className='pr-1 text-nowrap'>{sectorSort}</p>
                    <FaChevronDown size={12} className="content-center mt-1 z-50" />
                </button> */}

                <div className={`absolute left-60 text-xs text-nowrap cursor-pointer z-40 w-[180px]`}>
                    <div className='relative flex flex-col'>
                        {sectors?.map((sector) => (
                            <button
                                key={sector}
                                onClick={() => {setSector(sector); }}
                                className={`text-left px-1 py-1 rounded-md hover:bg-[#E7E3DC] ${sectorSort == sector ? 'border-[#C2D75B] bg-[#DCF367]' : ''}`}>
                                {sector}
                            </button>
                        ))}
                    </div>
                </div>

            </section>

            <section>
                <div className={`grid grid-cols-1 gap-y-4`}>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.9</p>
                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {top10?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
    
                            ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]'
                                            : (filterSelection == 'Momentum' && (row1.STM! >= 0.9)) ? 'border-[#BACC5D] bg-[#C9DD66]'
                                                : (filterSelection == 'Momentum' && (row1.LTM! >= 0.9)) ? 'border-[#5DCC88] bg-[#66DD94]'
                                                    : 'border-[#CAC8C7] bg-[#E1DFDD]'}
                            `}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.8</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {top20?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.7</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {top30?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.6</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {top40?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.5</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {point6?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.4</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {point5?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.3</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {point4?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.2</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {point3?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>0.1</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {point2?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`flex flex-row gap-3`}>
                        <p className='content-center font-semibold'>rest</p>

                        <div className={`flex flex-row flex-wrap gap-1`}>
                            {point1?.map((row1, index1) => (
                                <button
                                    key={index1}
                                    onClick={() => { setSym(row1.symbol), onSymbolSelect(row1.symbol) }}
                                    id={`asset-${row1.symbol}`}
                                    aria-labelledby={`asset-${row1.symbol}`}
                                    aria-pressed={sym === row1.symbol}
                                    className={`flex flex-row gap-3 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    ${(filterSelection == 'Momentum' && row1.STM! >= 0.9 && row1.LTM! >= 0.9) ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                                    <p>{row1.symbol}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </section>
            
        </div>
    );
}

export default TierList;