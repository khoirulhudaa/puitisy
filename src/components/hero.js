import Image from 'next/image'
import React from 'react'
import Lines from '@/public/lines.png'
import Flower1 from '@/public/flower1.png'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='relative overflow-hidden w-screen h-[84vh] bg-slate-900 text-center flex flex-col items-center justify-center'>
        {/* Background */}
        <Image src={Lines} alt='flower' width={2000} height={1400} className='absolute left-[0%] top-0 z-[1] opacity-10' />
        
        {/* Flowers */}
        <Image src={Flower1} alt='flower' width={350} height={350} className='absolute left-[-5%] top-0 transform rotate-[170deg] z-[1] opacity-70' />
        <Image src={Flower1} alt='flower' width={370} height={370} className='absolute right-[-5%] bottom-[0%] z-[1] opacity-65' />
        
        <div className='relative z-[33] text-center flex flex-col items-center'>
            <h1 className='text-[72px] font-normal relative text-transparent bg-clip-text bg-gradient-to-t from-slate-400 to-white'>Puitisy: Crafting Poetry</h1>
            <p className='text-white text-[24px] w-[60%] mt-6'>– A digital space where words and poetic art unite, offering a platform for writers and readers to connect and create.</p>
            <Link href={`/upload/${'huda'}/poetry/1289129812`}>
              <div className='rounded-md bg-white flex items-center justify-center cursor-pointer mt-10 hover:bg-slate-200 active:scale-[0.98] duration-100 px-8 py-3'>
                  <p>Create Poetry </p>
              </div>
            </Link>
        </div> 

    </section>
  )
}

export default Hero