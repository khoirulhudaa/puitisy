import React from 'react'

const Footer = () => {
  return (
    <footer className='w-screen py-5 h-max bg-slate-900 text-white mt-12 overflow-hidden text-center flex items-center justify-between px-12'>
        <h2 className='flex items-center text-[24px] font-bold'>P.U.I.T.I.S.Y.</h2>
        
        <small>&copy; {new Date().getFullYear()} Puitisy. All rights reserved.</small>
    </footer>
  )
}

export default Footer