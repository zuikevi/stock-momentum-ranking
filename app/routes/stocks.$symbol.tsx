import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import { useData } from '../context/DataContext';
import { useParams } from '@remix-run/react';
import { TbListDetails } from "react-icons/tb";
import { RiInformation2Line } from "react-icons/ri";
import { Link } from '@remix-run/react';
import { FaChevronLeft } from "react-icons/fa";
import { FiChevronsUp } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { MdOutlineShowChart } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";

export const meta: MetaFunction = () => {
  return [
    { title: "stock momentum rankings" },
    { name: "stock momentum rankings", content: "stock momentum rankings" },
  ];
};

export default function Index() {
  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  const { symbol } = useParams<{ symbol: string }>();
  const selected = data.companyData.data.find(row => row[0] === symbol);

  const priceData = data.combinedDataPreview.data.find(pv => pv.symbol === symbol);

  if (!selected) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans p-4 bg-[#F2F1EF]">
      <Navbar />

      <div className="relative min-h-0 w-full max-w-4xl mx-auto py-2 px-2 gap-1 text-[#141414] text-2xl mt-20">

        <div className="flex flex-row gap-2 pb-20">
          <p className="cursor-pointer text-sm font-medium underline pt-1"><FaChevronLeft /></p>

          <p className="cursor-pointer text-sm font-medium underline"><Link to="/">charts</Link></p>
          <p className="cursor-pointer text-sm font-medium">{"/"}</p>
          <p className="cursor-pointer text-sm font-medium underline">{selected[0]}</p>
        </div>


        <div className="flex flex-row justify-start mx-auto flex-wrap pb-4">
          <p className="text-lg font-semibold">{selected[0]}</p>
          <p className="text-lg font-semibold pl-3">{priceData?.price}</p>
          <p className="text-[#888EA0] font-semibold text-sm text-end content-end pl-0.5 pb-0.5">USD</p>
          <p className="text-lg font-semibold pl-3">{priceData?.STM}</p>
          <p className="text-[#888EA0] font-semibold text-sm text-end content-end pl-0.5 pb-0.5">STM</p>
          <p className="text-lg font-semibold pl-3">{priceData?.LTM}</p>
          <p className="text-[#888EA0] font-semibold text-sm text-end content-end pl-0.5 pb-0.5">LTM</p>
        </div>

        <div className="flex justify-start gap-4 pt-0 pb-10">
            <div className="flex flex-row pt-1">
              <FiChevronsUp />
              <p className="text-[#888EA0] font-semibold text-xs text-end content-center">TOP 20 STM</p>
              {/* <p className="text-base font-regular pr-6">above 80% of other snp500 stocks</p> */}
            </div>

            <div className="flex flex-row pt-1">
              <FiChevronUp />
              <p className="text-[#888EA0] font-semibold text-xs text-end content-center">TOP 50 LTM</p>
              {/* <p className="text-base font-regular pr-6">above 60% of other snp500 stocks</p> */}
            </div>

            <div className="flex flex-row pt-1">
            <MdOutlineShowChart />
              <p className="text-[#888EA0] font-semibold text-xs text-end content-center">HIGH STM & LTM</p>
              {/* <p className="text-base font-regular pr-6">momentum is high both short-term and long-term</p> */}
            </div>
          </div>

        <div>
            <p className="text-lg font-semibold">{selected[1]}</p>
            <div className="flex flex-row justify-start mx-auto flex-wrap">
              <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">SECTOR:</p>
              <p className="text-base font-regular pr-6">{selected[2]}</p>
              <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">SUB-INDUSTRY:</p>
              <p className="text-base font-regular pr-6">{selected[3]}</p>
            </div>

            <div className="flex flex-row justify-start mx-auto flex-wrap pt-1">
              <p className="text-[#888EA0] font-semibold text-xs text-end content-center pr-2">HEADQUARTERS:</p>
              <p className="text-base font-regular pr-6">{selected[4]}</p>
            </div>
          </div>

         




      </div>
    </div>
  );
}
