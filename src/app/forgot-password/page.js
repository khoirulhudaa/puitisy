"use client"

import Spinner from '@/components/spinner';
import Flower1 from '@/public/flower1.png';
import { url_endpoint } from '@/services/actions';
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Page = () => {

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendEmail = async (e) => {
    setLoading(true)
    e.preventDefault()

    const response = await url_endpoint?.forgotPassword(JSON.stringify({ email }),)
    if(response?.data?.status === 200) {
        setLoading(false)
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
            title: "Email sent successfully!",
          });
    }

    setLoading(false)
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        {/* Flower */}
        <Image src={Flower1} alt='flower' width={500} height={500} className='absolute lg:fixed right-[-10%] lg:right-[-14%] bottom-[-10%] z-[-1] opacity-10 lg:opacity-100' />
        <Image src={Flower1} alt='flower' width={400} height={400} className='fixed left-[-4%] top-[3%] z-[-1] opacity-10 lg:opacity-100' />

        <div className='relative z-[44444] w-[90vw] lg:w-[40vw] h-[50vh] flex mx-auto rounded-lg border border-slate-300 my-auto items-center justify-center bg-white shadow-md p-4 lg:p-12'>
            <form className='w-full'>
                <h2 className='text-[34px] font-bold'>Forgot password</h2>
                <hr className='my-4 border border-slate-300' />
                <div className='w-full flex mt-4 mb-12 flex-col h-[60px]'>
                    <label className='mb-3 text-[16px]'>Email</label>
                    <div className='flex w-full border border-slate-300 rounded-lg px-5 items-center'>
                    <input 
                        name='email' 
                        value={email} 
                        placeholder='Enter Your Email...' 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='w-full h-full py-5 outline-0' 
                    />
                    </div>
                </div>

                {/* Button */}
                <div onClick={(e) => {loading ? null() : handleSendEmail(e)}} className={`relative flex items-center ${loading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-blue-400 text-white cursor-pointer"} py-2 rounded-md w-max h-[40px] px-5 active:scale-[0.98] hover:brightness-[90%] duration-100`}>
                    {loading && <Spinner />}
                    <p>
                        Send email
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Page