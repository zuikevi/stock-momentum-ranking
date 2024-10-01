import React from 'react';
import { Link } from '@remix-run/react';
import { useData } from '../context/DataContext';
import { FaChevronRight } from "react-icons/fa";

interface TopPicksProps {
    onSymbolSelect: (symbol: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ onSymbolSelect }) => {
    const data = useData();

    if (!data) {
        return <div>Loading...</div>;
    }

    if (!data.bestMomentum) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col place-content-center text-[#141414]'>

            <div className='flex flex-row flex-wrap gap-2 pb-2'>
            <p className='text-[#888EA0] font-semibold text-xs pt-0.5'>STM</p>
                {data.bestMomentum.topSTM?.map((row, index) => (
                    <p key={index} onClick={() => onSymbolSelect(row.symbol)}>
                        <p className='cursor-pointer font-semibold text-sm px-2 rounded-full border border-1 border-[#141414] bg-[#DCF367]'>{row.symbol}</p>
                    </p>
                ))}
            </div>
            
            <div className='flex flex-row flex-wrap gap-2'>
            <p className='text-[#888EA0] font-semibold text-xs pt-0.5'>LTM</p>
                {data.bestMomentum.topLTM?.map((row, index) => (
                    <p key={index} onClick={() => onSymbolSelect(row.symbol)}>
                        <p className='cursor-pointer font-semibold text-sm px-2 rounded-full border border-1 border-[#141414] bg-[#DCF367]'>{row.symbol}</p>
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