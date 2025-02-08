import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import Momentum from "~/components/Momentum";
import Stock from "~/components/Stock";
import { Link } from '@remix-run/react';
import { FaChevronLeft } from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [
    { title: "stock momentum rankings" },
    { name: "stock momentum rankings", content: "stock momentum rankings" },
  ];
};

export default function Index() {
  // Move useState and the handler inside the component
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Function to handle symbol selection from TopPicks
  const handleRowSelect = (symbol: string) => {
    setSelectedRow(symbol);
  };

  return (
    <div className="font-sans lg:p-2 lg:pt-8">
      <Navbar />

      <div className="grid place-content-center">
        <div className="flex flex-row gap-2 pb-2 pt-12">
          <p className="cursor-pointer text-sm font-medium underline pt-1"><FaChevronLeft /></p>

          <p className="cursor-pointer text-sm font-medium underline"><Link to="/">back</Link></p>
          <p className="cursor-pointer text-sm font-medium">{"/"}</p>
          <p className="cursor-pointer text-sm font-medium underline">table view</p>
        </div>

        <div className="sticky top-0 bg-[#F2F1EF] w-full inline-block mx-auto">
          {selectedRow && <Stock symbol={selectedRow} />}
        </div>
        <Momentum onRowSelect={handleRowSelect} />
      </div>
    </div>
  );
}
