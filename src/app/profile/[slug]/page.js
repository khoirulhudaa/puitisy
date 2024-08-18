"use client"

import Icons from '@/components/icons'
import Profile from '@/public/face.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const Page = () => {
  
  const { slug } = useParams() 
  const savedPathname = localStorage.getItem('lastPathname') ?? '/';

  return (
    <section className='w-screen min-h-[90vh] overflow-hidden'>
        <div className='relative overflow-hidden flex items-center justify-center w-full h-[45vh] bg-slate-900'>
            <h1 className='absolute w-max z-[1] opacity-80 text-[54px] text-center text-white left-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <h1 className='absolute w-full z-[1] opacity-80 text-[104px] text-center text-white flex items-center justify-center transform translate-x-[0%] top-[40%]'>P.O.E.T.R.Y</h1>
            <h1 className='absolute w-max z-[1] opacity-80 text-[54px] text-center text-white right-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <div className='relative z-[333] w-[180px] h-[180px] p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
                <Image src={Profile} alt='photo-profile' width={200} height={200} className='w-full h-full object-cover rounded-full' />
            </div>
        </div>

        <div className='w-full'>
            <div className='w-max flex items-center'>
                <Link href={savedPathname}>
                    <Icons type="round-arrow-left" className="flex items-center cursor-pointer justify-center w-3 h-3 scale-[1.4]" />
                </Link>
                <small>/profile/{slug}</small>
            </div>
        </div>
    </section>
  )
}

export default Page