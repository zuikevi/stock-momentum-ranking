import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const Stock: React.FC<selected> = ({ symbol }) => {

    const data = useData();

    if (!data) { return <div>Loading...</div>; }

    const selected = data.companyData.data.find(row => row[0] === symbol);
    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);

    if (!selected) { return <div>Loading...</div>; }

    return (
        <div className="relative min-w-32 text-[#141414] py-1 px-2 ">

            <div className='flex flex-row'>
                <p className="text-sm font-semibold">{selected[0]}</p>
                <p className="text-sm font-semibold pl-3">{priceData?.STM}</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">stm</p>
                <p className="text-sm font-semibold pl-3">{priceData?.LTM}</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">ltm</p>
                {/* <p className="text-sm font-semibold pl-3">34k</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">vol</p>
                <p className="text-sm font-semibold pl-3">234</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">usd</p> */}
            </div>


            <section className={`flex flex-row gap-10`}>

                <div>
                    <p className="text-sm font-semibold pt-2">{selected[1]}</p>

                    <p className="text-sm font-regular">{selected[3]}</p>
                    <div className='flex flex-row gap-2 flex-wrap'>
                        <p className="text-sm font-regular">{selected[4]}</p>
                        <p className="text-sm font-regular">{selected[7]}</p>
                    </div>
                </div>

                {/* <div>
                    <p className="text-sm font-regular font-semibold text-wrap pt-2">Percentiles</p>

                    <div className='grid grid-cols-6 text-center'>
                        <p className="text-xs font-regular px-1">1D</p>
                        <p className="text-xs font-regular px-1">5D</p>
                        <p className="text-xs font-regular px-1">1M</p>
                        <p className="text-xs font-regular px-1">1Y</p>
                        <p className="text-xs font-regular px-1">3Y</p>
                        <p className="text-xs font-regular px-1">5Y</p>

                        <p className="text-sm font-regular px-1">0.67</p>
                        <p className="text-sm font-regular px-1">0.55</p>
                        <p className="text-sm font-regular px-1">0.34</p>
                        <p className="text-sm font-regular px-1">0.64</p>
                        <p className="text-sm font-regular px-1">0.22</p>
                        <p className="text-sm font-regular px-1">0.11</p>

                    </div>
                </div> */}
            </section>

            <div className='flex flex-row gap-1 pt-2 pb-2'>
                <p className="text-sm font-regular rounded-full border border-1 border-[#141414] px-2">{selected[2]}</p>
                {/* <p className="text-sm font-regular rounded-full border border-1 border-[#141414] px-2">Top 10%</p> */}
            </div>
        </div>
    );
}

export default Stock;