import React, { useState, useMemo } from 'react';
import { Link } from '@remix-run/react';
import { useData } from '../context/DataContext';
import { FaChevronRight } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect }) => {
    const data = useData();
    // const [selected, notSelected] = useState(false);
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

    if (!data.bestMomentum) { return <div>Loading...</div>; }

    return (
        <div className='flex flex-col place-content-center text-[#141414]'>

            <div className='flex flex-row flex-wrap gap-1 pb-6 sm:pb-6 lg:pb-2'>
                <p className='text-[#888EA0] font-semibold text-xs pt-0.5'>STM</p>
                {data.bestMomentum.topSTM?.map((row, index) => (
                    <p key={index} onClick={() => setSym(row.symbol)}>

                    <div className={`flex flex-row gap-3 cursor-pointer font-semibold text-sm px-2 rounded-full border border-1 
                        ${sym == row.symbol ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                        <p> {row.symbol}</p>

                        <div className={`cursor-pointer flex flex-row gap-1 ${sym == row.symbol ? '' : 'hidden'} `}>
                            <p >{row.STM}</p>
                            <p className="text-[#141414] font-bold content-center text-xs">STM</p>
                        </div>

                        <div className={`cursor-pointer flex flex-row gap-1  ${sym == row.symbol ? '' : 'hidden'} `}>
                            <p >{row.LTM}</p>
                            <p className="text-[#141414] font-bold content-center text-xs">LTM</p>
                        </div>
                    </div>
                </p>
                ))}
            </div>

            <div className='flex flex-row flex-wrap gap-1'>
                <p className='text-[#888EA0] font-semibold text-xs pt-0.5'>LTM</p>

                {data.bestMomentum.topLTM?.map((row, index) => (
                    <p key={index} onClick={() => setSym(row.symbol)}>

                        <div className={`flex flex-row gap-3 cursor-pointer font-semibold text-sm px-2 rounded-full border border-1 
                            ${sym == row.symbol ? 'border-[#C2D75B] bg-[#DCF367]' : 'border-[#CAC8C7] bg-[#E1DFDD]'}`}>
                            <p> {row.symbol}</p>

                            <div className={`cursor-pointer flex flex-row gap-1 ${sym == row.symbol ? '' : 'hidden'} `}>
                                <p >{row.STM}</p>
                                <p className="text-[#141414] font-bold content-center text-xs">STM</p>
                            </div>

                            <div className={`cursor-pointer flex flex-row gap-1  ${sym == row.symbol ? '' : 'hidden'} `}>
                                <p >{row.LTM}</p>
                                <p className="text-[#141414] font-bold content-center text-xs">LTM</p>
                            </div>
                        </div>
                    </p>
                ))}

            </div>

            <div className="flex flex-row font-semibold text-sm cursor-pointer pt-2 underline justify-end">
                <Link to="/momentum">view all</Link>
                <p className='pl-1 pt-1 text-xs'><FaChevronRight /></p>
            </div>
        </div>
    );
}

export default TopPicks;