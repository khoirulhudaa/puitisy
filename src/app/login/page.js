"use client";

import Icons from '@/components/icons';
import Flower1 from '@/public/flower1.png';
import BgLogin from '@/public/login.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../globals.css';
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {

  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [show, setShow] = useState(false) 

  const router = useRouter();
  const searchParams = useSearchParams()

  const handleRouter = () => {
    router.push('/?success=true')
  }

  useEffect(() => {
    if(searchParams.get('success-register') === "true") {
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
          title: "Register succesfully!",
      });

      router.replace('/', undefined, { shallow: true })
    }
  }, [searchParams, router])
  
  return (
    <section className='w-screen h-screen overflow-x-hidden flex'>
       <div className='w-[30%] h-screen overflow-hidden'>
        <Image src={BgLogin} alt='bg-login-side' className='w-full h-full object-cover' />
      </div>
      <div className='relative w-[70%] h-screen overflow-hidden p-12'>

        {/* Flower */}
        <Image src={Flower1} alt='flower' width={370} height={370} className='absolute right-[-5%] bottom-[-10%] z-[1] opacity-100' />
        <Image src={Flower1} alt='flower' width={250} height={250} className='absolute right-[-5%] top-[-10%] z-[1] opacity-100' />

        <h2 className='text-[56px] relative ml-[-10px]'>Yeay, Come Back!</h2>
        <small className='text-[16px] text-slate-400'>Enter your email and password correctly</small>

        <form className='w-[90%] mt-12'>
          <div className='w-full flex flex-col h-[60px] mb-5'>
            <label className='mb-3 text-[16px]'>Email</label>
            <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
              <input 
                type='email' 
                name='email' 
                value={email} 
                placeholder='Enter Your Email...' 
                onChange={(e) => setEmail(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>

          <br />

          <div className='w-full flex mt-4 mb-10 flex-col h-[60px]'>
            <label className='mb-3 text-[16px]'>Password</label>
            <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
              <input 
                type={show ? 'text' : 'password'} 
                name='email' 
                value={password} 
                placeholder='Enter Your Password...' 
                onChange={(e) => setPassword(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
              <div className='ml-3'>
                <Icons type={show ? "eye-close" : "eye-open"} className="flex items-center cursor-pointer justify-center w-3 h-3 scale-[1.4]" onClick={() => setShow(!show)} />
              </div>
            </div>
          </div>

          <br />

          {/* Button */}
          <div onClick={() => handleRouter()} className='relative flex items-center bg-blue-400 py-2 text-white rounded-md w-max h-[70%] px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
              <p>
                Login
              </p>
            </div>

            <small className='mt-4 flex items-center text-[16px]'>Don't have account ? <Link href={'/register'} className='ml-1'><span className='text-blue-400'>click here</span></Link></small>
        </form>
      </div>
    </section>
  )
}

export default Page