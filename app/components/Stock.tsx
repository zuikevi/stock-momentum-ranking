import React from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const Stock: React.FC<selected> = ({ symbol }) => {

    const data = useData();
    if (!data) { return <div>Loading...</div>; }

    const selected = data.companyData.data.find(row => row[0] === symbol);
    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);
    const asset = data?.filterData.find(pv => pv.symbol === symbol);

    if (!selected) { return <div>Loading...</div>; }

    return (
        <div className="relative text-[#141414] px-1">

            <div className='flex flex-row'>
                <p className="text-sm font-semibold">{selected[0]}</p>
                <p className="text-sm font-semibold pl-3">{priceData?.price}</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">usd</p>
                <p className="text-sm font-semibold pl-3">{priceData?.STM}</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">stm</p>
                <p className="text-sm font-semibold pl-3">{priceData?.LTM}</p>
                <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">ltm</p>
                {/* <p className="text-sm font-semibold pl-3">{priceData?.volume}</p> */}
                {/* <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">vol</p> */}

            </div>

            <section className={`flex flex-col gap-2`}>

                <div>
                    <p className="text-sm font-semibold pt-2">{selected[1]}</p>
                    <p className="text-sm font-regular">{selected[3]}</p>
                    <div className='flex flex-row gap-2 flex-wrap'>
                        <p className="text-sm font-regular">{selected[4]}</p>
                        <p className="text-sm font-regular">{selected[7]}</p>
                    </div>
                </div>

                {/* <div className='flex flex-col gap-2'>
                <p className={`flex flex-row gap-3 shrink  cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                border border-1 border-[#94AD18] bg-white h-[22px]`}>add to watchlist</p>
                <p className={`flex flex-row gap-3 shrink  cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                border border-1 border-[#94AD18] bg-white h-[22px]`}>notifications</p>
                </div> */}



                <div>
                    <p className="text-sm font-regular font-semibold text-wrap">Momentum Score</p>
                    <div className='flex flex-row gap-4 text-left'>
                        <p className="col-span-1 text-sm font-regular px-1">{priceData?.STM} short-term</p>
                        {/* <p className="col-span-5 text-xs font-regular px-1">short-term momentum percentile (1D, 5D, 1M)</p> */}
                        <p className="col-span-1 text-sm font-regular px-1">{priceData?.LTM} long-term</p>
                        {/* <p className="col-span-5 text-xs font-regular px-1">long-term momentum percentile (1Y, 3Y, 5Y)</p> */}
                    </div>
                </div>

                <div>
                    <p className="text-sm font-regular font-semibold text-wrap pt-2">Price Change Percentiles</p>
                    <div className='grid grid-cols-6 text-center w-[300px]'>
                        <p className="text-xs font-regular px-1">1D</p>
                        <p className="text-xs font-regular px-1">5D</p>
                        <p className="text-xs font-regular px-1">1M</p>
                        <p className="text-xs font-regular px-1">1Y</p>
                        <p className="text-xs font-regular px-1">3Y</p>
                        <p className="text-xs font-regular px-1">5Y</p>

                        <p className="text-sm font-regular px-1">{asset!['1D']}</p>
                        <p className="text-sm font-regular px-1">{asset!['5D']}</p>
                        <p className="text-sm font-regular px-1">{asset!['1M']}</p>
                        <p className="text-sm font-regular px-1">{asset!['1Y']}</p>
                        <p className="text-sm font-regular px-1">{asset!['3Y']}</p>
                        <p className="text-sm font-regular px-1">{asset!['5Y']}</p>
                    </div>
                </div>
            </section>

            <div className='flex flex-row gap-1 pt-2'>

                <p className={`flex flex-row gap-3 shrink  cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full 
                    border border-1 border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]`}>{selected[2]}</p>
{/* 
                <p className={`flex flex-row gap-3 shrink  cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full 
                    border border-1 border-[#94AD18] bg-[#DFE6B6] text-[#94AD18]`}>chance to recover</p> */}
            </div>

        </div>
    );
}

export default Stock;