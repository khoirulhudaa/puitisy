import Image from 'next/image';
import React from 'react';
import SpinnerIcon from '@/public/spinner.png'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen mr-3">
      <Image src={SpinnerIcon} alt='spinner-icon' width={14} height={14} className='animate-spin duration-100' />
    </div>
  );
};

export default Spinner;
