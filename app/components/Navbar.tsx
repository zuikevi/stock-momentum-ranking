import { FaChevronDown } from "react-icons/fa";
import { Link } from '@remix-run/react';

export function Navbar() {

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 min-h-0 w-full max-w-[1060px] mx-auto pb-2 px-2 gap-1 text-[#141414] text-body">

      <div className="col-span-1 flex flex-row justify-start content-center">
        <p className="navbar-name cursor-pointer h-8 content-center"><Link to="/">ico</Link></p>
        <p className="navbar-btn cursor-pointer pt-1"><Link to="/">Filter </Link></p>
        <p className="navbar-btn cursor-pointer pt-1"><Link to="/momentum">Table</Link></p>
        {/* <div className="navbar-btn flex flex-row cursor-pointer pt-1">
          <p>Docs</p>
          <p className="content-center pl-2 pb-0.5 text-xs"><FaChevronDown /></p>
        </div> */}
      </div>
    </div>
  );
}
