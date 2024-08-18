import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed z-[999999] top-0 left-0 px-10 w-screen flex items-center h-[54px] bg-white shadow-md'>
        <div className='w-1/2 h-full flex items-center'>
            <h2 className='flex items-center text-[24px] font-bold'>P.U.I.T.I.S.Y.</h2>
        </div>
        <div className='flex items-center justify-end w-1/2 h-full'>
            <ul className='flex items-center list-style-none'>
                <a href='#read'>
                    <li className='ml-8'>Read Poetry</li>
                </a>
                <a href='#what'>
                    <li className='ml-8'>What Puitisy</li>
                </a>
                <a href='#create'>
                    <li className='ml-8'>Create Puitisy</li>
                </a>
                <a href='#contact'>
                    <li className='ml-8'>Contact</li>
                </a>
            </ul>
            <div className='flex items-center bg-green-600 ml-6 text-white rounded-md w-max h-[70%] px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
                Login
            </div>
        </div>
    </nav>
  )
}

export default Navbar