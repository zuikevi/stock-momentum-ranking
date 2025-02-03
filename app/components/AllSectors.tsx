import React, { useState } from 'react';
import { useData } from '../context/DataContext';
// import { FaChevronDown } from "react-icons/fa";

interface AllSectorsProps {
    onSymbolSelect: (symbol: string) => void;
}

const AllSectors: React.FC<AllSectorsProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.filterData;

    const [sym, setSym] = useState(' '); // selected ticker

    const [filterSelection, setFilterSelection] = useState('Momentum'); // momentum or price change
    const [sortSelection, setSortSelection] = useState('Both'); // both, stm, ltm
    const [sortPriceChange, setSortPriceChange] = useState('1D'); // 1D, 5D, ..., 5Y

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

    const sector1 = assets?.filter(item => (item.sector === 'Health Care'));
    const sector2 = assets?.filter(item => (item.sector === 'Information Technology'));

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

            <div className='flex flex-row gap-10'>

                <div>
                    <p className='text-sm font-semibold'>Health Care</p>

                    <div className='flex flex-row flex-wrap gap-1 pb-10 w-[460px]'>

                        {sector1?.map((row, index) => (
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

                    </div>
                </div>

                <div>
                    <p className='text-sm font-semibold'>Information Technology</p>
                    <div className='flex flex-row flex-wrap gap-1 pb-10 w-[460px]'>

                        {sector2?.map((row, index) => (
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

                    </div>
                </div>

            </div>

        </div>
    );
}

export default AllSectors;