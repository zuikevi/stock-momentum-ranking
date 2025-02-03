import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
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

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="font-sans p-0 lg:p-8 mx-auto">
      <Navbar />

      <div className="flex justify-center mt-14 mx-auto lg:mx-20">
        <div className="max-w-[1060px] flex flex-col md:justify-end">


          <div className="flex flex-col sm:flex-col lg:flex-col pb-10 lg:min-h-64 justify-start place-content-start">
            <div className="w-[980px] lg:w-[980px] flex p-2 pb-3">
                <AllSectors onSymbolSelect={handleSymbolSelect}/>
              {/* <TopPicks onSymbolSelect={handleSymbolSelect} /> */}
              {/* <TierList onSymbolSelect={handleSymbolSelect} /> */}

            </div>

            <div className="flex flex-col lg:flex-col gap-0 w-full lg:w-full pt-3 px-2 pb-1 lg:pl-2 bg-[#E5E5E4] rounded-md">
              {selectedSymbol && <Stock symbol={selectedSymbol} />}
            </div>
          </div>
          <div className="flex flex-row h-[440px] w-full sm:h-[440px] sm:w-full lg:h-[620px] lg:w-[1060px] pb-10">
            {/* <TradingViewWidget />  */}
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}