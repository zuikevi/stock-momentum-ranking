import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
// import { Footer } from "~/components/Footer";
import AllSectors from "~/components/AllSectors";
import Stock from "~/components/Stock";

export const meta: MetaFunction = () => {
    return [
        { title: "stock momentum rankings" },
        { name: "stock momentum rankings", content: "stock momentum rankings" },
    ];
};

export default function Index() {
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
    const [view, setView] = useState('Both'); // both, stm, ltm

    const handleSymbolSelect = (symbol: string) => {
        setSelectedSymbol(symbol);
    };

    return (
        <div className="font-sans p-0 lg:p-2 lg:pt-8 mx-auto">
            <Navbar />

            <div className="flex flex-row flex-wrap justify-center mt-14 mx-auto conter-center">

                <section className={`flex flex-row gap-3 p-1 font-semibold text-sm`}>
                    {['Both', 'STM', 'LTM', '1D', '5D', '1M', '1Y', '3Y', '5Y', 'max'].map((option) => (
                        <button
                            key={option}
                            type="button"
                            id={`sort-${option.toLowerCase()}`}
                            aria-pressed={view === option}
                            aria-labelledby={`sort-${option.toLowerCase()}`}
                            onClick={() => setView(option)}
                            className={`${view === option ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                        >
                            {option}
                        </button>
                    ))}
                </section>

                <div className="flex flex-row flex-wrap p-1 gap-1">
                <div className="flex flex-col lg:flex-row lg:min-w-[460px] lg:max-w-[460px] pt-3 px-2 lg:pl-2 bg-[#E5E5E4] rounded-md">
                        {selectedSymbol && <Stock symbol={selectedSymbol} />}
                    </div>
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Industrials'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Information Technology'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Health Care'} view={view} />

                    
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Financials'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Consumer Discretionary'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Consumer Staples'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Energy'} view={view} />
                    
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Communication Services'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Materials'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Real Estate'} view={view} />
                    <AllSectors onSymbolSelect={handleSymbolSelect} sectorSelect={'Utilities'} view={view} />

                    
                </div>



                {/* <div className="flex flex-row h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[620px] lg:w-[1060px] pb-10">
                    <TradingViewWidget /> 
                </div> */}

            </div>

            {/* <Footer /> */}
        </div>
    );
}