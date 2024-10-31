import React from 'react';
import { useData } from '../context/DataContext';

import { SiBento } from "react-icons/si"; //sub-industry
import { HiChip } from "react-icons/hi"; //IT
import { FaPlugCircleBolt } from "react-icons/fa6"; //energy
import { FaCar } from "react-icons/fa"; //consumer discretionary
import { FaFaucetDrip } from "react-icons/fa6"; //utilities
import { GiMetalBar } from "react-icons/gi"; //materials
import { BiSolidBuildingHouse } from "react-icons/bi"; //real estate
import { GiMedicines } from "react-icons/gi"; // health care
import { FaShoppingBasket } from "react-icons/fa"; // consumer staples
import { FaHouseSignal } from "react-icons/fa6"; // communication services
import { FaGear } from "react-icons/fa6"; // industrials
import { BsCurrencyExchange } from "react-icons/bs"; // financials

import { FaPlus } from "react-icons/fa"; // add to watchlist

interface selected {
    symbol: string;
}

const Stock: React.FC<selected> = ({ symbol }) => {

    const data = useData();

    if (!data) {
        return <div>Loading...</div>;
    }

    const selected = data.companyData.data.find(row => row[0] === symbol);
    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);

    if (!selected) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative max-w-96 min-w-60 text-[#141414] mb-6 pb-1
            bg-gradient-to-br from-[#DCF367] from-40% to-[#F3E767] to-80% px-1 rounded-lg border border-1 border-[#C2D75B]">

            <div className='flex flex-col pl-2 pt-2 pb-2 pr-2'>
                <div className='flex flex-row justify-between gap-2'>
                <p className="text-lg font-semibold">{selected[1]}</p>
                <FaPlus size={24} className='cursor-pointer border-[#CAC8C7] bg-[#F2F1EF] border border-1 p-1 rounded-full'/>
                </div>
                
                <div className='flex flex-row gap-1'>
                    <FaPlugCircleBolt className='m-0.5 my-1 pt-0.5'/>
                    <p className="text-base font-regular pt-0.5">{selected[2]}</p>
                </div>
                <div className='flex flex-row gap-1'>
                    <SiBento className='m-0.5 my-2' />
                    <p className="text-base font-regular pt-0.5 text-wrap">{selected[3]}</p>
                </div>
            </div>

            <div className='flex flex-row gap-4 pl-1'>
                <div className='flex flex-row'>
                    <p className="text-base font-semibold pl-1">{selected[0]}</p>
                    <div className='flex flex-row'>
                        <p className="text-base font-semibold pl-3">{priceData?.STM}</p>
                        <p className="text-[#141414] font-semibold content-center text-sm pl-0.5 pt-0.5">STM</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className="text-base font-semibold pl-3">{priceData?.LTM}</p>
                        <p className="text-[#141414] font-semibold content-center text-sm pl-0.5 pt-0.5">LTM</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Stock;