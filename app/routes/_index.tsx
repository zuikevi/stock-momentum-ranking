import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
// import { Footer } from "~/components/Footer";
import TopPicks from "~/components/TopPicks";
import AllSectors from "~/components/AllSectors";
import Momentum from "~/components/Momentum";

import Stock from "~/components/Stock";
import TradingViewWidget from "~/components/TradingViewWidget";
import { TbLayoutGrid, TbListDetails, TbSquare } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

export const meta: MetaFunction = () => {
  return [
    { title: "Momentak" },
    { name: "Momentak", content: "stock momentum rankings" },
  ];
};

export default function Index() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const [view, setView] = useState('Both'); // both, stm, ltm
  const [layout, setLayout] = useState('all'); // all, split-by-sector, table

  const [sectorSort, setSector] = useState('All Stocks');
  const sectors = ["All Stocks", "Watchlist", "Health Care", "Information Technology", "Materials", "Communication Services", "Utilities",
    "Financials", "Consumer Staples", "Energy", "Industrials", "Real Estate", "Consumer Discretionary"];
  const [sel, setSelected] = useState(false);

  return (
    <div className="font-sans p-0 lg:p-8 mx-auto">
      <Navbar />

      {/* <aside className="absolute pt-20 hidden sm:hidden lg:block">
        {selectedSymbol && <Stock symbol={selectedSymbol} />}
      </aside> */}

      <div className="flex justify-center mt-14 mx-auto lg:mx-20">
        <div className="max-w-[400px] lg:max-w-[1080px] flex flex-col md:justify-end">
          <div className="flex flex-row">
            <div className='flex flex-row gap-2 content-end pr-6'>
              <button
                key="all"
                type="button"
                id={`display-all`}
                aria-pressed={layout === 'all'}
                aria-labelledby={`sort-all`}
                onClick={() => setLayout('all')}
                className={`${layout === 'all' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
              >
                <TbSquare size={18} />
              </button>

              <button
                key="display-split-by-sector"
                type="button"
                id={`display-split-by-sector`}
                aria-pressed={layout === 'split-by-sector'}
                aria-labelledby={`display-split-by-sector`}
                onClick={() => setLayout('split-by-sector')}
                className={`${layout === 'split-by-sector' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
              >
                <TbLayoutGrid size={18} />
              </button>

              <button
                key="display-list"
                type="button"
                id={`display-list`}
                aria-pressed={layout === 'list'}
                aria-labelledby={`display-list`}
                onClick={() => setLayout('list')}
                className={`${layout === 'list' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
              >
                <TbListDetails size={18} />
              </button>
            </div>

            <section className={`flex flex-row gap-3 p-1 font-semibold text-sm`}>
              {['Both', 'STM', 'LTM', '1D', '5D', '1M', '1Y', '3Y', '5Y'].map((option) => (
                <button
                  key={option}
                  type="button"
                  id={`sort-${option.toLowerCase()}`}
                  aria-pressed={view === option}
                  aria-labelledby={`sort-${option.toLowerCase()}`}
                  onClick={() => setView(option)}
                  className={`hover:bg-[#E4E4E4] hover:rounded-md ${view === option ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                >
                  {option}
                </button>
              ))}
            </section>
          </div>

          <div className="flex flex-row gap-1 shrink cursor-pointer pb-2 pt-1">
            <button
              key="filter-popup-toggle"
              type="button"
              id={`filter-popup-toggle`}
              aria-pressed={layout === 'filter-popup-toggle'}
              aria-labelledby={`filter-popup-toggle`}
              onClick={() => setSelected(!sel)}
              className={`flex flex-row content-center justify-center sm:min-w-0 lg:min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#141414] border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1] 
                ${layout === 'filter-popup-toggle' ? 'text-[#141414]' : 'text-[#38A8C1]'}`}
            >
              <p>{sectorSort}</p>
              <p className="pl-1 pt-0.5 content-center"><FaChevronDown /></p>
            </button>

          </div>

          <div className={`${sel === true ? '' : 'hidden'}`}>
            <div className='flex flex-row flex-wrap gap-1 pb-2'>
              {sectors?.map((sector) => (
                <button
                  key={sector}
                  onClick={() => { setSector(sector), setSelected(!sel) }}
                  className={`flex flex-col gap-0.5 text-left font-semibold text-sm px-2 rounded-full border border-1 
                                ${sectorSort == sector ? 'border-[#38A8C1] bg-[#C8EAF0] text-[#38A8C1]'
                      : 'border-[#38A8C1] bg-[#F2F1EF] text-[#38A8C1]'}`}>
                  {sector}
                </button>
              ))}
            </div>

          </div>

          <div className={`${layout === 'all' ? '' : 'hidden'}`}>
            <TopPicks onSymbolSelect={handleSymbolSelect} sectorSelect={sectorSort} view={view} />
          </div>

          <div className={`flex flex-row flex-wrap p-1 gap-1 ${layout === 'split-by-sector' ? '' : 'hidden'}`}>
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

          <div className={`${layout === 'list' ? '' : 'hidden'}`}>
            <Momentum onRowSelect={handleSymbolSelect} />
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="pl-2 pt-10 pr-6">
              {selectedSymbol && <Stock symbol={selectedSymbol} />}
            </div>


            <div className="h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[460px] lg:w-[1060px] pb-10 pr-6 hidden sm:hidden lg:block">
              <TradingViewWidget />
            </div>
          </div>


        </div>
      </div>


      {/* <Footer /> */}
    </div>
  );
}