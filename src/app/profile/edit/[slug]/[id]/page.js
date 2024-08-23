"use client"

import ArrowLeft from '@/public/arrow-left.png'
import Default from '@/public/default.jpeg'
import Flower1 from '@/public/flower1.png'
import Pen from '@/public/pen.png'
import Save from '@/public/save.png'
import Trashs from '@/public/trash.png'
import store from '@/redux/Store'
import { url_endpoint } from '@/services/Actions'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2"

const Page = () => {

  const [name, setName] = useState('')
  const [gender, setGender] = useState('M')
  const [year, setYear] = useState('')
  const [instagram, setInstagram] = useState('')
  const [bionarasi, setBionarasi] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const auth = store.getState().Auth?.auth
  const { slug, id } = useParams() 
  const savedPathname = `/profile/${auth?.penName}`;
  const router = useRouter()

  useEffect(() => {
    setName(auth?.penName)
    setGender(auth?.gender === '-' ? 'M' : auth?.gender)
    setYear(auth?.year)
    setInstagram(auth?.instagram)
    setBionarasi(auth?.bionarasi)
    setLocation(auth?.country)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('file:', file)
    setFile(file)

    // Mengatur preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpdateAccount = async () => {
    try {
      const formData = new FormData()
      formData.append('penName', name)
      formData.append('gender', gender)
      formData.append('year', year)
      formData.append('country', location)
      formData.append('instagram', instagram)
      formData.append('bionarasi', bionarasi)
      if (file) {
        formData.append('avatar', file);
      }

      const response = await url_endpoint.updateAccountById(decodeURIComponent(id), formData)

      if(response?.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });

        Toast.fire({
            icon: "success",
            customClass: {
              popup: 'my-toast'
            },
            title: response?.data?.message,
        });

        router.push(`/profile/${name}`)
      }

    } catch (error) {
      console.log(error)
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        timer: 3000,
        showConfirmButton: false,
      });
    
      if (error !== "") {
        Toast.fire({
            icon: "error",
            title: error ? error : "Email atau password salah",
        });
      }
    }
  }

  return (
    <section className='w-screen min-h-[90vh] overflow-hidden'>
        <div className='relative overflow-hidden flex items-center justify-center w-full h-[45vh] bg-slate-900'>
            <h1 className='absolute w-max z-[1] opacity-80 text-[54px] text-center text-white left-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <h1 className='absolute w-max z-[1] opacity-80 text-[54px] text-center text-white right-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <div className='relative z-[333] flex items-center justify-center w-[150px] h-[150px] p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
               
               {/* Pen */}
               <div className='absolute w-[40px] p-2 h-[40px] rounded-full'>
                    <input type='file' onChange={(e) => handleFileChange(e)} name='photo' className='w-full h-full opacity-0 cursor-pointer absolute z-[333]' />
                    <div className='cursor-pointer active:scale-[0.98] ml-[-6px] mt-[-4px] hover:brightness-90 absolute z-[4] bg-opacity-85 flex items-center justify-center duration-100 bg-white w-[40px] p-2 h-[40px] rounded-full'>
                        <Image src={Pen} alt='photo-profile' width={15} height={15} />
                    </div>
               </div>

                <Image src={auth && auth?.avatar !== 'default' ? auth?.avatar : Default} alt='photo-profile-main' width={200} height={200} className='w-full h-full object-cover rounded-full' />
            </div>
            {
              imagePreview && (
                <>
                  <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='p-1 mx-5 transform rotate-180 w-[30px] h-[30px] bg-white rounded-full' />
                  <div className='relative z-[333] w-[150px] h-[150px] flex items-center justify-center p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
                      
                      {/* Trash */}
                      <div onClick={() => {setFile(null), setImagePreview(null)}} className='cursor-pointer active:scale-[0.98] hover:brightness-90 absolute z-[4] bg-opacity-85 flex items-center justify-center duration-100 bg-white w-[40px] p-2 h-[40px] rounded-full'>
                          <Image src={Trashs} alt='photo-profile' width={15} height={15} />
                      </div>

                      <Image src={imagePreview} alt='photo-profile-update' width={200} height={200} className='w-full h-full object-cover rounded-full' />
                  </div>
                </>
              )
            }

            <div onClick={() => handleUpdateAccount()} title='edit-profile' className='absolute right-8 w-[40px] p-3 h-[40px] bottom-8 bg-white shadaw-md flex item-center justify-center rounded-full border border-slate-300 cursor-pointer active:scale-[0.97] z-[44] hover:brightness-[90%]'>
                <Image src={Save} alt='icon-save' width={20} height={20} />
            </div>
        </div>

        <div className='relative w-full px-10 py-5'>
            {/* Flower */}
            <Image src={Flower1} alt="flower" width={400} height={400} className='absolute right-[-5%] top-3 opacity-15' />

            <div className='relative w-full z-[33] flex justify-between items-center'>
                <div className='w-max flex items-center text-blue-600'>
                  <Link href={savedPathname}>
                      <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='mr-1' />
                  </Link>
                  <p className='relative top-[-2px] ml-1'>profile <span className='mx-1'>/</span> edit <span className='mx-1'>/</span> {slug}</p>
              </div>

              <div className='w-max flex items-center'>
                  <div className='w-full flex h-max items-center'>
                      <label className='text-[18px] mr-4'>Year Birth</label>
                      <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
                      <input 
                          type='text' 
                          name='year' 
                          value={year} 
                          placeholder='2003' 
                          onChange={(e) => setYear(e.target.value)} 
                          className='w-full h-full py-4 outline-0 text-[18px]' 
                      />
                      </div>
                  </div>
                  <div className='w-full flex h-max items-center'>
                      <label className='text-[18px] mr-4'>Country</label>
                      <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
                      <input 
                          type='text' 
                          name='location' 
                          value={location} 
                          placeholder='Indonesia' 
                          onChange={(e) => setLocation(e.target.value)} 
                          className='w-full h-full py-4 outline-0 text-[18px]' 
                      />
                      </div>
                  </div>
              </div>
            </div>

            <hr className='my-6 border border-slate-300' />

            <div className='w-full flex flex-col h-max mb-5'>
                <label className='mb-6 text-[18px]'>Pen Name</label>
                <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
                <input 
                    type='text' 
                    name='name' 
                    value={name} 
                    placeholder='Enter Your Name...' 
                    onChange={(e) => setName(e.target.value)} 
                    className='w-full h-full py-4 outline-0 text-[18px]' 
                />
                </div>
            </div>
            <div className='w-full flex flex-col h-max mb-5'>
                <label className='mb-6 text-[18px]'>Bionarasi</label>
                <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
                <input 
                    type='text' 
                    name='bionarasi' 
                    value={bionarasi} 
                    placeholder='Enter Your Bionarasi...' 
                    onChange={(e) => setBionarasi(e.target.value)} 
                    className='w-full h-full py-4 outline-0 text-[18px]' 
                />
                </div>
            </div>
            <div className='w-full flex flex-col h-max mb-5'>
                <label className='mb-6 text-[18px]'>Instagram</label>
                <div className='flex w-[65%] border border-slate-300 rounded-lg px-5 items-center'>
                <input 
                    type='text' 
                    name='instagram' 
                    value={instagram} 
                    placeholder='Enter Your Instagram...' 
                    onChange={(e) => setInstagram(e.target.value)} 
                    className='w-full h-full py-4 outline-0 text-[18px]' 
                />
                </div>
            </div>
            <div className='w-full flex flex-col h-max mb-5'>
                <label className='mb-6 text-[18px]'>Gender</label>
                <div className='flex items-center w-max rounded-md border border-slate-300 p-3'>
                  {['M', 'F'].map((option) => (
                    <label className='flex mr-5 items-center' key={option}>
                      <input
                        type="radio"
                        name="gender"
                        className='w-[20px] h-[20px]'
                        value={option}
                        checked={gender === option}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <p className='ml-2'>
                        {option}
                      </p>
                    </label>
                  ))}
              </div>
            </div>
            <hr className='my-6 border border-slate-300' />

        </div>
    </section>
  )
}

export default Page