import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { Link } from '@remix-run/react';
import { IoLogoGithub } from "react-icons/io";

export function Navbar() {
  const [sel, setSelected] = useState(false);

  return (
    <div className="relative flex flex-row justify-between min-h-0 w-full max-w-[1060px] mx-auto pb-2 px-2 gap-1 text-[#141414] text-body">

      <div className="flex flex-row justify-start content-center">
        <p className="navbar-name cursor-pointer h-8 content-center"><Link to="/">ico</Link></p>
        <p className="navbar-btn cursor-pointer content-center hover:bg-[#DCF367] rounded-md"><Link to="/">Filter </Link></p>
        <p className="navbar-btn cursor-pointer content-center hover:bg-[#DCF367] rounded-md"><Link to="/momentum">Table</Link></p>

        {/* <div
          onMouseEnter={() => setSelected(true)}
          onMouseLeave={() => setSelected(false)}
          className="navbar-btn flex flex-row cursor-pointer hover:bg-[#DCF367] rounded-md">

          <button className='py-0 p-0 pt-0'>Docs</button>
          <p className="content-center pl-2 pt-0.5 text-xs"><FaChevronDown /></p>

          <div className={`absolute text-sm text-nowrap cursor-pointer shadow-lg z-40 pt-6 ${sel ? '' : 'hidden'} `}>
            <div className='absolute flex flex-col flex-wrap gap-1 bg-white rounded-md'>
              <div className='flex flex-row gap-1'>
                <p className="content-center pt-0.5"><IoLogoGithub size={16} /></p>
                <p className="text-left px-1 py-1 bg-white rounded-md">original repo</p>
              </div>

              <div className='flex flex-row gap-1'>
                <p className="content-center pt-0.5"><IoLogoGithub size={16} /></p>
                <p className="text-left px-1 py-1 bg-white rounded-md">webapp</p>
              </div>
            </div>
          </div>

        </div> */}

      </div>

      <div className="cursor-pointer my-2 font-semibold text-sm flex gap-1">
        <p className="px-2 rounded-full border border-1 border-[#C2D75B] bg-[#DCF367]">sign in</p>
      </div>
    </div>
  );
}
