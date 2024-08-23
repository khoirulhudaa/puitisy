"use client";

import Spinner from '@/components/spinner';
import ArrowLeft from '@/public/arrow-left.png';
import Default from '@/public/default.jpeg';
import Flower1 from '@/public/flower1.png';
import Pen from '@/public/pen.png';
import Trashs from '@/public/trash.png';
import Upload3 from '@/public/upload3.jpeg';
import store from '@/redux/Store';
import { url_endpoint } from '@/services/Actions';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [imagePreview, setImagePreview] = useState(null);

  const auth = store.getState().Auth?.auth
  const bookDetail = store.getState().Data?.book
  const { slug } = useParams()
  const router = useRouter()

  console.log(bookDetail)

  useEffect(() => {
    setTitle(bookDetail?.title)
    setTheme(bookDetail?.theme)
    setYear(bookDetail?.year)
    setSynopsis(bookDetail?.synopsis)
  }, [])
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('file:', file)
    setCover(file)

    // Mengatur preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
    

  const handleUpdateBook = async () => {
    if (!title || !synopsis || !theme || !year) {
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

    setLoading(true)

    try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('year', year)
        formData.append('synopsis', synopsis)
        formData.append('authorName', auth?.penName)
        formData.append('theme', theme)
        if (cover) {
            formData.append('cover', cover);
        } 

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const response = await url_endpoint.updateBookById(decodeURIComponent(bookDetail?.book_id), formData)
        console.log('response update book:', response)

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

        setLoading(false)

        router.push(`/profile/${auth?.penName}?success-update-book=true`)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
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
    <section className='w-screen h-screen overflow-x-hidden flex'>
       <div className='relative w-[30%] h-screen overflow-hidden'>
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
      <div className='relative w-[70%] h-screen overflow-y-auto overflow-x-hidden py-6 px-12'>

        {/* Flower */}
        <Image src={Flower1} alt='flower' width={320} height={320} className='fixed right-[-3%] top-[-10%] transform -rotate-90 z-[1] opacity-30' />

        <h2 className='text-[56px] relative ml-[-10px]'>TimE foR booK!</h2>

        <form className='w-[90%] mt-2'>
          <label className='text-[16px]'>– Title book</label>
          <div className='flex mt-3 w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
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
            <div className='flex w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
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
            <div className='flex w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
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
            <div className='flex w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
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
            <div className='flex items-center w-max'>
            <div className='relative z-[333] flex items-center justify-center w-[150px] h-[150px] p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
               <div className='absolute w-[40px] p-2 h-[40px] rounded-full'>
                    <input type='file' onChange={(e) => handleFileChange(e)} name='photo' className='w-full h-full opacity-0 cursor-pointer absolute z-[333]' />
                    <div className='cursor-pointer active:scale-[0.98] ml-[-6px] mt-[-4px] hover:brightness-90 absolute z-[4] bg-opacity-85 flex items-center justify-center duration-100 bg-white w-[40px] p-2 h-[40px] rounded-full'>
                        <Image src={Pen} alt='photo-profile' width={15} height={15} />
                    </div>
               </div>

                <Image src={bookDetail && bookDetail?.cover !== 'default' ? bookDetail?.cover : Default} alt='photo-profile-main' width={200} height={200} className='w-full h-full object-cover rounded-full' />
            </div>
            {
              imagePreview && (
                <>
                  <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='p-1 mx-5 transform rotate-180 w-[30px] h-[30px] bg-white rounded-full' />
                  <div className='relative z-[333] w-[150px] h-[150px] flex items-center justify-center p-1 rounded-full overflow-hidden bg-white shadow-md border border-white'>
                      
                      {/* Trash */}
                      <div onClick={() => {setCover(null), setImagePreview(null)}} className='cursor-pointer active:scale-[0.98] hover:brightness-90 absolute z-[4] bg-opacity-85 flex items-center justify-center duration-100 bg-white w-[40px] p-2 h-[40px] rounded-full'>
                          <Image src={Trashs} alt='photo-profile' width={15} height={15} />
                      </div>

                      <Image src={imagePreview} alt='photo-profile-update' width={200} height={200} className='w-full h-full object-cover rounded-full' />
                  </div>
                </>
              )
            }
            </div>
          </div>
          {!cover && error && <p className='text-[14px] mb-4 text-red-600 mt-1'>Cover is required!</p>}

          <br />

          {/* Button */}
          <div onClick={() => {loading ? null() : handleUpdateBook()}} className={`relative flex items-center ${loading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-blue-400 text-white cursor-pointer"} py-2 rounded-md w-max h-[40px] px-5 active:scale-[0.98] hover:brightness-[90%] duration-100`}>
              {loading && <Spinner />}
              <p>
                Update Book
              </p>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Page