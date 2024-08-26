"use client";

import Spinner from '@/components/spinner';
import ArrowLeft from '@/public/arrow-left.png';
import Flower1 from '@/public/flower1.png';
import Upload3 from '@/public/upload3.jpeg';
import store from '@/redux/Store';
import { url_endpoint } from '@/services/Actions';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../../globals.css';

const Page = () => {

  const [title, setTitle] = useState('') 
  const [synopsis, setSynopsis] = useState('') 
  const [theme, setTheme] = useState('') 
  const [year, setYear] = useState('') 
  const [cover, setCover] = useState(null) 
  const [error, setError] = useState(false) 
  const [loading, setLoading] = useState(false) 

  const auth = store.getState().Auth?.auth
  const { slug } = useParams()
  const router = useRouter()

  const handleCreateBook = async () => {
    if (!title || !synopsis || !theme || !year || !cover) {
      setError(true);
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required!',
        timer: 2000,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
      return;
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('synopsis', synopsis)
        formData.append('theme', theme)
        formData.append('authorName', auth?.penName ?? 'Jhon Doe')
        formData.append('year', year)
        formData.append('cover', cover)
        
        if(cover !== null) {
          setError(false)
            const response = await url_endpoint.createBook(auth?.user_id, formData)
            console.log('response book:', response)
            if(response.data?.status === 200) {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Successfully created book",
                  });
                  
                  setTimeout(() => {
                    router.push(`/profile/${slug}`)
                  }, 1000)
            }
          setLoading(false)
        } else {
            setError(true)
            setLoading(false)
        }
    } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          timer: 3000,
          showConfirmButton: false,
        });
        Toast.fire({
          icon: "error",
          title: error,
        });
      setLoading(false)
    }
  }

  return (
    <section className='w-screen h-screen overflow-x-hidden flex'>
       <div className='relative lg:flex hidden w-[30%] h-screen overflow-hidden'>
        <div className='absolute z-40 left-7 top-12 flex items-center'>
          <Link href={`/profile/${slug}`}>
            <div className='w-[45px] h-[45px] rounded-full ml-[-13px] flex items-center justify-center bg-white shadow-md p-1 border border-slate-300 cursor-pointer active:scale-[0.98] hover:brightness-90'>
              <Image src={ArrowLeft} alt='arrow-left' width={20} height={20} />
            </div>
          </Link>
          <p className='text-white ml-4'>Back to home</p>
        </div>
        <Image src={Upload3} alt='bg-login-side' className='w-full h-full object-cover' />
      </div>
      <div className='relative w-full lg:w-[70%] h-screen overflow-y-auto overflow-x-hidden py-6 px-4 lg:px-12'>

        {/* Flower */}
        <Image src={Flower1} alt='flower' width={320} height={320} className='fixed right-[-3%] top-[-10%] transform -rotate-90 z-[-1] lg:z-[1] opacity-15 lg:opacity-30' />

        <h2 className='text-[34px] lg:text-[56px] lg:mb-0 mb-7 relative lg:ml-[-10px]'>TimE foR booK!</h2>

        <form className='w-full lg:w-[90%] z-[4433] mt-2'>
          <label className='text-[16px]'>– Title book</label>
          <div className='flex mt-3 w-full lg:w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
            <input 
              type='text' 
              name='title' 
              value={title} 
              placeholder='Enter Your Title...' 
              onChange={(e) => setTitle(e.target.value)} 
              className='w-full h-full py-5 outline-0' 
            />
          </div>

          <br />

          <div className='w-full flex mt-4 mb-3 flex-col min-h-[60px]'>
            <label className='mb-3 text-[16px]'>– Synopsis</label>
            <div className='flex w-full lg:w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
              <textarea 
                type='text' 
                name='synopsis' 
                rows={6}
                value={synopsis} 
                placeholder='Enter Your Synopsis...' 
                onChange={(e) => setSynopsis(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>

          <br />

          <div className='w-full flex mt-2 mb-3 flex-col min-h-[60px]'>
            <label className='mb-3 text-[16px]'>– Theme</label>
            <div className='flex w-full lg:w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
              <input 
                type='text' 
                name='theme' 
                value={theme} 
                placeholder='Enter Your Theme...' 
                onChange={(e) => setTheme(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>

          <br />

          <div className='w-full flex mt-2 mb-3 flex-col min-h-[60px]'>
            <label className='mb-3 text-[16px]'>– Year</label>
            <div className='flex w-full lg:w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
              <input 
                type='text' 
                name='year' 
                value={year} 
                placeholder='2024' 
                onChange={(e) => setYear(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>

          <br />

          <div className='w-full flex mt-2 flex-col min-h-[60px]'>
            <label className='mb-3 text-[16px]'>– Cover</label>
            <div className={`flex w-full lg:w-[75%] border ${!cover && error ? 'border-red-500' : 'border-slate-300'} rounded-lg px-5 items-center`}>
              <input 
                type='file' 
                name='cover' 
                onChange={(e) => setCover(e.target.files[0])} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>
          {!cover && error && <p className='text-[14px] mb-4 text-red-600 mt-1'>Cover is required!</p>}

          <br />

          {/* Button */}
          <div onClick={() => {loading ? null() : handleCreateBook()}} className={`relative flex items-center ${loading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-blue-400 text-white cursor-pointer"} py-2 rounded-md w-max h-[40px] px-5 active:scale-[0.98] hover:brightness-[90%] duration-100`}>
            {loading && <Spinner />}
            <p>
              Create Book
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Page