import React from 'react'
import Flower1 from '@/public/flower1.png'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='relative w-screen py-5 h-max bg-slate-900 text-white mt-12 overflow-hidden text-center flex items-center justify-between px-12'>
        <h2 className='flex items-center text-[24px] font-bold'>P.U.I.T.I.S.Y.</h2>
        
        <small>&copy; {new Date().getFullYear()} Puitisy. All rights reserved.</small>

        <Image src={Flower1} alt='flower' width={250} height={250} className='absolute left-[40%] top-5 transform rotate-[170deg] z-[1] opacity-70' />
    </footer>
  )
}

export default Footer