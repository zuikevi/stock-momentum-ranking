import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const Watchlist: React.FC<selected> = ({ symbol }) => {

    const data = useData();

    if (!data) { return <div>Loading...</div>; }

    const selected = data.companyData.data.find(row => row[0] === symbol);
    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);

    if (!selected) { return <div>Loading...</div>; }

    let assetsToDisplay = data.combinedDataPreview.data.filter(item => (item.STM! >= 0.7 && item.LTM! >= 0.7));
    const highestTotal = [...assetsToDisplay]
          .sort((a, b) => (b.STM ?? 0) - (a.STM ?? 0)).slice(0, 8);

    return (
        <div className="relative text-[#141414] min-w-56 bg-white border border-1 mr-2 pb-2">

            <p className="pt-2 pl-2 font-semibold text-sm">Watchlist</p>
            {highestTotal.map((row, index) => (
                <div key={index} className="pt-2">

                    <div className="flex flex-row justify-between">
                        <p className="pt-1 pl-2 font-semibold text-xs">{row.symbol}</p>
                        <p className="pt-1 pr-2 font-semibold text-xs">${row.price}</p>
                    </div>

                    <div className="flex flex-row justify-between">
                        <p className="pl-2 text-xs">{row.security}</p>
                        <p className="pr-2 text-xs">{row.STM} stm</p>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Watchlist;