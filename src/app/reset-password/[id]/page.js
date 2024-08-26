"use client"

import Icons from '@/components/icons';
import Spinner from '@/components/spinner';
import Flower1 from '@/public/flower1.png';
import { url_endpoint } from '@/services/Actions';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Page = () => {

  const [auth, setAuth] = useState(null)
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    const getAccount = async () => {
        const response = await url_endpoint.checkToken(id)
    
        if(response.data.status === 200) {
          setAuth(response?.data?.data)
          console.log('SYSTEM-SUCCESS-CHECK-TOKEN!')
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
                  popup: 'my-toast'
                },
                title: "Expired token",
            });
            router.push('/login')
        }
    }

    getAccount()
  }, [id])

  const handleSendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(newPassword !== '' && newPassword !== confirmNewPassword) {
        setError(true)
        setLoading(false)
        return;
    }
    
    setError(false)
    
    const data = {
        newPassword
    }

    const response = await url_endpoint?.resetPassword(auth?.user_id, data)
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
            title: "Reset password successfully!",
        });

        router.push(`/login`)
    }
  }

  useEffect(() => {
    if(newPassword !== '' && newPassword === confirmNewPassword) {
        setError(false)
        return;
    }
  }, [confirmNewPassword])

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        {/* Flower */}
        <Image src={Flower1} alt='flower' width={500} height={500} className='absolute lg:fixed right-[-10%] lg:right-[-14%] bottom-[-10%] z-[-1] opacity-10 lg:opacity-100' />
        <Image src={Flower1} alt='flower' width={400} height={400} className='fixed left-[-4%] top-[3%] z-[-1] opacity-10 lg:opacity-100' />

        <div className='relative z-[44444] w-[90vw] lg:w-[40vw] min-h-[50vh] flex mx-auto rounded-lg border border-slate-300 items-center justify-center bg-white shadow-md p-4 lg:p-12'>
            <form className='w-full'>
                <h2 className='text-[34px] font-bold'>Reset password</h2>
                <hr className='my-4 border border-slate-300' />
                <div className='w-full flex mt-4 mb-14 flex-col h-[60px]'>
                    <label className='mb-3 text-[16px]'>New password</label>
                    <div className='flex w-full border border-slate-300 rounded-lg px-5 items-center'>
                        <input 
                            type={show ? 'text' : 'password'} 
                            name='newPassword' 
                            value={newPassword} 
                            placeholder='Enter New Password...' 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            className='w-full h-full py-5 outline-0' 
                        />
                        <div className='ml-3'>
                            <Icons type={show ? "eye-close" : "eye-open"} className="flex items-center cursor-pointer justify-center w-3 h-3 scale-[1.4]" onClick={() => setShow(!show)} />
                        </div>
                    </div>
                </div>

                <hr className='border border-slate-300' />

                <div className='w-full flex mt-4 mb-12 flex-col h-[60px]'>
                    <label className='mb-3 text-[16px]'>Confirm new password</label>
                    <div className='flex w-full border border-slate-300 rounded-lg px-5 items-center'>
                        <input 
                            type={showConfirm ? 'text' : 'password'} 
                            name='confirmNewPassword' 
                            value={confirmNewPassword} 
                            placeholder='Enter Confirm New Password...' 
                            onChange={(e) => setConfirmNewPassword(e.target.value)} 
                            className='w-full h-full py-5 outline-0' 
                        />
                        <div className='ml-3'>
                            <Icons type={showConfirm ? "eye-close" : "eye-open"} className="flex items-center cursor-pointer justify-center w-3 h-3 scale-[1.4]" onClick={() => setShowConfirm(!showConfirm)} />
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div onClick={(e) => {error ? null() : handleSendEmail(e)}} className={`relative flex items-center rounded-md w-full lg:w-max h-[70%] px-10 py-2 ${loading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-blue-400 text-white cursor-pointer"} ${newPassword === '' || error ? 'cursor-not-allowed bg-slate-300 text-slate-500' : 'bg-blue-400 py-2 text-white active:scale-[0.98] hover:brightness-[90%] duration-100'}`}>
                    {loading && <Spinner /> }
                    <p>
                        Reset now
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Page