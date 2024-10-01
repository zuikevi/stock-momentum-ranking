import { FaChevronDown } from "react-icons/fa";
import { useData } from '../context/DataContext';

export function Tickers() {
    const jsonData = useData();

    if (!jsonData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative min-h-0 w-full max-w-[1500px] mx-auto py-2 px-2 gap-1 text-[#191919] text-body">

            <div className="flex flex-row justify-center mx-auto flex-wrap mt-40">

                {jsonData.companyData.data.slice(0, 10).map((item, index) => (
                    <div className="bg-[#E3E2DF] m-1 rounded-full px-2 py-1 text-sm font-medium flex flex-row cursor-pointer">
                        <p key={index}>{item[0]}</p>

                        <p className="content-center pl-2 pt-0.5 text-xs"><FaChevronDown /></p>
                    </div>

                ))}

            </div>
        </div>
    );
}
