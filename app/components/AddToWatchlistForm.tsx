import React from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const AddToWatchlistForm: React.FC<selected> = ({ symbol }) => {

    const data = useData();
    if (!data) { return <div>Loading...</div>; }

    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);
    // const asset = data?.filterData.find(pv => pv.symbol === symbol);

    if (!priceData) { return <div>Loading...</div>; }

    return (
        <div className="relative text-[#141414] bg-white p-2 pb-6 rounded-md max-w-[600px] max-h-[200px]">
            <p>Add to Watchlist</p>
            <form className='flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                    <p className={`flex flex-row gap-3 shrink mt-2 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full 
                    border border-1 border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]`}>FMC</p>
                </div>

                <div className='flex flex-row gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Shares</label>
                        <input className='border border-1 border-[#CAC8C7] rounded-md px-1 w-[140px]'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Bought at (£)</label>
                        <input className='border border-1 border-[#CAC8C7] rounded-md px-1'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Bought on</label>
                        <input type="date" className='border border-1 border-[#CAC8C7] rounded-md px-1'></input>
                    </div>
                </div>

                <div className='flex flex-row gap-4 content-center justify-center pt-4'>
                    <input type='button' value="Cancel" className='border border-1 border-[#CAC8C7] rounded-md min-w-[90px]'></input>
                    <input type='submit' value="Add" className='border border-1 border-[#CAC8C7] rounded-md min-w-[90px]'></input>
                </div>

            </form>

        </div>
    );
}

export default AddToWatchlistForm;