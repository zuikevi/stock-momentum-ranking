import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { FaChevronDown } from "react-icons/fa";


interface DataRow {
    symbol: string;
    security: string;
    sector: string;
    price: number | undefined;
    STM: number | undefined;
    LTM: number | undefined;
}

interface MomentumProps {
    onRowSelect: (symbol: string) => void;
}

const Momentum: React.FC<MomentumProps> = ({ onRowSelect }) => {
    const data = useData();

    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
        key: null,
        direction: 'ascending',
    });

    const [showAllRows, setShowAllRows] = useState(false); // State to toggle row display

    const sortedData = useMemo(() => {
        if (!data || !sortConfig.key) return data?.combinedDataPreview.data;

        const sortedData = [...data.combinedDataPreview.data].sort((a, b) => {
            const key = sortConfig.key as keyof DataRow;

            if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                return sortConfig.direction === 'ascending'
                    ? (a[key] as number) - (b[key] as number)
                    : (b[key] as number) - (a[key] as number);
            } else {
                return sortConfig.direction === 'ascending'
                    ? (a[key] as string).localeCompare(b[key] as string)
                    : (b[key] as string).localeCompare(a[key] as string);
            }
        });

        return sortedData;
    }, [data, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const rowsToDisplay = showAllRows ? sortedData : sortedData?.slice(0, 20); // Determine rows to display


    return (
        <div className='grid place-content-center text-[#141414] mx-auto text-xs sm:text-xs lg:text-base'>
            <table className="mt-6 text-wrap truncate table-fixed rounded-lg outline outline-1 outline-offset-0 outline-[#363A44]">
                <thead>
                    <tr>
                        {data.combinedDataPreview.columns.map((column, index) => (
                            <th
                                key={index}
                                onClick={() => requestSort(column)}
                                className={`px-2 py-1 text-left cursor-pointer font-medium bg-[#FFFFFF]`}
                            >
                                <div className='flex flex-row'>
                                    <p>{column}</p>
                                    {/* <p className="content-center pl-1 pt-0.5 text-sm underline"><FaChevronDown /></p> */}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowsToDisplay?.map((row, index) => (
                        <tr
                            key={index}
                            onClick={() => onRowSelect(row.symbol)}
                            className={`cursor-pointer
                                ${index % 2 === 0 ? 'bg-[#F2F1EF]' : 'bg-[#FFFFFF]'} 
                                ${row.STM! > 0.5 && row.LTM! > 0.5 ? `hover:bg-[#DCF367]` : `hover:bg-[#E1DFDD]`}`}
                        >
                            {Object.values(row).map((cell, i) => (
                                <td key={i} className={`text-wrap truncate px-2 py-1 ${i === 0 ? 'w-12 sm:w-12 lg:w-14' : i === 1 ? 'w-32 sm:w-32 lg:w-56' : i === 2 ? 'w-32 sm:w-32 lg:w-56' : 'w-20 sm:w-20 lg:w-20'}`}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-2">
                <button
                    onClick={() => setShowAllRows(!showAllRows)} // Toggle between showing 10 rows or all rows
                    className="mr-2 font-bold text-[#141414] cursor-pointer text-sm flex flex-row"
                >
                    {showAllRows ? 'show less' : 'show all'}
                    <p className="content-center pl-1 pt-1 text-sm underline"><FaChevronDown /></p>
                </button>
            </div>

            <div className="financial-modeling-prep-attribution">
                <a
                    href="https://financialmodelingprep.com/developer/docs/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="text-blue-500 underline text-sm">Data provided by Financial Modeling Prep</span>
                </a>
            </div>
        </div>
    );
}

export default Momentum;