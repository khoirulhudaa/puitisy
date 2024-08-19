"use client"

import ArrowLeft from '@/public/arrow-left.png'
import Profile from '@/public/face.jpeg'
import Flower1 from '@/public/flower1.png'
import Pen from '@/public/pen.png'
import Trashs from '@/public/trash.png'
import Save from '@/public/save.png'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2";

const Page = () => {
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('')
  
  useEffect(() => {
      setName(slug)
      setDescription('adada')
    }, [])
    
    const { slug } = useParams() 
    const savedPathname = localStorage.getItem('lastPathname') ?? '/';
    
  const [error, setError] = useState('')
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    timer: 3000,
    showConfirmButton: false,
  });

  if (error !== "") {
    Toast.fire({
        icon: "error",
        title: error ? error : "Email atau password salah",
    });
  }

  return (
    <section className='w-screen min-h-[90vh] overflow-hidden'>
        <div className='relative overflow-hidden flex items-center justify-center w-full h-[45vh] bg-slate-900'>
            <h1 className='absolute w-max z-[1] opacity-80 text-[54px] text-center text-white left-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <h1 className='absolute w-max z-[1] opacity-80 text-[54px] text-center text-white right-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <div className='relative z-[333] flex items-center justify-center w-[150px] h-[150px] p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
               
               {/* Pen */}
               <div className='absolute w-[40px] p-2 h-[40px] rounded-full'>
                    <input type='file' name='photo' className='w-full h-full opacity-0 cursor-pointer absolute z-[333]' />
                    <div className='cursor-pointer active:scale-[0.98] ml-[-6px] mt-[-4px] hover:brightness-90 absolute z-[4] bg-opacity-85 flex items-center justify-center duration-100 bg-white w-[40px] p-2 h-[40px] rounded-full'>
                        <Image src={Pen} alt='photo-profile' width={15} height={15} />
                    </div>
               </div>

                <Image src={Profile} alt='photo-profile' width={200} height={200} className='w-full h-full object-cover rounded-full' />
            </div>
            <Link href={savedPathname}>
                <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='p-1 mx-5 transform rotate-180 w-[30px] h-[30px] bg-white rounded-full' />
            </Link>
            <div className='relative z-[333] w-[150px] h-[150px] flex items-center justify-center p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
                
                {/* Trash */}
                <div className='cursor-pointer active:scale-[0.98] hover:brightness-90 absolute z-[4] bg-opacity-85 flex items-center justify-center duration-100 bg-white w-[40px] p-2 h-[40px] rounded-full'>
                    <Image src={Trashs} alt='photo-profile' width={15} height={15} />
                </div>

                <Image src={Profile} alt='photo-profile' width={200} height={200} className='w-full h-full object-cover rounded-full' />
            </div>

            <div title='edit-profile' className='absolute right-8 w-[40px] p-3 h-[40px] bottom-8 bg-white shadaw-md flex item-center justify-center rounded-full border border-slate-300 cursor-pointer active:scale-[0.97] z-[44] hover:brightness-[90%]'>
                <Image src={Save} alt='icon-save' width={20} height={20} />
            </div>
        </div>

        <div className='relative w-full px-10 py-5'>
            {/* Flower */}
            <Image src={Flower1} alt="flower" width={400} height={400} className='absolute right-[-5%] top-3 opacity-15' />

            <div className='w-max flex items-center text-blue-600'>
                <Link href={savedPathname}>
                    <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='mr-1' />
                </Link>
                <p className='relative top-[-2px] ml-1'>profile <span className='mx-1'>/</span> edit <span className='mx-1'>/</span> {slug}</p>
            </div>

            <hr className='my-6 border border-slate-300' />

            <div className='w-full flex flex-col h-nax mb-5'>
                <label className='mb-6 text-[18px]'>Name</label>
                <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
                <input 
                    type='text' 
                    name='name' 
                    value={name} 
                    placeholder='Enter Your Name...' 
                    onChange={(e) => setName(e.target.value)} 
                    className='w-full h-full py-4 outline-0 text-[22px]' 
                />
                </div>
            </div>
            <div className='w-full flex flex-col h-nax mb-5'>
                <label className='mb-6 text-[18px]'>Bionarasi</label>
                <div className='flex w-[85%] border border-slate-300 rounded-lg px-5 items-center'>
                <textarea 
                    type='text' 
                    name='description' 
                    rows={5}
                    value={description} 
                    placeholder='Enter Your Binorasi...' 
                    onChange={(e) => setDescription(e.target.value)} 
                    className='w-full h-full py-4 outline-0 text-[22px]' 
                />
                </div>
            </div>
            <hr className='my-6 border border-slate-300' />

        </div>
    </section>
  )
}

export default Page