"use client"

import Default from '@/public/default.jpeg'
import Face from '@/public/face.jpeg'
import Flower1 from '@/public/flower1.png'
import store from '@/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

const Navbar = () => {

  const [show, setShow] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()

  const auth = store.getState().Auth?.auth
  
  const showLogoutConfirmation = () => {
    setShowSidebar(false)
    Swal.fire({
      title: "Want to go out?",
      showCancelButton: true,
      confirmButtonColor: "#363636",
      cancelButtonColor: "#b5b5b5",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        popup: 'ask-popup',
        title: 'ask-title',
        confirmButton: 'confirm-button',
        cancelButton: 'cancel-button'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan tindakan logout
        logoutUser();
        
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          toast: true,
          position: "top-end",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'my-toast-auth',
          }
        });
      }
    });
  };
  
  const logoutUser = () => {
   router.push('/login')
  };

  const toProfile = () => {
    setShow(false)
    router.push(`/profile/${auth?.penName}`)
  }

  const handleClick = (href) => {
      setShowSidebar(false); // Menutup sidebar
      if (href.startsWith('/')) {
          router.push(href); // Navigasi ke URL jika href adalah URL
      } else {
          window.location.hash = href; // Navigasi ke ID jika href adalah ID
      }
  };

  return (
    <nav className='fixed z-[999999] top-0 left-0 px-4 lg:px-10 w-screen flex items-center h-[60px] lg:h-[54px] bg-white justify-between shadow-sm'>
        
        <div className='w-1/2 h-full flex items-center'>
            <h2 className='flex items-center text-[24px] font-bold'>
                <Link href={'/'}>
                    P.U.I.T.I.S.Y.
                </Link>
            </h2>
            <Image src={Flower1} alt='flower' width={30} height={30} className='relative ml-1 top-[0%] transform rotate-[170deg] z-[1] opacity-70' />
        </div>

        {/* Humberger button menu */}
        <div onClick={() => setShowSidebar(!showSidebar)} className={`relative w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100 border ${showSidebar ? 'border-slate-500 bg-red-500' : 'border-slate-300 bg-white'} rounded-md p-2 lg:hidden flex flex-col items-center justify-between`}>
          <div className={`w-full h-[2px] transition-transform duration-300 ease-in-out ${showSidebar ? 'rotate-45 translate-y-[9px] bg-white' : 'bg-slate-300'}`}></div>
          <div className={`w-full bg-slate-300 h-[2px] transition-opacity duration-300 ease-in-out ${showSidebar ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-full h-[2px] transition-transform duration-300 ease-in-out ${showSidebar ? '-rotate-45 -translate-y-[12px] bg-white' : 'bg-slate-300'}`}></div>
        </div>

        {/* Sidebar component */}
        <div className={`w-[100vw] h-screen ${showSidebar ? 'left-0 duration-300' : 'left-[-100%] duration-300'} top-0 fixed lg:hidden flex-col items-start justify-start flex z-[999999] overflow-y-auto p-4 bg-white shadow-md`}>
          
          <div onClick={() => setShowSidebar(false)} className={`absolute right-4 w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100 border border-white bg-red-500 rounded-md p-2 flex flex-col items-center justify-between`}>
            <div className={`w-full h-[2px] transition-transform duration-300 ease-in-out rotate-45 translate-y-[9px] bg-white`}></div>
            <div className={`w-full h-[2px] transition-transform duration-300 ease-in-out -rotate-45 -translate-y-[12px] bg-white`}></div>
          </div>
          
          <div className='w-1/2 mb-10 flex h-max items-center'>
              <h2 className='flex items-center text-[24px] font-bold'>
                  <Link href={'/'}>
                      P.U.I.T.I.S.Y.
                  </Link>
              </h2>
              <Image src={Flower1} alt='flower' width={30} height={30} className='relative ml-1 top-[0%] transform rotate-[170deg] z-[1] opacity-70' />
          </div>

          <ul className='w-full flex-col flex list-style-none'>
                <a href='#read' onClick={() => handleClick('#read')}>
                    <li className='mb-8 text-[18px] border-b border-b-slate-300 pb-6 w-full'>Read Poetry</li>
                </a>
                <a href='#desc' onClick={() => handleClick('#desc')}>
                    <li className='mb-8 text-[18px] border-b border-b-slate-300 pb-6 w-full'>What Puitisy</li>
                </a>
                <a href={`/profile/${auth?.penName}`} onClick={() => handleClick(`/profile/${auth?.penName}`)}>
                    <li className='mb-8 text-[18px] border-b border-b-slate-300 pb-6 w-full'>Create Puitisy</li>
                </a>
                <a href='#tips' onClick={() => handleClick('#tips')}>
                    <li className='mb-8 text-[18px] border-b border-b-slate-300 pb-6 w-full'>Tips & tricks</li>
                </a>
            </ul>
               
            {
                !auth ? (
                    <Link href={'/login'} className='flex items-center bg-blue-400 text-white rounded-md w-full h-max py-3 px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
                        <div className='w-full text-center'>
                            Login
                        </div>
                    </Link>
                ):
                    <>
                      <div onClick={() => setShow(!show)} className='w-[55px] h-[55px] rounded-full cursor-pointer overflow-hidden active:scale-[0.98] duration-100 border border-slate-400'>
                          <Image src={auth && auth.avatar === 'default' ? Default : auth.avatar} alt="photo-profile" width={100} height={100} className='w-full h-full object-cover' />
                      </div>
                      <p className='mt-4 text-[16px] w-full overflow-hidden whitespace-nowrap text-ellipsis'>{auth?.penName}</p>
                    </>
            }

            <div className={`absolute left-[0%] ${show ? 'duration-100 opacity-100' : 'duration-300 bottom-16 opacity-0 hidden'} p-4 w-full h-full bg-white text-left shadow-md overflow-hidden rounded-lg z-[33]`}>
                <div onClick={() => toProfile()} className='w-full cursor-pointer active:scale-[0.98] hover:bg-slate-200 hover:border-slate-500 text-center mb-4 px-9 py-3 border border-slate-300 flex rounded-md justify-center items-center'>Account</div>
                <div onClick={() => showLogoutConfirmation()} className='w-full cursor-pointer active:scale-[0.98] hover:brightness-90 text-center rounded-md px-9 mb-4 py-3 bg-red-700 text-white'>Logout</div>
                <div onClick={() => setShow(false)} className='w-full cursor-pointer active:scale-[0.98] hover:brightness-90 text-center border border-slate-300 rounded-md px-9 py-3 bg-white text-black'>Close</div>
            </div>

        </div>

        <div className='hidden lg:flex items-center justify-end w-max h-full'>
            <ul className='w-max flex items-center list-style-none'>
                <a href='#read'>
                    <li className='ml-8'>Read Poetry</li>
                </a>
                <a href='#desc'>
                    <li className='ml-8'>What Puitisy</li>
                </a>
                <a href={`/profile/${auth?.penName}`}>
                    <li className='ml-8'>Create Puitisy</li>
                </a>
                <a href='#tips'>
                    <li className='ml-8'>Tips & tricks</li>
                </a>
            </ul>
            
            {
                !auth ? (
                    <Link href={'/login'} className='flex items-center bg-blue-400 ml-8 text-white rounded-md w-max h-[70%] px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
                        <div>
                            Login
                        </div>
                    </Link>
                ):
                    <div onClick={() => setShow(!show)} className='w-[36px] h-[36px] rounded-full cursor-pointer overflow-hidden active:scale-[0.98] duration-100 border border-slate-400 ml-7'>
                        <Image src={auth && auth.avatar === 'default' ? Default : auth.avatar} alt="photo-profile" width={100} height={100} className='w-full h-full object-cover' />
                    </div>
            }

            <div className={`absolute right-5 ${show ? 'duration-100 top-20 opacity-100' : 'duration-300 top-16 opacity-0 hidden'} p-1 w-max h-max bg-white text-left shadow-md overflow-hidden rounded-lg z-[33]`}>
                <div onClick={() => toProfile()} className='w-full cursor-pointer active:scale-[0.98] hover:bg-slate-200 hover:border-slate-500 mb-2 px-9 py-2 border border-slate-300 flex rounded-md items-center'>Account</div>
                <div onClick={() => showLogoutConfirmation()} className='w-full cursor-pointer active:scale-[0.98] hover:brightness-90 text-center rounded-md px-9 py-2 bg-red-700 text-white'>Logout</div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar