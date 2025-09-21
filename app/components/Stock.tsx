import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const Stock: React.FC<selected> = ({ symbol }) => {

    const data = useData();
    const [watched, setWatched] = useState(data?.filterData.find(pv => pv.symbol === symbol)!.watchlist);

    if (!data) { return <div>Loading...</div>; }
    const asset = data?.filterData.find(pv => pv.symbol === symbol);
    const assetDetails = data?.assetData.find(pv => pv.symbol === symbol);

    const ToggleWatch = () => {
        asset!.watchlist = !asset?.watchlist;
        setWatched(!watched);
    };

    if (!asset) { return <div>Loading...</div>; }

    return (
        <div className="relative text-[#FFFFFF] bg-[#121212] p-2 max-w-[700px]">

            <div className='flex flex-row'>
                <p className="text-sm font-semibold">{assetDetails?.symbol}</p>
                <p className="text-sm font-semibold pl-3">{assetDetails?.price}</p>
                <p className="font-semibold content-center text-sm pl-0.5">usd</p>
                <p className="text-sm font-semibold pl-3">{asset?.STM}</p>
                <p className="font-semibold content-center text-sm pl-0.5">stm</p>
                <p className="text-sm font-semibold pl-3">{asset?.LTM}</p>
                <p className="font-semibold content-center text-sm pl-0.5">ltm</p>
                {/* <p className="text-sm font-semibold pl-3">{assetDetails?.volume}</p> */}
                {/* <p className="text-[#141414] font-semibold content-center text-sm pl-0.5">vol</p> */}

                <button
                    type="button"
                    id={`add-to-watchlist`}
                    aria-labelledby={`add-to-watchlist-btn`}
                    onClick={() => ToggleWatch}
                    className={`flex flex-row gap-3 ml-4 shrink cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                        border border-1 border-[#CAC8C7] bg-[#121212] h-[22px]`}
                >
                    <p className={`${asset?.watchlist === false ? '' : 'hidden'}`}>Watch</p>
                    <p className={`${asset?.watchlist === true ? '' : 'hidden'}`}>Remove</p>
                </button>
            </div>

            <section className={`flex flex-col gap-2`}>

                <div>
                    <p className="text-sm font-semibold pt-2">{assetDetails?.security}</p>
                    <p className="text-sm font-regular text-wrap pl-4">{assetDetails?.subIndustry}</p>
                    <div className='flex flex-row gap-2 flex-wrap pl-4'>
                        <p className="text-sm font-regular text-wrap">{assetDetails?.headquarters}</p>
                        <p className="text-sm font-regular text-wrap">{assetDetails?.founded}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-semibold text-wrap">Momentum Score and Price Change</p>
                    <div className='flex flex-row gap-1 text-left font-semibold pl-4'>
                        <p className={`col-span-1 text-sm ${asset!.STM > 0.5 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset?.STM}</p>
                        <p className="text-xs pr-10 pt-0.5">STM</p>
                        <p className={`text-sm ${asset!['1D'] > 0 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset!['1D']}</p>
                        <p className="text-xs pr-2 pt-0.5">1D</p>
                        <p className={`text-sm ${asset!['5D'] > 0 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset!['5D']}</p>
                        <p className="text-xs pr-2 pt-0.5">5D</p>
                        <p className={`text-sm ${asset!['1M'] > 0 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset!['1M']}</p>
                        <p className="text-xs pt-0.5">1M</p>

                    </div>

                    <div className='flex flex-row gap-1 text-left font-semibold pl-4'>
                        <p className={`col-span-1 text-sm ${asset!.LTM > 0.5 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset?.LTM}</p>
                        <p className="text-xs pr-10 pt-0.5">LTM</p>
                        <p className={`text-sm ${asset!['1Y'] > 0 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset!['1Y']}</p>
                        <p className="text-xs pr-2 pt-0.5">1Y</p>
                        <p className={`text-sm ${asset!['3Y'] > 0 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset!['3Y']}</p>
                        <p className="text-xs pr-2 pt-0.5">3Y</p>
                        <p className={`text-sm ${asset!['5Y'] > 0 ? 'text-[#94AE32]' : 'text-[#BF503C]'}`}>{asset!['5Y']}</p>
                        <p className="text-xs pt-0.5">5Y</p>
                    </div>
                </div>
            </section>

            <div className='flex flex-wrap flex-row gap-1 pt-4'>
                    
                    <div className={`flex flex-row gap-1 shrink  cursor-pointer content-center justify-center min-w-4 font-semibold text-sm`}>
                        <p className={`border border-1 rounded-full px-2 border-[#CAC8C7] text-[#121212] bg-[#CAC8C7]`}>{asset?.sector}</p>
                        <p className={`${asset?.watchlist === true ? '' : 'hidden'} border border-1 rounded-full px-2 border-[#CAC8C7] text-[#121212] bg-[#CAC8C7]`}>watched</p>
                        <p className={`${((asset!.STM >= 0.9) && (asset!.LTM >= 0.9))  ? '' : 'hidden'} border border-1 rounded-full px-2 border-[#79AD18] text-[#79AD18] bg-[#DFE6B6]`}>safe-ish</p>
                        <p className={`${((asset!.STM <= 0.2) && (asset!.LTM <= 0.2)) ? '' : 'hidden'} border border-1 rounded-full px-2 border-[#BA463B] text-[#BA463B] bg-[#E0B9AC]`}>risky</p>

                        <p className={`${((asset!.STM >= 0.9) && (asset!.LTM <= 0.2)) ? '' : 'hidden'} border border-1 rounded-full px-2 border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]`}>short-term</p>
                        <p className={`${((asset!.STM <= 0.2) && (asset!.LTM >= 0.9)) ? '' : 'hidden'} border border-1 rounded-full px-2 border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]`}>long-term</p>
                    </div>
            </div>
        </div>
    );
}

export default Stock;