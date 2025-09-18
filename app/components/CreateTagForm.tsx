import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface selected {
    symbol: string;
}

const CreateTagForm: React.FC<selected> = ({ symbol }) => {

    const data = useData();

    const [colorCodes, setColorCodes] = useState('');

    const [formData, setFormData] = useState({
        tagText: "preview",
        bgColor: "#F2F1EF",
        borderColor: "#9F9735",
    });
    // const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (!data) { return <div>Loading...</div>; }
    const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);
    // const asset = data?.filterData.find(pv => pv.symbol === symbol);
    if (!priceData) { return <div>Loading...</div>; }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Additional submission logic can be added here (e.g., sending data to an API)
    };

    return (
        <div className="relative text-[#141414] bg-white p-2 pb-6 rounded-md max-w-[420px]">
            <p className='text-base font-semibold'>Create a Tag</p>
            {/* <p className={`inline-block gap-3 shrink mt-2 cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full 
                    border border-1 ${colorCodes} mr-1`}>{formData.tagText}</p> */}

            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-row gap-2 pb-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="tagText" className='text-sm font-semibold pl-1'>Text</label>
                        <input name="tagText" value={formData.tagText} onChange={handleChange} className={`inline-block gap-3 shrink cursor-text content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-full 
                    border border-1 ${colorCodes} mr-1`}></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="dropdown" className='text-sm font-semibold pl-1'>Highlight in:</label>
                        <select id="dropdown" name="dropdown" className='px-2 border border-1 border-[#CAC8C7] rounded-md'>
                            <option value="option1">in all tabs</option>
                            <option value="option1">none</option>
                            <option value="option2">only in STM</option>
                            <option value="option3">only in LTM</option>
                            <option value="option3">only in 1D</option>
                        </select>
                    </div>
                </div>

                <label htmlFor="tagText">Color</label>
                <div className='flex flex-row flex-wrap gap-1 pb-2'>
                    {['border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]', 'border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]', 'btnGreenT2', 'btnRedT2', 'btnWhiteT1', 'btnWhiteT2', 
                    'btnGreenT1', 'btnRedT1', 'border-[#141414] text-[#F2F1EF] bg-[#141414]', 'border-[#7732B7] text-[#7732B7] bg-[#C0E6B9]'].map((option) => (
                        <button
                            key={option}
                            type="button"
                            id={`sort-${option.toLowerCase()}`}
                            aria-pressed={colorCodes === option}
                            aria-labelledby={`sort-${option.toLowerCase()}`}
                            onClick={() => setColorCodes(option)}
                            className={`gap-3 shrink cursor-pointer content-center justify-center min-w-4 font-bold text-sm px-2 rounded-md border-2
                                ${option} ${colorCodes === option ? '' : ''}`}
                        >
                            /
                        </button>
                    ))}
                </div>



                {/* <fieldset className='flex flex-row flex-wrap gap-1'>
                    <legend>tabs to highlight in</legend>

                    {['Both', 'STM', 'LTM', '1D', '5D', '1M', '1Y', '3Y', '5Y'].map((option) => (
                        <div key={option} className='mr-2 px-2 rounded-md border border-1 border-[#CAC8C7]'>
                            <input type="checkbox" id={`${option.toLowerCase()}`} name="highlight-tab" />
                            <label htmlFor={`${option.toLowerCase()}`} className='pl-1'>{option}</label>
                        </div>
                    ))}
                </fieldset> */}

                <fieldset className='flex flex-row flex-wrap gap-4'>
                    <legend>value range</legend>
                    <div className='flex flex-row gap-1'>
                        <input type="radio" id="above" name="highlight-value" value="above" className='border border-1 border-[#CAC8C7] rounded-md px-1'></input>
                        <label htmlFor="above">above</label>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <input type="radio" id="between" name="highlight-value" value="between" className='border border-1 border-[#CAC8C7] rounded-md px-1'></input>
                        <label htmlFor="between">between</label>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <input type="radio" id="below" name="highlight-value" value="below" className='border border-1 border-[#CAC8C7] rounded-md px-1'></input>
                        <label htmlFor="below">below</label>
                    </div>
                </fieldset>



                <div className='flex flex-row gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="name">From</label>
                        <input className='border border-1 border-[#CAC8C7] rounded-md px-1'></input>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="name">To</label>
                        <input className='border border-1 border-[#CAC8C7] rounded-md'></input>
                    </div>
                </div>

                <div className='flex flex-row gap-4 content-center justify-center pt-4'>
                    <input type='button' value="Cancel" className='border border-1 border-[#CAC8C7] rounded-md min-w-[90px]'></input>
                    <input type='submit' value="Create" className='border border-1 border-[#CAC8C7] rounded-md min-w-[90px]'></input>
                </div>

            </form>

        </div>
    );
}

export default CreateTagForm;