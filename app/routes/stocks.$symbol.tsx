import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import { useData } from '../context/DataContext';
import { useParams, Link } from '@remix-run/react';
import { FaChevronLeft } from "react-icons/fa";
import Stock from "~/components/Stock";

export const meta: MetaFunction = () => {
  return [
    { title: "stock momentum rankings" },
    { name: "stock momentum rankings", content: "stock momentum rankings" },
  ];
};

export default function Index() {
  const data = useData();
  const { symbol } = useParams<{ symbol: string }>();

  if (!data) {
    return <div>Loading...</div>;
  }
  const selected = data.companyData.data.find(row => row[0] === symbol);

  // const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);

  if (!selected) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans p-4 bg-[#F2F1EF]">
      <Navbar />

      <div className="relative min-h-0 w-full max-w-4xl mx-auto py-2 px-2 gap-1 text-[#141414] text-2xl mt-20">

        <div className="flex flex-row gap-2 pb-20">
          <p className="cursor-pointer text-sm font-medium underline pt-1"><FaChevronLeft /></p>

          <p className="cursor-pointer text-sm font-medium underline"><Link to="/">back</Link></p>
          <p className="cursor-pointer text-sm font-medium">{"/"}</p>
          <p className="cursor-pointer text-sm font-medium underline">{selected[0]}</p>
        </div>

        <Stock symbol={String(selected[0])} />

      </div>
    </div>
  );
}
