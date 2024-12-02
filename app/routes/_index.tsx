import React, { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { Landing } from "~/components/Landing";
import TopPicks from "~/components/TopPicks";
import Stock from "~/components/Stock";
import TradingViewWidget from "~/components/TradingViewWidget";
import Watchlist from "~/components/Watchlist";

export const meta: MetaFunction = () => {
  return [
    { title: "stock momentum rankings" },
    { name: "stock momentum rankings", content: "stock momentum rankings" },
  ];
};

export default function Index() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="font-sans p-0 lg:p-4 mx-auto">
      <Navbar />
      {/* <Landing/> */}

      <div className="flex justify-center mt-14 mx-auto lg:mx-20">
        <div className="max-w-[1060px] flex flex-col md:justify-end">

          <div className="flex flex-col sm:flex-col lg:flex-col pb-10 lg:min-h-64 justify-start place-content-start">
            <div className="w-full lg:w-full flex p-2">
              <TopPicks onSymbolSelect={handleSymbolSelect} />
            </div>

            <div className="flex flex-col lg:flex-col gap-0 w-full lg:w-full pt-6 px-2 pb-3 lg:pl-2">
              {selectedSymbol && <Stock symbol={selectedSymbol} />}
            </div>
          </div>

          

          <div className="flex flex-row h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[520px] lg:w-[1060px] pb-10">
            <div>
              {/* <Watchlist symbol={"NVDA"} /> */}
              {/* <div className='flex flex-row pt-4 text-center justify-center'>
                <p className="ml-1 px-2 py-0.5 font-semibold text-sm rounded-full bg-[#DCF367] border border-1 border-[#C2D75B]">sign in</p>
                <p className="px-2 py-1 font-semibold text-sm">to edit</p>
              </div> */}
            </div>

            {/* <TradingViewWidget />  */}
          </div>

        </div>

      </div>

      {/* <Footer /> */}
    </div>
  );
}