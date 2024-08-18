import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Face from '@/public/face.jpeg'

const Navbar = () => {

  const [show, setShow] = useState(false)

  return (
    <nav className='fixed z-[999999] top-0 left-0 px-10 w-screen flex items-center h-[54px] bg-white justify-between shadow-md'>
        <div className='w-1/2 h-full flex items-center'>
            <h2 className='flex items-center text-[24px] font-bold'>
                <Link href={'/'}>
                    P.U.I.T.I.S.Y.
                </Link>
            </h2>
        </div>
        <div className='flex items-center justify-end w-max h-full'>
            <ul className='w-max flex items-center list-style-none'>
                <a href='#read'>
                    <li className='ml-8'>Read Poetry</li>
                </a>
                <a href='#what'>
                    <li className='ml-8'>What Puitisy</li>
                </a>
                <a href='#create'>
                    <li className='ml-8'>Create Puitisy</li>
                </a>
                <a href='#contact'>
                    <li className='ml-8'>Contact</li>
                </a>
            </ul>

            {/* <Link href={'/login'} className='flex items-center bg-blue-400 ml-8 text-white rounded-md w-max h-[70%] px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
                <div>
                    Login
                </div>
            </Link> */}
            <div onClick={() => setShow(!show)} className='w-[36px] h-[36px] rounded-full cursor-pointer overflow-hidden active:scale-[0.98] duration-100 border border-slate-400 ml-7'>
                <Image src={Face} alt="photo-profile" width={100} height={100} className='w-full h-full object-cover' />
            </div>

            <div className={`absolute right-5 ${show ? 'duration-100 top-20 opacity-100' : 'duration-300 top-16 opacity-0'} p-1 w-max h-max bg-white text-left shadow-md overflow-hidden rounded-lg z-[33]`}>
                <div className='w-full cursor-pointer active:scale-[0.98] hover:bg-slate-200 hover:border-slate-500 mb-2 px-9 py-2 border border-slate-300 flex rounded-md items-center'>Account</div>
                <div className='w-full cursor-pointer active:scale-[0.98] hover:brightness-90 text-center rounded-md px-9 py-2 bg-red-700 text-white'>Logout</div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar