// import { FaChevronDown } from "react-icons/fa";
import { Link } from '@remix-run/react';

export function Navbar() {
  return (
    <div className="relative flex flex-row justify-between min-h-0 w-full p-8 lg:p-0 lg:max-w-[1060px] mx-auto pb-2 px-2 gap-1 text-[#141414] text-body">

      <div className="flex flex-row justify-start content-center">
        <p className="cursor-pointer h-8 content-center">
          <Link to="/"><img
            src="/cat.png"
            alt="Icon"
            className="h-8 inline-block rounded-md"
        /></Link></p>
        <p className="navbar-btn cursor-pointer content-center hover:bg-[#E4E4E4] rounded-md"><Link to="/">Home</Link></p>
        {/* <p className="navbar-btn cursor-pointer content-center hover:bg-[#E4E4E4] rounded-md"><Link to="/about">About</Link></p> */}
        <p className="navbar-btn cursor-pointer content-center hover:bg-[#E4E4E4] rounded-md"><Link to="/">Stocks</Link></p>
      </div>
    </div>
  );
}
