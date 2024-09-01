"use client";

import Icons from '@/components/icons';
import Flower1 from '@/public/flower1.png';
import BgLogin from '@/public/register.jpeg';
import { url_endpoint } from '@/services/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../globals.css';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { authSignOut } from '@/redux/auth/authSlice';

const Page = () => {

  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [penName, setPenName] = useState('') 
  const [show, setShow] = useState(false) 
  const router = useRouter()

  useEffect(() => {
    authSignOut()
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    const data = {
      email,
      password,
      penName
    }

    if(email === '' || password === '') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    
      Toast.fire({
          icon: "warning",
          customClass: {
            popup: 'my-toast-auth'
          },
          title: 'All fields are required!',
      });

      return
    }

    const response = await url_endpoint.accountSignUp(data)

    if(response.status === 200) {
      router.push('/login?success-register=true')
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    
      Toast.fire({
          icon: "error",
          customClass: {
            popup: 'my-toast-auth'
          },
          title: response.message ?? 'Error server!',
      });
    }
    console.log('response:', response.data)
  }

  return (
    <section className='w-screen h-screen overflow-hidden lg:flex'>
      <div className='hidden lg:flex w-[30%] h-screen overflow-hidden'>
        <Image src={BgLogin} alt='bg-login-side' className='w-full h-full object-cover' />
      </div>
      <div id='form' className='relative w-screen lg:w-[70%] h-screen overflow-y-auto px-8 py-8 lg:py-5 lg:px-12'>

        {/* Flower */}
        <Image src={Flower1} alt='flower' width={370} height={370} className='hidden lg:flex absolute lg:fixed right-[-20%] lg:right-[-4%] lg:scale-1 scale-[0.5] bottom-[-10%] z-[1] opacity-10 lg:opacity-100' />
        <Image src={Flower1} alt='flower' width={250} height={250} className='fixed right-[-10%] lg:right-[-4%] top-[-10%] z-[1] opacity-10 lg:opacity-100' />

        <h2 className='text-[30px] lg:text-[56px] relative ml-[-10px]'>Welcome in Puitisy!</h2>

        <form className='w-full lg:w-[90%] mt-4'>

          <div className='w-full flex flex-col h-[60px] mb-5'>
            <label className='mb-3 text-[16px]'>Pen Name</label>
            <div className='flex w-full lg:w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
              <input 
                type='text' 
                name='penName' 
                value={penName} 
                placeholder='Enter Your Name...' 
                onChange={(e) => setPenName(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>

          <br />

          <div className='w-full flex flex-col h-[60px] mt-4 mb-5'>
            <label className='mb-3 text-[16px]'>Email</label>
            <div className='flex w-full lg:w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
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
            <div className='flex w-full lg:w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
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
          <div onClick={(e) => handleRegister(e)} className='relative flex items-center bg-blue-400 py-2 text-white rounded-md w-max h-[70%] px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
              <p>
                Register
              </p>
            </div>

            <small className='mt-4 flex items-center text-[16px]'>You have account ? <Link href={'/login'} className='ml-1'><span className='text-blue-400'>click here</span></Link></small>
        </form>
      </div>
    </section>
  )
}

export default Page