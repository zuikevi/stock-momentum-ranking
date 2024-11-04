import React, { useState } from 'react';
import { useData } from '../context/DataContext';

import { FaPlugCircleBolt } from "react-icons/fa6"; //energy
import { GiMedicines } from "react-icons/gi"; // health care
import { FaChevronDown } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect }) => {

    const data = useData();
    const assets = data?.bestMomentum.topSTM;

    const [sym, setSym] = useState(' ');
    const [momentum, setMomentum] = useState(0.8);
    const [sortSelection, setSortSelection] = useState('Both');

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

    if (!data.bestMomentum) { return <div>Loading...</div>; }

    let assetsToDisplay;
    if (momentum < 0.5) {
        assetsToDisplay = sortSelection === 'All' ? assets?.filter(item => (item.STM! <= momentum || item.LTM! <= momentum))
            : sortSelection === 'Both' ? assets?.filter(item => (item.STM! <= momentum && item.LTM! <= momentum))
                : sortSelection === 'STM' ? assets?.filter(item => item.STM! <= momentum)
                    : assets?.filter(item => item.LTM! <= momentum);
    }
    else {
        assetsToDisplay = sortSelection === 'All' ? assets?.filter(item => (item.STM! >= momentum || item.LTM! >= momentum))
            : sortSelection === 'Both' ? assets?.filter(item => (item.STM! >= momentum && item.LTM! >= momentum))
                : sortSelection === 'STM' ? assets?.filter(item => item.STM! >= momentum)
                    : assets?.filter(item => item.LTM! >= momentum);
    }

    return (
        <div className='flex flex-col place-content-center text-[#141414]'>

            <section className='flex flex-row gap-3 p-2 font-semibold text-sm'>

                <button
                    type="button"
                    id="sort-both"
                    aria-pressed={sortSelection === 'Both'}
                    aria-labelledby="sort-both"
                    onClick={() => setSortSelection('Both')}
                    className={`${sortSelection === 'Both' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    Both
                </button>
                <button
                    type="button"
                    id="sort-stm"
                    aria-pressed={sortSelection === 'STM'}
                    aria-labelledby="sort-stm"
                    onClick={() => setSortSelection('STM')}
                    className={`${sortSelection === 'STM' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    STM
                </button>
                <button
                    type="button"
                    id="sort-ltm"
                    aria-pressed={sortSelection === 'LTM'}
                    aria-labelledby="sort-ltm"
                    onClick={() => setSortSelection('LTM')}
                    className={`cursor-pointer ${sortSelection == 'LTM' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    LTM
                </button>

                <p className='text-[#CAC8C7]'>|</p>

                <button
                    type="button"
                    id="momentum-0.9"
                    aria-pressed={momentum === 0.9}
                    aria-labelledby="momentum-0.9"
                    onClick={() => setMomentum(0.9)}
                    className={`${momentum === 0.9 ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    0.9
                </button>
                <button
                    type="button"
                    id="momentum-0.8"
                    aria-pressed={momentum === 0.8}
                    aria-labelledby="momentum-0.8"
                    onClick={() => setMomentum(0.8)}
                    className={`${momentum === 0.8 ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    0.8
                </button>
                <button
                    type="button"
                    id="momentum-0.7"
                    aria-pressed={momentum === 0.7}
                    aria-labelledby="momentum-0.7"
                    onClick={() => setMomentum(0.7)}
                    className={`${momentum === 0.7 ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    0.7
                </button>
                <button
                    type="button"
                    id="momentum-0.1"
                    aria-pressed={momentum === 0.1}
                    aria-labelledby="momentum-0.1"
                    onClick={() => setMomentum(0.1)}
                    className={`${momentum === 0.1 ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}>
                    0.1
                </button>

                <p className='text-[#CAC8C7]'>|</p>

                <button className="flex flex-row">
                    {/* <p className='pr-1'>communication services</p> */}
                    <FaChevronDown className="content-center mt-1" />
                </button>

            </section>

            <section className='flex flex-row flex-wrap gap-1 pb-6 sm:pb-6 lg:pb-2'>
                {assetsToDisplay?.map((row, index) => (
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