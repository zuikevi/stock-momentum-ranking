import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
// import { Navbar } from "~/components/Navbar";
// import { Footer } from "~/components/Footer";
// import TopPicks from "~/components/TopPicks";
import StocksByTag from "~/components/StocksByTag";
import Stock from "~/components/Stock";
import TradingViewWidget from "~/components/TradingViewWidget";
import { FaChevronDown} from "react-icons/fa";
import { useData } from '../context/DataContext';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Momentak" },
    { name: "Momentak", content: "stock momentum rankings" },
  ];
};

export default function Index() {
  const data = useData();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const assets = data?.filterData;

  const [view, setView] = useState('Both'); // both, stm, ltm
  const [layout, setLayout] = useState('split'); // all, split, table

  const [sectorSort, setSector] = useState('All Stocks');
  const sectors = ["All Sectors", "Health Care", "Information Technology", "Materials", "Communication Services", "Utilities",
    "Financials", "Consumer Staples", "Energy", "Industrials", "Real Estate", "Consumer Discretionary"];

  const [filterSelect, setFilterSelected] = useState(false);
  const [searchSelect, setSearchSelected] = useState(false);


  const temp = data?.assetData?.filter(item => (item.subIndustry === "Semiconductor Materials & Equipment" || item.subIndustry === "Electronic Equipment & Instruments"
    || item.subIndustry === "Electronic Components" || item.subIndustry === "Semiconductors" || item.subIndustry === "Electrical Components & Equipment"));
  const symbols = temp?.map(item => item.symbol);

  return (
    <div className="font-sans p-0 lg:p-8 mx-auto">

      <div className="flex flex-row pt-20">
        <aside className="font-sans font-semibold text-sm pl-10 pr-20 text-[#FFFFFF] lg:w-[350px]">

          {/* aside button code set-up start */}
          <p className="pt-14">Split by</p>

          <div className="flex flex-row pt-1">
            <button
              key="all"
              type="button"
              id={`display-all`}
              aria-pressed={layout === 'all'}
              aria-labelledby={`sort-all`}
              onClick={() => { setLayout('all'), setSector("All Sectors") }}
              className={`${layout === 'all' ? 'bg-[#DCF367] text-[#121212]' : 'bg-[#121212] text-[#CAC8C7]'} rounded-md ml-2 px-1`}
            >
              none
            </button>
            <button
              key="display-split-by-sector"
              type="button"
              id={`display-split-by-sector`}
              aria-pressed={layout === 'split-by-sector'}
              aria-labelledby={`display-split-by-sector`}
              onClick={() => setLayout('split-by-sector')}
              className={`${layout === 'split-by-sector' ? 'bg-[#DCF367] text-[#121212]' : 'bg-[#121212] text-[#CAC8C7]'} rounded-md ml-2 px-1`}
            >
              sector
            </button>
            <button
              key="display-split"
              type="button"
              id={`display-split`}
              aria-pressed={layout === 'split'}
              aria-labelledby={`display-split`}
              onClick={() => setLayout('split')}
              className={`${layout === 'split' ? 'bg-[#DCF367] text-[#121212]' : 'bg-[#121212] text-[#CAC8C7]'} rounded-md ml-2 px-1`}
            >
              tag
            </button>
          </div>

          <p className="pt-6">Customise</p>

          <div className="flex flex-row pl-4 pt-1 flex-wrap pb-2">
            <button
              key="filter-popup-toggle"
              type="button"
              id={`filter-popup-toggle`}
              aria-pressed={layout === 'filter-popup-toggle'}
              aria-labelledby={`filter-popup-toggle`}
              onClick={() => { setFilterSelected(!filterSelect)}}
              className={`flex flex-row content-center justify-center sm:min-w-0 lg:min-w-4 font-semibold text-sm rounded-full border border-1 
                hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#121212] border-[#121212] bg-[#121212] text-[#FFFFFF] 
                ${layout === 'filter-popup-toggle' ? 'text-[#FFFFFF]' : 'text-[#FFFFFF]'}`}
            >
              <p className="">Filter:</p>
              <p className="bg-[#DCF367] text-[#121212] rounded-md ml-2 px-1">{`${sectorSort}`}</p>
            </button>
            <div className={`${filterSelect === true ? '' : 'hidden'} mb-4`}>
              {sectors?.map((sector) => (
                <button
                  key={sector}
                  onClick={() => { setSector(sector) }}
                  className={`flex flex-col gap-0.5 text-left font-semibold text-sm px-2 rounded-md
                        hover:text-[#141414] hover:px-2 hover:border-[#CAC8C7] hover:bg-[#E1DFDD]
                                ${sectorSort == sector ? 'text-[#121212] px-2 border-[#DCF367] bg-[#DCF367]' : 'text-[#CAC8C7]'}`}>
                  {sector}
                </button>
              ))}
            </div>

          </div>

          <div className={`flex flex-row pl-4 gap-2 font-semibold text-sm flex-wrap pb-2`}>
            <p className="">Sort by</p>
            {/* <p className="bg-[#DCF367] text-[#121212] rounded-md ml-2 px-1">1D</p> */}
            {['Both', 'STM', 'LTM', '1D', '5D', '1M', '1Y', '3Y', '5Y'].map((option) => (
              <button
                key={option}
                type="button"
                id={`sort-${option.toLowerCase()}`}
                aria-pressed={view === option}
                aria-labelledby={`sort-${option.toLowerCase()}`}
                onClick={() => setView(option)}
                className={`${view === option ? 'bg-[#DCF367] text-[#121212] rounded-md px-1' : 'text-[#CAC8C7]'}`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="pl-4 underline">Heatmap Colours</p>
          <p className="pl-4 underline">Highlights</p>

          <div className="flex flex-row pt-1">
            <p className="pl-4">Dynamic Size</p>
            <p className="bg-[#CAC8C7] text-[#121212] rounded-md ml-2 px-1">off</p>
          </div>

          <p className="pt-6">Advanced Settings</p>
          <div className="flex flex-row pt-1">
            <p className="pl-4">Data Selection</p>
            <p className="pl-1 pt-0.5 content-center"><FaChevronDown size={12} /></p>
          </div>
          <div className="flex flex-row pt-1">
            <p className="pl-4">Adjust Weights</p>
            <p className="pl-1 pt-0.5 content-center"><FaChevronDown size={12} /></p>
          </div>

          <br></br>
          <p className="pt-60">How It Works</p>
          <p className="pt-1">API Data</p>
          <p className="pt-1">Settings</p>
          <p className="pt-1">Log Off</p>
        </aside>

        <div className="flex justify-center mx-auto lg:mx-20">
          <div className="max-w-[400px] lg:max-w-[1290px] flex flex-col">


            <div className="flex flex-row gap-2 pb-2">
              <Link to="/"><img
                src="/cat.png"
                alt="Icon"
                className="h-8 inline-block rounded-md"
              /></Link>
              <div className="flex flex-row rounded-md border border-r-1 border-[#292929] max-w-[260px] mb-2">
                <input
                  type="text"
                  placeholder="Search stocks or tags..."
                  className="flex font-semibold rounded-md w-[240px] pl-1 text-[#525252] py-0.5 bg-[#292929]">
                </input>
                <button
                  key="all"
                  type="button"
                  id={`display-all`}
                  aria-pressed={layout === 'all'}
                  aria-labelledby={`sort-all`}
                  onClick={() => setSearchSelected(!searchSelect)}
                  className={`${layout === 'all' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
                >
                </button>
              </div>
            </div>

            <div className="flex flex-row ">
              <div>

                <div className={`${layout === 'split' ? '' : 'hidden'}`}>
                  <StocksByTag
                    onSymbolSelect={handleSymbolSelect}
                    tagText={"Watchlist"}
                    assetsToDisplay={data?.filterData?.filter(item => (item.watchlist === true))}
                    view={view}
                  />

                  <StocksByTag
                    onSymbolSelect={handleSymbolSelect}
                    tagText={"holding since covid"}
                    assetsToDisplay={data?.filterData?.filter(item => item.symbol === "MRNA" || item.symbol === "CE" || item.symbol === "CMG" || item.symbol === "PARA" || item.symbol === "AAL")}
                    view={view}
                  />

                  <StocksByTag
                    onSymbolSelect={handleSymbolSelect}
                    tagText={"hardware / chip stocks"}
                    assetsToDisplay={data?.filterData?.filter(item => symbols?.includes(item.symbol))}
                    view={view}
                  />

                  <StocksByTag
                    onSymbolSelect={handleSymbolSelect}
                    tagText={"1D change > 6%"}
                    assetsToDisplay={data?.filterData?.filter(item => ((item['1D'] >= 6) || (item['1D'] <= -6)))}
                    view={"1D"}
                  />
                </div>

                <div className={`${layout === 'all' ? '' : 'hidden'}`}>
                  <StocksByTag
                    onSymbolSelect={handleSymbolSelect}
                    tagText={sectorSort}
                    assetsToDisplay={(sectorSort === "All Sectors") ? assets : data?.filterData?.filter(item => sectorSort.includes(item.sector))}
                    view={view}
                  />
                  {/* <TopPicks onSymbolSelect={handleSymbolSelect} sectorSelect={sectorSort} setFilter={filter} view={view} /> */}
                </div>

                <div className={`${layout === 'split-by-sector' ? '' : 'hidden'} flex flex-row flex-wrap p-1 gap-1`}>
                  {['Industrials', 'Information Technology', 'Health Care', 'Financials', 'Consumer Discretionary', 'Consumer Staples', 'Real Estate',
                    'Utilities', 'Energy', 'Communication Services', 'Materials'].map((option) => (
                      <StocksByTag
                        key={option}
                        onSymbolSelect={handleSymbolSelect}
                        tagText={option}
                        assetsToDisplay={data?.filterData?.filter(item => (item.sector === option))}
                        view={view}
                      />
                    ))}
                </div>

                {/* <div className={`${layout === 'list' ? '' : 'hidden'}`}>
                <Momentum onRowSelect={handleSymbolSelect} />
              </div> */}
              </div>

              <div className="flex flex-col lg:flex-col">
                <div className="pr-2 pt-10 pl-6 pb-6">
                  {selectedSymbol && <Stock symbol={selectedSymbol} />}
                </div>
                <div className="h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[390px] lg:w-[660px] mb-2 pr-6 hidden sm:hidden lg:block pl-4">
                  <TradingViewWidget />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}