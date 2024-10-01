import React, { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import TopPicks from "~/components/TopPicks";
import Stock from "~/components/Stock";
import TradingViewWidget from "~/components/TradingViewWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="font-sans p-4 mx-auto">
      <Navbar />

      <div className="flex justify-center mt-20 mx-auto">
        {/* <aside className="col-span-1 text-[#141414]">watchlist</aside> */}

        <div className="max-w-[1140px] flex flex-col md:justify-end">

          <div className="flex sm:flex-col md:flex-row pb-20">
            <div className="flex pr-6 md:basis-[660px] sm:basis-[300px]">
              {selectedSymbol && <Stock symbol={selectedSymbol} />}
            </div>
            <div className="flex justify-end text-end">
              <TopPicks onSymbolSelect={handleSymbolSelect} />
            </div>
          </div>

          <div className="sm:h-[200px] sm:w-[90px] lg:h-[620px] lg:w-[1120px]">
            <TradingViewWidget />
          </div>
        </div>

      </div>

    </div>
  );
}