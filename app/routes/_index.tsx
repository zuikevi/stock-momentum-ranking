import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
// import { Footer } from "~/components/Footer";
import TopPicks from "~/components/TopPicks";
import StocksByTag from "~/components/StocksByTag";
// import AllSectors from "~/components/AllSectors";
// import Momentum from "~/components/Momentum";
// import CreateTagForm from "~/components/CreateTagForm";
// import AddToWatchlistForm from "~/components/AddToWatchlistForm";
import Stock from "~/components/Stock";
// import TradingViewWidget from "~/components/TradingViewWidget";
import { TbEyeClosed, TbLayoutGrid, TbListDetails, TbSquare } from "react-icons/tb";
import { FaChevronDown, FaChevronRight, FaChevronLeft, FaTags, FaSearch } from "react-icons/fa";
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

  const [view, setView] = useState('Both'); // both, stm, ltm
  const [layout, setLayout] = useState('split'); // all, split, table ... sector, tags

  const [sectorSort, setSector] = useState('All Stocks');
  const sectors = ["All Sectors", "Health Care", "Information Technology", "Materials", "Communication Services", "Utilities",
    "Financials", "Consumer Staples", "Energy", "Industrials", "Real Estate", "Consumer Discretionary"];

  const [filter, filterSelect2] = useState('');
  const tags = [["Watchlist", "", "", "border-[#141414] bg-[#E1DFDD] text-[#141414]"],
  ["holding since covid", "", "", "border-[#EB284B] bg-[#C0E6B9] text-[#EB284B]"],
  // ["why did I buy this", "", "", "btnRedT2"],
  ["hardware / chip stocks", "", "Industrials", "border-[#35C184] bg-[#DCF367] text-[#35C184]"],
  // ["short-term", "", "", "border-[#773CBF] text-[#773CBF] bg-[#BEAAE0]"],
  // ["IT & Health Care above 0.9 stm", "STM", "Health Care", "border-[#EB284B] bg-[#C8EAF0] text-[#EB284B]"],
  ["1D change > 6%", "1D", "", "border-[#EB284B] bg-[#C8EAF0] text-[#EB284B]"]]

  const [filterSelect, setFilterSelected] = useState(false);
  const [valueSelect, setValueSelected] = useState(false);
  const [searchSelect, setSearchSelected] = useState(false);

  const handleSetSector = () => {
    if (sectorSort === "Watchlist") setSector("All Stocks");
    else setSector("Watchlist");
  };

  const handleSetFilter = (tag: string, sortBy: string) => {
    if (filter !== "" && tag == filter) filterSelect2("");
    else if (filter === "Watchlist" && tag == filter) filterSelect2("");
    else filterSelect2(tag);

    if (sortBy !== "") setView(sortBy);
  };

  const temp = data?.assetData?.filter(item => (item.subIndustry === "Semiconductor Materials & Equipment" || item.subIndustry === "Electronic Equipment & Instruments"
    || item.subIndustry === "Electronic Components" || item.subIndustry === "Semiconductors" || item.subIndustry === "Electrical Components & Equipment"));
  const symbols = temp?.map(item => item.symbol);

  return (
    <div className="font-sans p-0 lg:p-8 mx-auto">

      <div className="flex flex-row pt-20">
        <aside className="font-sans font-semibold text-sm pl-10 pr-20 text-[#FFFFFF]">

          <div className="flex flex-row flex-wrap gap-1 shrink cursor-pointer pb-2.5 pt-1">
            <button
              key="filter-popup-toggle"
              type="button"
              id={`filter-popup-toggle`}
              aria-pressed={layout === 'filter-popup-toggle'}
              aria-labelledby={`filter-popup-toggle`}
              onClick={() => { setFilterSelected(!filterSelect), setValueSelected(false) }}
              className={`flex flex-row content-center justify-center sm:min-w-0 lg:min-w-4 font-semibold text-sm px-2 rounded-full border border-1 
                hover:border-[#141414] hover:text-[#F2F1EF] hover:bg-[#121212] border-[#121212] bg-[#121212] text-[#FFFFFF] 
                ${layout === 'filter-popup-toggle' ? 'text-[#FFFFFF]' : 'text-[#FFFFFF]'}`}
            >
              <p>{`${sectorSort}, ${view}`}</p>
              <p className="pl-1 pt-0.5 content-center"><FaChevronDown /></p>
            </button>
          </div>

          {/* aside button code set-up start */}
          <p className="pt-14">Layout</p>
          <button
            key="all"
            type="button"
            id={`display-all`}
            aria-pressed={layout === 'all'}
            aria-labelledby={`sort-all`}
            onClick={() => {setLayout('all'), setSector("All Sectors")}}
            className="pl-4 pt-1"
          >
            All Stocks
          </button>

          <div className="flex flex-row pt-1">
            <p className="pl-4">Split by</p>
            <button
              key="display-split"
              type="button"
              id={`display-split`}
              aria-pressed={layout === 'split'}
              aria-labelledby={`display-split`}
              onClick={() => setLayout('split')}
              className="bg-[#121212] text-[#CAC8C7] rounded-md ml-2 px-1"
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
          <div className="flex flex-row pt-1">
            <p className="pl-4">Filter</p>
            <p className="pl-1 pt-0.5 content-center"><FaChevronDown size={12} /></p>
          </div>
          <div className="flex flex-row pt-1">
            <p className="pl-4">Sort by</p>
            <p className="bg-[#DCF367] text-[#121212] rounded-md ml-2 px-1">1D</p>
          </div>
          <div className="flex flex-row pt-1">
            <p className="pl-4">Heatmap Colours</p>
            <p className="pl-1 pt-0.5 content-center"><FaChevronDown size={12} /></p>
          </div>
          <div className="flex flex-row pt-1">
            <p className="pl-4">Highlights</p>
            <p className="pl-1 pt-0.5 content-center"><FaChevronDown size={12} /></p>
          </div>
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

              {/* <div className='flex flex-row gap-2 content-end pl-6 pb-1.5'>
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
                key="display-split"
                type="button"
                id={`display-split`}
                aria-pressed={layout === 'split'}
                aria-labelledby={`display-split`}
                onClick={() => setLayout('split')}
                className={`${layout === 'split' ? 'text-[#141414]' : 'text-[#CAC8C7]'}`}
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
            </div> */}
            </div>

            <div className="flex flex-row ">
              <div>

                {/* filter select start */}
                <div className={`${filterSelect === true ? '' : 'hidden'} mb-4`}>

                  <div className="flex flex-row justify-between pr-20">
                    <p className="font-semibold text-sm pt-1 text-[#FFFFFF]">Filter by GICS Sectors</p>
                    <button
                      onClick={() => { setSector("All Sectors") }}
                      className={`mt-1 font-semibold text-sm px-2 rounded-md border border-1
                                ${sectorSort == "All Stocks" ? 'text-[#E1DFDD] bg-[#F2F1EF] border-[#E1DFDD]' : 'text-[#141414] bg-white border-[#E1DFDD]'}`}>
                      clear
                    </button>
                  </div>

                  <div className='flex flex-col flex-wrap gap-1 pb-2 w-[600px] h-[120px]'>
                    {sectors?.map((sector) => (
                      <button
                        key={sector}
                        onClick={() => { setSector(sector) }}
                        className={`flex flex-col gap-0.5 text-left font-semibold text-sm px-2 rounded-md border border-1 border-[#F2F1EF]
                        hover:text-[#141414] hover:px-2 hover:border-[#CAC8C7] hover:bg-[#E1DFDD]
                                ${sectorSort == sector ? 'text-[#141414] px-2 border-[#CAC8C7] bg-[#E1DFDD]' : 'text-[#CAC8C7]'}`}>
                        {sector}
                      </button>
                    ))}
                  </div>

                  <p className="font-semibold text-sm text-[#FFFFFF]">Sort By</p>
                  <section className={`flex flex-row gap-3 p-1 font-semibold text-sm`}>
                    {['Both', 'STM', 'LTM', '1D', '5D', '1M', '1Y', '3Y', '5Y'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        id={`sort-${option.toLowerCase()}`}
                        aria-pressed={view === option}
                        aria-labelledby={`sort-${option.toLowerCase()}`}
                        onClick={() => setView(option)}
                        className={`hover:bg-[#E4E4E4] hover:rounded-md 
                        ${view === option ? 'text-[#141414] px-2 border border-1 border-[#CAC8C7] bg-[#E1DFDD] rounded-md' : 'text-[#CAC8C7]'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </section>

                  <section className="flex flex-row gap-20 pb-4">
                    <div>
                      <p className="font-semibold text-sm pb-1 pt-1 text-[#FFFFFF]">Heatmap</p>

                      <div className="flex flex-row gap-2 pt-0.5">
                        <p className={`flex flex-row cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                    border border-1 btnGreenT2 h-5 w-5 pt-0.5`}> </p>
                        <p className="font-semibold text-sm pt-0.5 text-[#FFFFFF]">{`${view}`}</p>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronRight size={12} /></p>
                        <input type="text" value="0.9" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                      </div>

                      <div className="flex flex-row gap-2 pt-0.5">
                        <p className={`flex flex-row cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                    border border-1 btnWhiteT1 h-5 w-5 pt-0.5`}> </p>
                        <input type="text" value="0.3" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronLeft size={12} /></p>
                        <p className="font-semibold text-sm pt-0.5 text-[#FFFFFF]">{`${view}`}</p>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronLeft size={12} /></p>
                        <input type="text" value="0.6" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><TbEyeClosed size={16} /></p>
                      </div>

                      <div className="flex flex-row gap-2 pt-0.5">
                        <p className={`flex flex-row cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                    border border-1 btnWhiteT2 h-5 w-5 pt-0.5`}> </p>
                        <p className="font-semibold text-sm pt-0.5 text-[#FFFFFF]">{`${view}`}</p>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronLeft size={12} /></p>
                        <input type="text" value="0.3" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                      </div>

                      <div className="flex flex-row gap-2 pt-0.5 pb-1">
                        <p className={`flex flex-row cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                    border border-1 btnRedT2 h-5 w-5 pt-0.5`}> </p>
                        <p className="font-semibold text-sm pt-0.5 text-[#FFFFFF]">{`${view}`}</p>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronLeft size={12} /></p>
                        <input type="text" value="0.1" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-sm pb-1 pt-4 text-[#FFFFFF]">Highlights</p>

                      <div className="flex flex-row gap-2 pt-0.5">
                        <p className={`flex flex-row cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                    border border-1 border-[#EB284B] text-[#EB284B] bg-[#AAD2E0] h-5 w-5 pt-0.5`}> </p>
                        <p className="font-semibold text-sm pt-0.5 text-[#FFFFFF]">{`${view}`}</p>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronRight size={12} /></p>
                        <input type="text" value="3%" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                      </div>

                      <div className="flex flex-row gap-2 pt-0.5">
                        <p className={`flex flex-row cursor-pointer content-center justify-center min-w-4 font-semibold text-sm px-2 rounded-md 
                    border border-1 border-[#EB284B] text-[#EB284B] bg-[#AAD2E0] h-5 w-5 pt-0.5`}> </p>
                        <p className="font-semibold text-sm pt-0.5 text-[#FFFFFF]">{`${view}`}</p>
                        <p className="pt-0.5 content-center text-[#FFFFFF]"><FaChevronLeft size={12} /></p>
                        <input type="text" value="-3%" className="flex rounded-md w-12 pl-1 text-[#141414]"></input>
                      </div>
                    </div>
                  </section>
                </div>
                {/* filter select end */}

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
                  <TopPicks onSymbolSelect={handleSymbolSelect} sectorSelect={sectorSort} setFilter={filter} view={view} />
                </div>

                {/* <div className={`flex flex-row flex-wrap p-1 gap-1 ${layout === 'split-by-sector' ? '' : 'hidden'}`}>
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
              </div> */}
              </div>

              <div className="flex flex-col lg:flex-col">
                <div className="pr-2 pt-10 pl-6">
                  {selectedSymbol && <Stock symbol={selectedSymbol} />}
                </div>
                {/* <div className="h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[390px] lg:w-[660px] mb-2 pr-6 hidden sm:hidden lg:block pl-4">
                <TradingViewWidget />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}