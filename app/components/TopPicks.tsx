import React, { useState } from 'react';
import { useData } from '../context/DataContext';
// import { FaChevronDown } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.filterData;

    const [sym, setSym] = useState(' '); // selected ticker

    const [filterSelection, setFilterSelection] = useState('Momentum'); // momentum or price change
    const [sortSelection, setSortSelection] = useState('Both'); // both, stm, ltm
    const [sortPriceChange, setSortPriceChange] = useState('1D'); // 1D, 5D, ..., 5Y

    const [filterSelect, setFilterSelect] = useState(false); // toggle filter

    const [sectorSort, setSector] = useState('All Stocks');
    const sectors = ["All Stocks", "Watchlist", "Health Care", "Information Technology", "Materials", "Communication Services", "Utilities",
        "Financials", "Consumer Staples", "Energy", "Industrials", "Real Estate", "Consumer Discretionary"];

    // const watchlist = ["NVDA", "SMCI", "KEYS"];
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

    if (sectorSort !== 'All Stocks') {
        assetsToDisplay = assets?.filter(item => (item.sector === sectorSort));
    }
    else assetsToDisplay = assets;

    const topSTM = (sortSelection === 'Both' && filterSelection == 'Momentum') ? assetsToDisplay?.sort((a, b) => (b.STM + b.LTM) - (a.STM + a.LTM))
        : (sortSelection === 'STM' && filterSelection == 'Momentum') ? assetsToDisplay?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
        : (sortSelection === 'LTM' && filterSelection == 'Momentum')? assetsToDisplay?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0))
        : (sortPriceChange === '1D' && filterSelection == 'Price Change') ? assetsToDisplay?.sort((a, b) => 
            (Number(b.dayChange) + Number(b.dayChange)) - (Number(a.dayChange) + Number(a.dayChange)))
        :(sortPriceChange === '1M' && filterSelection == 'Price Change') ? assetsToDisplay?.sort((a, b) => 
            (Number(b.monthChange) + Number(b.monthChange)) - (Number(a.monthChange) + Number(a.monthChange)))
        :(sortPriceChange === '1Y' && filterSelection == 'Price Change') ? assetsToDisplay?.sort((a, b) => 
            (Number(b.yearChange) + Number(b.yearChange)) - (Number(a.yearChange) + Number(a.yearChange)))
        :(sortPriceChange === '5D' && filterSelection == 'Price Change') ? assetsToDisplay?.sort((a, b) => 
            (Number(b.fiveDayChange) + Number(b.fiveDayChange)) - (Number(a.fiveDayChange) + Number(a.fiveDayChange)))
        :(sortPriceChange === '3Y' && filterSelection == 'Price Change') ? assetsToDisplay?.sort((a, b) => 
            (Number(b.threeYearChange) + Number(b.threeYearChange)) - (Number(a.threeYearChange) + Number(a.threeYearChange)))
        :(sortPriceChange === 'max' && filterSelection == 'Price Change') ? assetsToDisplay?.sort((a, b) => 
            (Number(b.maxChange) + Number(b.maxChange)) - (Number(a.maxChange) + Number(a.maxChange)))
        :assetsToDisplay?.sort((a, b) => (Number(b.fiveYearChange) + Number(b.fiveYearChange)) - (Number(a.fiveYearChange) + Number(a.fiveYearChange)));

    return (
        <div className='flex flex-col place-content-start text-[#141414] lg:w-[980px]'>

            <div className={`relative text-xs text-nowrap cursor-pointer z-40 font-semibold ${sel === true ? '' : 'hidden'}`}>
                <div className='absolute flex flex-col gap-1 pb-2 -left-56 top-10'>
                    {sectors?.map((sector) => (
                        <button
                            key={sector}
                            onClick={() => { setSector(sector), setSelected(true), setFilterSelect(!filterSelect)}}
                            className={`flex flex-col gap-1 text-left font-semibold text-sm px-2 rounded-full border border-1 ${sectorSort == sector ? 'border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]' 
                            : ' border-[#B1B1B1] bg-[#E4E4E4] text-[#B1B1B1]'}`}>
                            {sector}
                        </button>
                    ))}
                </div>
            </div>

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
                </div>

                <div className={`flex flex-row gap-3 ${filterSelection == 'Price Change' ? '' : 'hidden'}`}>
                    {['1D', '5D', '1M', '1Y', '3Y', '5Y', 'max'].map((option) => (
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
            </section>

            <section className='flex flex-row flex-wrap gap-1 pb-6 sm:pb-6 lg:pb-2'>
                {topSTM?.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 shrink cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                            hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#141414]

                        ${(sym === row.symbol) ? 'border-[#141414] text-[#F2F1EF] bg-[#141414]'
                        : (filterSelection == 'Momentum' && (row.STM < 0.1 && row.LTM >= 0.9) && sortSelection == 'Both') ? 'border-[#3C98BF] text-[#3C98BF] bg-[#AAD2E0]'
                        : (filterSelection == 'Momentum' && (row.STM >= 0.9 && row.LTM < 0.1) && sortSelection == 'Both') ? 'border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM >= 1.8) && sortSelection == 'Both') ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Momentum' && row.STM >= 0.9 && sortSelection === 'STM') ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Momentum' && row.LTM >= 0.9 && sortSelection === 'LTM') ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM >= 1.6) && sortSelection === 'Both') ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Momentum' && row.STM >= 0.8 && sortSelection === 'STM') ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Momentum' && row.LTM >= 0.8 && sortSelection === 'LTM') ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM >= 1.3) && sortSelection === 'Both') ? 'border-[#99A233] text-[#99A233] bg-[#DFE0B7]'
                        : (filterSelection == 'Momentum' && row.STM >= 0.65 && sortSelection === 'STM') ? 'border-[#99A233] text-[#99A233] bg-[#DFE0B7]'
                        : (filterSelection == 'Momentum' && row.LTM >= 0.65 && sortSelection === 'LTM') ? 'border-[#99A233] text-[#99A233] bg-[#DFE0B7]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM >= 1.0) && sortSelection === 'Both') ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Momentum' && row.STM >= 0.5 && sortSelection === 'STM') ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Momentum' && row.LTM >= 0.5 && sortSelection === 'LTM') ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM >= 0.7) && sortSelection === 'Both') ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'
                        : (filterSelection == 'Momentum' && row.STM >= 0.35 && sortSelection === 'STM') ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'
                        : (filterSelection == 'Momentum' && row.LTM >= 0.35 && sortSelection === 'LTM') ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM >= 0.2) && sortSelection === 'Both') ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Momentum' && row.STM >= 0.1 && sortSelection === 'STM') ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Momentum' && row.LTM >= 0.1 && sortSelection === 'LTM') ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'

                        : (filterSelection == 'Momentum' && (row.STM + row.LTM < 0.2) && sortSelection === 'Both') ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Momentum' && row.STM < 0.1 && sortSelection === 'STM') ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Momentum' && row.LTM < 0.1 && sortSelection === 'LTM') ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'

                        : (filterSelection == 'Price Change' && sortPriceChange == '1D' && Number(row.dayChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1D' && Number(row.dayChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1D' && Number(row.dayChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1D' && Number(row.dayChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1D' && Number(row.dayChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1D' && Number(row.dayChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Price Change' && sortPriceChange == '1M' && Number(row.monthChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1M' && Number(row.monthChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1M' && Number(row.monthChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1M' && Number(row.monthChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1M' && Number(row.monthChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1M' && Number(row.monthChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Price Change' && sortPriceChange == '1Y' && Number(row.yearChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1Y' && Number(row.yearChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1Y' && Number(row.yearChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1Y' && Number(row.yearChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1Y' && Number(row.yearChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '1Y' && Number(row.yearChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Price Change' && sortPriceChange == '5Y' && Number(row.fiveYearChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5Y' && Number(row.fiveYearChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5Y' && Number(row.fiveYearChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5Y' && Number(row.fiveYearChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5Y' && Number(row.fiveYearChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5Y' && Number(row.fiveYearChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Price Change' && sortPriceChange == '5D' && Number(row.fiveDayChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5D' && Number(row.fiveDayChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5D' && Number(row.fiveDayChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5D' && Number(row.fiveDayChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5D' && Number(row.fiveDayChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '5D' && Number(row.fiveDayChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Price Change' && sortPriceChange == '3Y' && Number(row.threeYearChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '3Y' && Number(row.threeYearChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '3Y' && Number(row.threeYearChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '3Y' && Number(row.threeYearChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '3Y' && Number(row.threeYearChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == '3Y' && Number(row.threeYearChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'

                        : (filterSelection == 'Price Change' && sortPriceChange == 'max' && Number(row.maxChange) >= 10) ? 'border-[#DFE6B9] text-[#F2F1EF] bg-[#94AE32]'
                        : (filterSelection == 'Price Change' && sortPriceChange == 'max' && Number(row.maxChange) <= -10) ? 'border-[#E0B3AA] text-[#F2F1EF] bg-[#BF503C]'
                        : (filterSelection == 'Price Change' && sortPriceChange == 'max' && Number(row.maxChange) >= 3) ? 'border-[#94AE32] text-[#94AE32] bg-[#DFE6B9]'
                        : (filterSelection == 'Price Change' && sortPriceChange == 'max' && Number(row.maxChange) <= -3) ? 'border-[#BA5C3B] text-[#BA5C3B] bg-[#E0B9AC]'
                        : (filterSelection == 'Price Change' && sortPriceChange == 'max' && Number(row.maxChange) >= 0) ? 'border-[#9F9735] text-[#9F9735] bg-[#F2F1EF]'
                        : (filterSelection == 'Price Change' && sortPriceChange == 'max' && Number(row.maxChange) < 0) ? 'border-[#B4683A] text-[#B4683A] bg-[#F2F1EF]'
                        
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
                            ${filterSelection == 'Price Change' && sortPriceChange == '1D' && Math.abs(Number(row.dayChange)) >= 3 ? '' : 'hidden'} `}>
                            <p >{row.dayChange}</p>
                        </div>
                    </button>
                ))}
            </section>

        </div>
    );
}

export default TopPicks;