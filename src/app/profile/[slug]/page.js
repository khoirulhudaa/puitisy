"use client"

import Profile from '@/public/face.jpeg'
import ArrowLeft from '@/public/arrow-left.png'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Dummy from '@/public/dummy.jpeg'
import Flower1 from '@/public/flower1.png'
import Male from '@/public/male.png'
import Pen from '@/public/pen.png'
import Trash from '@/public/trash.png'
import Plus from '@/public/plus.png'

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
                <Image src={Profile} alt='photo-profile' width={200} height={200} className='w-full h-full hover:scale-[1.2] duration-300 hover:grayscale-[50%] object-cover rounded-full' />
            </div>
            
            <Link href={`/profile/edit/${slug}/profile/1`}>
                <div title='edit-profile' className='absolute right-8 w-[40px] p-3 h-[40px] bottom-8 bg-white shadaw-md flex item-center justify-center rounded-full border border-slate-300 cursor-pointer active:scale-[0.97] z-[44] hover:brightness-[90%]'>
                    <Image src={Pen} alt='icon-pen' width={20} height={20} />
                </div>
            </Link>
        </div>

        <div className='relative w-full px-10 py-5'>
            {/* Flower */}
            <Image src={Flower1} alt="flower" width={400} height={400} className='absolute right-[-5%] top-3 opacity-15' />

            <div className='w-full flex items-center justify-between'>
              <div className='w-max flex items-center text-blue-600'>
                  <Link href={savedPathname}>
                      <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='mr-1' />
                  </Link>
                  <p className='relative top-[-2px] ml-1'>profile <span className='mx-1'>/</span> {slug}</p>
              </div>

              <p className='flex w-max'>2024 (21 - 22 tahun), <b className='ml-1'>Indonesia</b></p>
            </div>

            <hr className='my-6 border border-slate-300' />

            <h2 className='font-bold flex items-center text-[36px]'>– Muhammad Khoirulhuda - <Image src={Male} alt='arrow-left' width={20} height={30} className='ml-3' /></h2>
            <p className='w-[70%] text-slate-600 leading-loose'>– Mahasiswa semester 8 angkatan tahun 2021, asal dari prodi teknik informatika di STMIK IKMI KOTA CIREBON. Pria yang hobi berpuisi dan nogding serta olahrga futsal dan renang.</p>
            
            <hr className='my-6 border border-slate-300' />

            {/* List poetry */}
            <div className='w-full flex items-center justify-between'>
              <h2 className='font-bold text-[36px]'>– His poetry</h2>
              <div className='flex items-center'>
                <p className='mr-3 text-[17px]'>Upload poetry</p>
                <div className='relative w-[40px] h-[40px] rounded-full border border-slate-600 bg-white shadow-md z-40 flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90'>
                  <Image src={Plus} alt="plus" width={20} height={20} />
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex flex-wrap justify-between">
              <Link href={`/upload/${slug}/poetry/1289129812`} className='w-[23%] mb-5 flex items-center justify-center flex-col h-[350px] rounded-[12px] bg-white border border-slate-300 shadow-sm cursor-pointer active:scale-[0.98] duration-200 overflow-hidden'>
                <div className='w-full flex items-center justify-center flex-col'>
                  <div className='relative w-[60px] h-[60px] rounded-full border border-slate-600 bg-white shadow-md z-40 flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90'>
                      <Image src={Plus} alt="plus" width={20} height={20} />
                  </div>
                  <p className='mt-6'>Add new poetry</p>
                </div>
              </Link>
              {
                Array.from({ length: 10 }, (index) => (
                  <Link href={'/read/ddsada'} className='w-[23%]  mb-5 h-[360px]'>
                    <div key={index} className="w-full mb-5 h-full rounded-[12px] bg-white border border-slate-300 shadow-sm cursor-pointer duration-200 overflow-hidden">
                    
                      <div className="relative w-full h-[60%] overflow-hidden object-cover">
                        <div className="absolute top-4 left-4 p-1 cursor-pointer active:scale-[0.97] duration-100 w-[34px] h-[34px] bg-slate-200 text-slate-800 border border-white flex items-center justify-center rounded-full">
                          <Image src={Trash} alt='trash-icon' width={20} height={20} />
                        </div>
                        <div className="absolute bottom-4 left-4 p-1 cursor-pointer active:scale-[0.97] duration-100 w-[34px] h-[34px] bg-white text-white shadow-md border border-white flex items-center justify-center rounded-full">
                          <Image src={Pen} alt='pen-icon' width={14} height={14} />
                        </div>
                        <div className="absolute top-4 right-4 px-5 py-1 bg-slate-200 text-slate-800 shadow-md border border-white flex items-center justify-center rounded-full">
                          Poem
                        </div>
                        <Image src={Dummy} alt="Poetry Cover" className="w-full h-full object-cover" />
                      </div>
      
                      <div className="relative w-full p-3 h-[40%] hover:brightness-[95%] bg-white">
                        <h2 className="max-w-[90%] text-[18px] mt-2 text-blue-500 underline active:scale-[0.98] overflow-hidden whitespace-nowrap overflow-ellipsis">Title Poetry</h2>
                        <i>
                        <small className="max-w-[90%] text-[13px] overflow-hidden whitespace-nowrap overflow-ellipsis">Muhammad Khoirulhuda</small>
                        </i>
                        <hr className="my-4 border border-slate-200" />
                        <p className="rounded-full absolute bottom-4 px-4 py-2 max-w-[90%] left-0 text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <span className="font-bold mr-2">Genre:</span> Romantic hjashjsa jhsajdsidiasdha  sdsshjdhs</p>
                      </div>  
      
                    </div>
                  </Link>
                ))
              }
            </div>
        </div>
    </section>
  )
}

export default Page