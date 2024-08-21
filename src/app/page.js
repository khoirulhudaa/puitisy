"use client"

import Hero from "@/components/hero";
import Icons from "@/components/icons";
import Dummy from '@/public/dummy.jpeg';
import { url_endpoint } from "@/services/Actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Home = () => {

  const [searchAuthor, setSearchAuthor] = useState('')
  const [allPoetry, setAllPotery] = useState([])
  const [searchTitle, setSearchTitle] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const responseGetAllPoetry = async () => {
      try {
        const getPoetry = await url_endpoint.getAllPoetry();
        setAllPotery(getPoetry?.data?.data)
      } catch (error) {
        console.error('Error fetching poetry data:', error);
      }
    };
    responseGetAllPoetry();

    if(searchParams.get('success') === "true") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    
      Toast.fire({
          icon: "success",
          customClass: {
            popup: 'my-toast' 
          },
          title: "Login succesfully!",
      });

      router.replace('/', undefined, { shallow: true })
    }
  }, [searchParams, router])


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
            <div className="w-full flex items-center mt-4">
              <p className="font-bold pb-4 text-[20px] mr-3 my-3 flex items-center w-[82px]">Genre :</p>
              <div id="swap-genre" className="w-full pr-12 overflow-x-auto flex items-center">
                <div className="flex items-center w-max pb-4">
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Personal Reflection</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Loss and Sorrow</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Hope and Dreams</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Life and Death</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Transformation</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Relationships</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Motivational</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Environment</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Celebration</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Urban Life</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Happiness</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Romantic</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Struggle</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Mystery</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Sadness</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Culture</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Memory</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Nature</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Life</div>
                  <div className="w-max h-max px-5 py-2 rounded-full flex items-center jutify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400">Other</div>
                </div>
              </div>
            </div>

            <hr className="my-7 w-full border border-slate-300" />

            <div className="w-full flex flex-wrap justify-between">
              {
                Array.from({ length: 10 }, (_, index) => (
                  <Link key={index} href={'/read/ddsada'} className='w-[23%]  mb-5 h-[360px]'>
                    <div className="w-full mb-5 h-full rounded-[12px] bg-white border border-slate-300 shadow-sm cursor-pointer duration-200 overflow-hidden">
                  
                    <div className="relative w-full h-[60%] overflow-hidden object-cover">
                      <div className="absolute top-4 right-4 px-5 py-1 bg-slate-200 text-slate-800 shadow-md border border-white flex items-center justify-center rounded-full">
                        Poem
                      </div>
                      <Image src={Dummy} alt="Poetry Cover" className="w-full h-full object-cover" />
                    </div>
    
                    <div className="relative w-full p-3 h-[40%]">
                      <h2 className="max-w-[90%] text-blue-500 underline active:scale-[0.98] text-[18px] mt-2 overflow-hidden whitespace-nowrap overflow-ellipsis">Title Poetry</h2>
                      <i>
                       <small className="max-w-[90%] text-[13px] overflow-hidden whitespace-nowrap overflow-ellipsis">Muhammad Khoirulhuda</small>
                      </i>
                      <hr className="my-4 border border-slate-200" />
                      <p className="rounded-full absolute bottom-4 px-4 py-2 max-w-[90%] left-0 text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                      <span className="font-bold mr-2">Genre:</span> Romantic</p>
                    </div>  
    
                    </div>
                  </Link>
                ))
              }
            </div>

          </div>
        </div>

    </section>
  );
}

export default Home