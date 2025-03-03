import React, { useState } from 'react';
import { useData } from '../context/DataContext';
// import { FaChevronDown } from "react-icons/fa";

interface AllSectorsProps {
    onSymbolSelect: (symbol: string) => void;
    sectorSelect: string;
    view: string;
}

const AllSectors: React.FC<AllSectorsProps> = ({ onSymbolSelect, sectorSelect, view }) => {

    const data = useData();
    const assets = data?.filterData;

    const [sym, setSym] = useState(' '); // selected ticker

    // const [view, setView] = useState('Both'); // both, stm, ltm

    if (!data) { return <div>Loading...</div>; }
    if (!data.filterData) { return <div>Loading...</div>; }

    const sectorSplit = assets?.filter(item => (item.sector === sectorSelect));

    const topSTM = (view === 'Both') ? sectorSplit?.sort((a, b) => (b.STM + b.LTM) - (a.STM + a.LTM))
        : (view === 'STM') ? sectorSplit?.sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0))
        : (view === 'LTM') ? sectorSplit?.sort((a, b) => (b.LTM ?? 0) - (a.LTM ?? 0))
        : (view === '1D') ? sectorSplit?.sort((a, b) => (Number(b['1D']) + Number(b['1D'])) - (Number(a['1D']) + Number(a['1D'])))
        : (view === '1M') ? sectorSplit?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
        : (view === '1Y') ? sectorSplit?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
        : (view === '5D') ? sectorSplit?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
        : (view === '3Y') ? sectorSplit?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
        : (view === 'max') ? sectorSplit?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])))
        : sectorSplit?.sort((a, b) => (Number(b[view as keyof typeof b]) + Number(b[view as keyof typeof b])) - (Number(a[view as keyof typeof a]) + Number(a[view as keyof typeof a])));


    return (
        <div className='flex flex-col place-content-start text-[#141414]'>

            <p className='text-sm font-semibold'>{sectorSelect}</p>

            <div className='flex flex-row flex-wrap gap-0.5 pb-2 w-fit lg:w-[460px]'>
                {topSTM?.map((row, index) => (
                    <button
                        key={index}
                        onClick={() => { setSym(row.symbol), onSymbolSelect(row.symbol) }}
                        id={`asset-${row.symbol}`}
                        aria-labelledby={`asset-${row.symbol}`}
                        aria-pressed={sym === row.symbol}
                        className={`flex flex-row gap-3 shrink cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                                    hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#141414]
                        ${((row.STM < 0.1 && row.LTM >= 0.9) && view == 'Both') ? 'border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]'
                        : ((row.STM >= 0.9 && row.LTM < 0.1) && view == 'Both') ? 'border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]'

                        : (((row.STM + row.LTM >= 1.8) && view == 'Both') || (row.STM >= 0.9 && view === 'STM') || (row.LTM >= 0.9 && view === 'LTM')) ? 'btnGreenT1'
                        : (((row.STM + row.LTM >= 1.6) && view === 'Both') || (row.STM >= 0.8 && view === 'STM') || (row.LTM >= 0.8 && view === 'LTM')) ? 'btnGreenT2'
                        : (((row.STM + row.LTM >= 1.3) && view === 'Both') || (row.STM >= 0.65 && view === 'STM') || (row.LTM >= 0.65 && view === 'LTM')) ? 'btnGreenT3'
                        : (((row.STM + row.LTM >= 1.0) && view === 'Both') || (row.STM >= 0.5 && view === 'STM') || (row.LTM >= 0.5 && view === 'LTM')) ? 'btnWhiteT1'
                        : (((row.STM + row.LTM >= 0.7) && view === 'Both') || (row.STM >= 0.35 && view === 'STM') || (row.LTM >= 0.35 && view === 'LTM')) ? 'btnWhiteT2'
                        : (((row.STM + row.LTM >= 0.2) && view === 'Both') || (row.STM >= 0.1 && view === 'STM') || (row.LTM >= 0.1 && view === 'LTM')) ? 'btnRedT2'
                        : (((row.STM + row.LTM < 0.2) && view === 'Both') || (row.STM < 0.1 && view === 'STM') || (row.LTM < 0.1 && view === 'LTM')) ? 'btnRedT1'

                        : (Number(row[view as keyof typeof row]) >= 10) ? 'btnGreenT1'
                        : (Number(row[view as keyof typeof row]) <= -10) ? 'btnRedT1'
                        : (Number(row[view as keyof typeof row]) >= 3) ? 'btnGreenT2'
                        : (Number(row[view as keyof typeof row]) <= -3) ? 'btnRedT2'
                        : (Number(row[view as keyof typeof row]) >= 0) ? 'btnWhiteT1'
                        : (Number(row[view as keyof typeof row]) < 0) ? 'btnWhiteT2'
                        : 'border-[#CAC8C7] bg-[#E1DFDD]'}
                        `}>
                        <p >{row.symbol}</p>
                    </button>
                ))}

            </div>

        </div>
    );
}

export default AllSectors;