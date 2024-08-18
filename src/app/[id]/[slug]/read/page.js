"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Flower1 from '@/public/flower1.png'
import Download from '@/public/unduh.png'
import Share from '@/public/share.png'
import User from '@/public/user.png'

const Page = () => {
  const router = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id, slug } = useParams()

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (id && slug) {
      fetch (`https://api.example.com/posts/${id}?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setLoading(false);
        });
    }
  }, [id, slug]);

  // if (loading) return (
  //   <p>Loading...</p>
  // );

  // if (!data) return (
  //   <p>Data not found</p>
  // );

  return (
    <section className='w-screen flex min-h-[80vh]'>

      <div className='w-full p-10'>
        <div className='w-full flex items-center'>
          <div className='w-1/2'>
            <h2 className='font-[800] text-[30px]'>– {decodeURIComponent(slug)}</h2>
            <i>
              <small className='text-[17px]'>Oleh: Muhammad Khoirulhuda</small>
            </i>
          </div>
          <p className='ml-auto text-[18px]'>Cirebon, 17 Agutua 2024</p>
        </div>

        <hr className='my-5 border border-slate-300' />

        <div className='flex w-full h-max'>
          <div className='relative flex w-[70%] min-h-full overflow-y-auto border-r border-r-slate-300'>


            <div className='absolute right-[-120px] top-[10%] overflow-hidden'>
              <Image src={Flower1} alt="flower" width={400} height={400} className='opacity-15' />
            </div>

            <div className='w-[90%] border-r border-r-slate-300'>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod. 
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
              <p className='mb-10'>
                loreElit ipsum reprehenderit ad commodo aute exercitation 
                dolore occaecat ullamco veniam eiusmod.
              </p>
            </div>

            <div className='relative h-full flex flex-col items-center w-[10%]'>
              <div className='top-0 rounded-full flex mb-5 items-center justify-center p-3 bg-blue-400 text-white w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90'>
                <Image src={Download} alt='download-icon' width={20} height={20} />
              </div>

              <div className='w-[70%] h-[1px] border-b border-b-slate-300 mb-5' />

              <div className='top-0 rounded-full flex items-center justify-center p-3 bg-gray-400 text-white w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90'>
                <Image src={Share} alt='share-icon' width={20} height={20} className='relative left-[-1.2px]' />
              </div>
              
              <div className='w-[70%] h-[1px] border-b border-b-slate-300 my-5' />

              <div className='top-0 rounded-full flex items-center justify-center p-3 bg-indigo-400 text-white w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90'>
                <Image src={User} alt='user-icon' width={20} height={20} className='relative' />
              </div>
            </div>

          </div>
          <div className='relative w-[30%] h-[90vh] pl-6 pr-3'>
            <label className='font-bold'>– Bionarasi:</label>
            <p className='text-[14px] leading-loose'>Penulisnya adalah seorang mahasiswa usia 21 tahun, menempuh pendidikan teknik informatika angkata 2021 di Cirebon.</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold'>– Sinopsis:</label>
            <p className='text-[14px] leading-loose'>Puisi ini berkisah tentang kehidupan seorang pelajar yang tengah giat belajar untuk meraih impiannya sedari kecil.</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold'>– Book/Link Reference:</label>
            <p className='text-[14px] leading-loose'>Buku Rinai Bunga Puitis</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold'>– ISBN/QRCBN:</label>
            <p className='text-[14px] leading-loose'>23723-3283-273-328</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold'>– Instagram:</label>
            <p className='text-[14px] leading-loose'>@_mk.h19</p>
          </div>
        </div>

        <hr className='mt-5 border border-slate-300' />

      </div>

      {/* <div>{decodeURIComponent(slug)}</div>
      <div>{id}</div> */}
    </section>
  )
}

export default Page