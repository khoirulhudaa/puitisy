import Image from 'next/image'
import React from 'react'
import Lines from '@/public/lines.png'
import Flower1 from '@/public/flower1.png'
import Link from 'next/link'
import store from '@/redux/store'

const Hero = () => {

  const auth = store.getState().Auth?.auth

  return (
    <section className='relative overflow-hidden w-screen min-h-[60vh] lg:h-[84vh] bg-slate-900 text-center flex flex-col items-center justify-center'>
        {/* Background */}
        <Image src={Lines} alt='flower' width={2000} height={1400} className='absolute left-[0%] top-0 z-[1] lg:flex hidden opacity-10' />
        
        {/* Flowers */}
        <Image src={Flower1} alt='flower' width={350} height={350} className='absolute left-[-5%] top-0 transform rotate-[170deg] z-[1] opacity-10 lg:opacity-70' />
        <Image src={Flower1} alt='flower' width={370} height={370} className='absolute right-[-5%] bottom-[0%] z-[1] lg:scale-[1] scale-[0.7] opacity-5 lg:opacity-65' />
        
        <div className='relative z-[33] text-center flex flex-col items-center'>
            <h1 className='text-[40px] lg:text-[72px] font-normal relative text-transparent bg-clip-text bg-gradient-to-t from-slate-400 to-white'>Puitisy: Crafting Poetry</h1>
            <p className='text-white text-[16px] lg:text-[24px] w-[85%] lg:w-[60%] mt-6'>– A digital space where words and poetic art unite, offering a platform for writers and readers to connect and create.</p>
            <Link href={`/profile/${auth?.penName}`}>
              <div className='rounded-md bg-white flex items-center justify-center cursor-pointer mt-10 mb-2 lg:mb-10 hover:bg-slate-200 active:scale-[0.98] duration-100 px-8 py-3'>
                  <p>Create Poetry </p>
              </div>
            </Link>
        </div> 

    </section>
  )
}

export default Hero