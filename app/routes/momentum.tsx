import React, { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import { Preview } from "~/components/Preview";
import Momentum from "~/components/Momentum";
import Stock from "~/components/Stock";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
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
    <div className="font-sans p-4">
      <Navbar />
      <div className="fixed pt-24">
          {selectedRow && <Stock symbol={selectedRow} />}
        </div>
      <Momentum onRowSelect={handleRowSelect} />
        
        




    </div>
  );
}
