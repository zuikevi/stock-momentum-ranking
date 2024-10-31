import React, { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import TopPicks from "~/components/TopPicks";
import Stock from "~/components/Stock";
import TradingViewWidget from "~/components/TradingViewWidget";

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

      <div className="flex justify-center mt-14 mx-auto lg:mx-20">
        <div className="max-w-[1140px] flex flex-col md:justify-end">

          <div className="flex flex-col sm:flex-col lg:flex-row pb-2 w-full">



            <div className="w-full lg:w-full flex p-2">
              <TopPicks onSymbolSelect={handleSymbolSelect} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 w-full lg:w-full px-2 lg:pr-6 mb-6 lg:mb-0">
            {selectedSymbol && <Stock symbol={selectedSymbol} />}
            {/* {selectedSymbol && <Stock symbol={selectedSymbol} />} */}

            <div className="relative min-h-12 cursor-pointer max-w-96 min-w-44 text-[#141414] mb-6 pb-1 rounded-lg border-2 border-dashed border-[#CAC8C7]">
              <p className="text-[#CAC8C7] text-center font-semibold pt-3 lg:pt-12">compare</p>
            </div>
          </div>

          <div className="h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[620px] lg:w-[1120px]">
            <TradingViewWidget />
          </div>
        </div>

      </div>

    </div>
  );
}