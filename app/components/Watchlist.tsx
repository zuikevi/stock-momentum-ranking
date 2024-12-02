import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const Watchlist: React.FC<selected> = ({ symbol }) => {

    const data = useData();
    const assets = data?.filterData;

    if (!data) { return <div>Loading...</div>; }

    const selected = data.companyData.data.find(row => row[0] === symbol);
    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);

    if (!selected) { return <div>Loading...</div>; }

    // let assetsToDisplay = data.combinedDataPreview.data.filter(item => (item.STM! >= 0.7 && item.LTM! >= 0.7));
    const highestTotal = assets?.sort((a, b) => Math.abs(Number(b.dayChange ?? 0)) - Math.abs(Number(a.dayChange ?? 0))).slice(0, 21);

    return (
        <div className="relative text-[#141414] max-w-64 bg-white border border-1 pl-1 mr-2 pb-2">

            <p className="pt-2 pl-2 font-semibold text-sm">Watchlist</p>

            <div className='flex flex-row flex-wrap'>
                {highestTotal?.map((row, index) => (
                    <div key={index}
                        className={`p-3 flex flex-col text-center content-center justify-center border border-1 rounded-lg min-w-16
                        ${row.STM! >= 0.8 ? 'flex-row' : 'flex-row'}

                        ${(Number(row.dayChange) >= 3) ? 'border-white bg-[#DCF367]' :
                        (Number(row.dayChange) >= 0.8) ? 'border-white bg-[#C9DD66]' :
                          (Number(row.dayChange) <= 0) ? 'border-white bg-[#E25B40]' :
                                                                 'border-[#CAC8C7] bg-[#E1DFDD]'}
                        `}
                    >

                        <p className="pl-1 font-semibold text-xs content-center justify-center">{row.symbol}</p>
                        <p className="font-semibold text-xs content-center justify-center">{row.dayChange}</p>

                        {/* <div className="flex flex-row justify-between">
                        <p className="pl-2 text-xs">{row.security}</p>
                        <p className="pr-1 text-xs">{row.STM} {row.LTM}</p>
                    </div> */}

                    </div>
                ))}
            </div>

        </div>
    );
}

export default Watchlist;