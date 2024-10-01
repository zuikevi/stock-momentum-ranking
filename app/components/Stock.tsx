import React from 'react';
import { useData } from '../context/DataContext';

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
        <div className="relative text-[#141414] pb-6">

            <div className='flex flex-col pl-2 pt-2 pb-2'>
                <p className="text-lg font-semibold">{selected[1]}</p>
                <div className='flex flex-row gap-4'>
                    <p className="text-base font-regular pt-0.5">{selected[2]}</p>
                    <p className="text-base font-regular pt-0.5">{selected[3]}</p>
                </div>
                <p className="text-base font-regular pr-6 pt-0.5">{selected[4]}</p>
            </div>




            {/* <div className='pl-1'>
                <p className="text-lg font-semibold">{selected[1]}</p>
                <div className="flex flex-row justify-start mx-auto flex-wrap">
                    <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">SECTOR:</p>
                    <p className="text-base font-regular pr-6">{selected[2]}</p>

                </div>

                <div className="flex flex-row justify-start mx-auto flex-wrap pt-1">
                    <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">SUB-INDUSTRY:</p>
                    <p className="text-base font-regular pr-6">{selected[3]}</p>
                </div>

                <div className="flex flex-row justify-start mx-auto flex-wrap pt-1">
                    <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">HEADQUARTERS:</p>
                    <p className="text-base font-regular pr-6">{selected[4]}</p>
                </div>

                <div className="flex flex-row justify-start mx-auto flex-wrap pt-1">
                    <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">ADDED:</p>
                    <p className="text-base font-regular pr-6">{selected[5]}</p>
                </div>

                <div className="flex flex-row justify-start mx-auto flex-wrap pt-1">
                    <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">FOUNDED:</p>
                    <p className="text-base font-regular pr-6">{selected[7]}</p>
                </div>
            </div> */}

            
            <div className='flex flex-row gap-4 pl-1'>
                <div className='flex flex-row bg-[#DCF367] px-1 rounded-lg border border-1 border-[#141414]'>
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