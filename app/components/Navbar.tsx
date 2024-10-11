import { FaChevronDown } from "react-icons/fa";
import { Link } from '@remix-run/react';

export function Navbar() {

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 min-h-0 w-full max-w-6xl mx-auto py-2 px-2 gap-1 text-[#141414] text-body">

      <div className="col-span-1 flex flex-row justify-start">
        <p className="navbar-name cursor-pointer"><Link to="/">stocks</Link></p>
      </div>

      <div className="col-span-2 flex flex-row justify-center">
        <p className="navbar-btn cursor-pointer"><Link to="/momentum">momentum</Link></p>
        <div className="navbar-btn flex flex-row cursor-pointer">
          <p>more</p>
          <p className="content-center pl-2 pt-0.5 text-xs"><FaChevronDown /></p>
        </div>
      </div>
    </div>
  );
}
