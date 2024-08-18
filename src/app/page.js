"use client"

import Hero from "@/components/hero";
import Icons from "@/components/icons";
import { useState } from "react";
import Dummy from '@/public/dummy.jpeg'
import Image from "next/image";

const Home = () => {

  const [searchAuthor, setSearchAuthor] = useState()
  const [searchTitle, setSearchTitle] = useState()

  return (
    <section className="w-screen">
        <Hero />

        {/* Content */}
        <div className="w-full h-max py-4 px-12 box-border">
          <div className="w-full mt-3">
            <div className="flex items-center w-full">
              <p className="font-bold text-[20px] mr-3 my-3 flex w-max">Author :</p>
              {/* Search Author */}
              <div className="w-[25%] flex py-3 items-center justify-between px-3 gap-3 rounded-lg border-[0.4px] border-[#BFBFBF]">
                <Icons type="find" className="flex items-center justify-center w-3 h-3" />
                <input type="text" name='searchAuthor' value={searchAuthor} onChange={e => setSearchAuthor(e.target.value)} placeholder="Search by author poetry" className="h-full w-[220px] text-slate-600 outline-0 border-0 text-[15px]" />
                <Icons type="close" className="flex items-center justify-center w-3 h-3 cursor-pointer active:scale-[0.98]" onClick={() => setSearchAuthor('')} />
              </div>
              {/* Search */}

              <p className="font-bold text-[20px] mr-1 ml-5 my-3 flex w-max">Title :</p>
              <div className="w-[25%] ml-3 flex py-3 items-center justify-between px-3 gap-3 rounded-lg border-[0.4px] border-[#BFBFBF]">
                <Icons type="find" className="flex items-center justify-center w-3 h-3" />
                <input type="text" name='title' value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder="Search by title poetry" className="h-full w-[220px] text-slate-600 outline-0 border-0 text-[15px]" />
                <Icons type="close" className="flex items-center justify-center w-3 h-3 cursor-pointer active:scale-[0.98]" onClick={() => setSearchTitle('')} />
              </div>
            </div>

            {/* List Genre */}
            <div className="w-max flex items-center mt-4 overflow-x-auto">
              <p className="font-bold text-[20px] mr-3 my-3 flex w-max">Genre :</p>
              <div className="flex items-center w-max overflow-x-auto">
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Personal Reflection</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Relationships</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Motivational</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Celebration</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Romantic</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Mystery</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Sadness</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Nature</div>
                <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Life</div>
              </div>
            </div>

            <hr className="my-7 w-full border border-slate-300" />

            <div className="w-full flex flex-wrap justify-between">
              {
                Array.from({ length: 10 }, (index) => (
                  <div key={index} className="w-[23%] mb-5 h-[350px] rounded-[12px] bg-white border border-slate-300 shadow-sm cursor-pointer active:scale-[0.98] duration-200 overflow-hidden">
                  
                    <div className="w-full h-1/2 overflow-hidden object-cover">
                      <Image src={Dummy} alt="Poetry Cover" className="w-full h-full object-cover" />
                    </div>
    
                    <div className="relative w-full p-3 h-1/2">
                      <h2 className="max-w-[90%] text-[18px] overflow-hidden whitespace-nowrap overflow-ellipsis">Title Poetry</h2>
                      <small className="max-w-[90%] text-[13px] overflow-hidden whitespace-nowrap overflow-ellipsis">Muhammad Khoirulhuda</small>
                      <hr className="my-4 border border-slate-200" />
                      <p className="bg-blue-200 text-blue-800 rounded-full absolute bottom-4 left-4 flex items-center justify-center px-4 py-2 w-max text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">Romantic</p>
                    </div>  
    
                  </div>
                ))
              }
            </div>

          </div>
        </div>

    </section>
  );
}

export default Home