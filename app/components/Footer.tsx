import { FaChevronDown } from "react-icons/fa";
import { Link } from '@remix-run/react';

export function Footer() {

  return (
    <div className="relative max-w-[1060px] rounded-lg content-end min-h-0 w-full mx-auto px-2 gap-1 text-[#141414] text-body">

      <div className="flex flex-row justify-between">
        <div>
        <p className="navbar-name cursor-pointer h-8 content-center">ico</p>
        <p className="inline-block m-1 rounded-lg px-2 py-1 text-xs h-8 content-center">*momentum percentiles are based on weighted data</p>
        </div>
        

        <div className="flex flex-row">
          <p className="pt-2.5 text-sm">github/original</p>
          <p className="pt-2.5 pl-2 text-sm">github/webapp</p>
        </div>
      </div>
    </div>
  );
}
