"use client"

import '@/app/globals.css'
import calculateDifference from '@/app/helpers/getAge'
import ArrowLeft from '@/public/arrow-left.png'
import Default from '@/public/default.jpeg'
import Female from '@/public/female.png'
import Flower1 from '@/public/flower1.png'
import Male from '@/public/male.png'
import Netral from '@/public/N.png'
import Pen from '@/public/pen.png'
import Plus from '@/public/plus.png'
import Times from '@/public/times.png'
import Trash from '@/public/trash.png'
import { authSignIn } from '@/redux/auth/AuthSlice'
import { getBookDetail, getPoetryDetail } from '@/redux/auth/DataSlice'
import store from '@/redux/Store'
import { url_endpoint } from '@/services/Actions'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const Page = () => {
  
  const [data, setData] = useState(null)
  const [books, setBooks] = useState([])
  const [poems, setPoems] = useState([])
  const [status, setStatus] = useState(false)
  const [showSide, setShowSide] = useState(false)

  const { slug } = useParams() 
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const auth = store.getState().Auth?.auth
  const poetry = store.getState().Data?.poetry

  useEffect(() => {
    const getAccount = async () => {
      const response = await url_endpoint.getAccountById(searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id)
      const responseBook = await url_endpoint.getBookByAuthorId(searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id)
      setData(response?.data?.data)
      setBooks(responseBook?.data?.data)
      dispatch(authSignIn(response?.data?.data))
    }

    if(searchParams.get('success-update-book') === "true") {
      setStatus(true)
    }

    getAccount()
  }, [status, dispatch])

  const handleDelete = (title, id) => {
    Swal.fire({
      title: `Sure delete ${title}?`,
      showCancelButton: true,
      confirmButtonColor: "#363636",
      cancelButtonColor: "#b5b5b5",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        popup: 'ask-popup',
        title: 'ask-title-delete',
        confirmButton: 'confirm-button',
        cancelButton: 'cancel-button'
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setStatus(true)
        const response = await url_endpoint?.deleteAllPoetryByBookId(id)

        Swal.fire({
          icon: `${response?.data?.status === 200 ? 'success' : 'error'}`,
          title: `${response?.data?.status === 200 ? 'Delete succesfully' : 'Delete failed'}`,
          toast: true,
          position: "top-end",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'my-toast',
          },
        });
        setStatus(false);
      }
    });
  }

  const handleCreatePoetry = (data) => {
    dispatch(getBookDetail(data))
    router.push(`/upload-poetry/${slug}/poetry`)
  }

  const handleEditBook = (data) => {
    dispatch(getBookDetail(data))
    router.push(`/edit-book/${data?.book_id}/${data?.title}`)
  }

  const getPoetryByBookId = async (id) => {
    const response = await url_endpoint?.getAllPoetryByBookId(id)
    setPoems(response?.data?.data)
    setShowSide(true)
  }

  const handleReadPoetry = (data) => {
    dispatch(getPoetryDetail(data))
    router.push(`/read/${data?.title}`)
  }

  return (
    <section className='w-screen min-h-[90vh] overflow-hidden'>
        
        {/* Side */}
        <div className={`fixed flex items-center ${showSide ? 'bottom-0' : 'bottom-[-100%]'} duration-200 left-0 w-[100vw] border-t border-t-slate-400 h-[24vh] overflow-y-auto bg-white z-[444444] shadow-md pt-6 pb-2 px-5`}>
          
          <div className='w-[7%]'>
            <div onClick={() => setShowSide(false)} className='relative ml-2 mr-6 bottom-1 w-[40px] h-[40px] rounded-md flex items-center justify-center bg-white border border-red-500 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100 shadow-md p-1'>
              <Image src={Times} alt='times-icon' width={20} height={20} />
            </div>
          </div>
          
          <div className='w-max flex items-center'>
            {
              poems && poems?.length > 0 ? (
                poems?.map((data, index) => (
                  <div onClick={() => handleReadPoetry(data)} key={index} className='w-[260px] mr-4 bg-white flex items-center justify-between h-[100px] rounded-[10px] py-2 px-3 border border-slate-400 mb-3 cursor-pointer active:scale-[0.98] duration-100 hover:brightness-90'>
                    <div className='w-[98%]'>
                      <h2 className='w-full font-bold text-[17px] overflow-hidden whitespace-nowrap text-ellipsis'>{data?.title}</h2>
                      <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>Genre: {data?.genre}</p>
                      <i className='w-full flex text-right items-center justify-end'>
                        <p className='w-full ml-auto overflow-hidden whitespace-nowrap text-ellipsis text-[12px] text-slate-400'>{data?.timeMarker}</p>
                      </i>
                    </div>
                  </div>
                ))
              ):
                <p>Poetry not found!</p>
            }
          </div>
        </div>
        
        <div className='relative overflow-hidden flex items-center justify-center w-full h-[45vh] bg-slate-900'>
            <h1 className='absolute w-max z-[1] opacity-30 text-[54px] text-center text-slate-100 left-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <h1 className='absolute w-full z-[1] opacity-30 text-[104px] text-center text-slate-100 flex items-center justify-center transform translate-x-[0%] top-[40%]'>P.O.E.T.R.Y</h1>
            <h1 className='absolute w-max z-[1] opacity-30 text-[54px] text-center text-slate-100 right-[5%] top-[16%]'>P.O.E.T.R.Y</h1>
            <div className='relative z-[333] w-[180px] h-[180px] p-1 rounded-full overflow-hidden bg-white shadow-md border-[6px] border-white'>
                <Image src={data && data.avatar === 'default' ? Default : data?.avatar} alt='photo-profile-me' width={200} height={200} className='w-full h-full hover:scale-[1.2] duration-300 hover:grayscale-[50%] object-cover rounded-full' />
            </div>
            
            {
              (searchParams.get('author') !== "invite" && auth?.user_id === poetry?.authorId) && (
                <Link href={`/profile/edit/${slug}/${searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id}`}>
                    <div title='edit-profile' className='absolute right-8 w-[40px] p-3 h-[40px] bottom-8 bg-white shadaw-md flex item-center justify-center rounded-full border border-slate-300 cursor-pointer active:scale-[0.97] z-[44] hover:brightness-[90%]'>
                        <Image src={Pen} alt='icon-pen' width={20} height={20} />
                    </div>
                </Link>
              )
            }
        </div>

        <div className='relative w-full px-10 py-5'>
            {/* Flower */}
            <Image src={Flower1} alt="flower" width={400} height={400} className='absolute right-[-5%] top-3 opacity-15' />

            <div className='w-full flex items-center justify-between'>
              <div className='w-max flex items-center text-blue-600'>
                  <Link href={'/'}>
                      <Image src={ArrowLeft} alt='arrow-left' width={20} height={30} className='mr-1' />
                  </Link>
                  <p className='relative top-[-2px] ml-1'>profile <span className='mx-1'>/</span> {decodeURIComponent(slug)}</p>
              </div>

              <p className='flex w-max'>{data && data?.year !== '-' ? data?.year : ''} ({data && data?.year !== '-' ? `${calculateDifference(data?.year)} - ${calculateDifference(data?.year) + 1} tahun` : 'Usia belum diketahui' }), <b className='ml-1'>{data?.country}</b></p>
            </div>

            <hr className='my-6 border border-slate-300' />

            <h2 className='font-bold flex items-center text-[36px]'>– {data?.penName ?? ''} - <Image src={data && data?.gender === 'M' ? Male : data && data?.gender === 'F' ? Female : Netral} alt='arrow-left' width={data && (data?.gender === 'M' || data?.gender === 'F') ? 20 : 30} height={data && (data?.gender === 'M' || data?.gender === 'F') ? 20 : 30} className='ml-3' /></h2>
            <p className='w-[70%] text-slate-600 leading-loose'>– {data?.bionarasi === null || data?.bionarasi === '-' ? 'Bionarration has not been added to this account' : data?.bionarasi}</p>
            {/* <p className='w-[70%] text-slate-600 leading-loose'>– Mahasiswa semester 8 angkatan tahun 2021, asal dari prodi teknik informatika di STMIK IKMI KOTA CIREBON. Pria yang hobi berpuisi dan nogding serta olahrga futsal dan renang.</p> */}
            
            <hr className='my-6 border border-slate-300' />

            {/* List poetry */}
            <div className='w-full flex items-center justify-between'>
              <h2 className='font-bold text-[36px]'>– His digital Book</h2>
              {
                 (searchParams.get('author') !== "invite" && auth?.user_id === poetry?.authorId) && (
                  <div className='flex items-center'>
                    <p className='mr-3 text-[17px]'>Create book</p>
                    <Link href={`/upload-book/${slug}/book/`}>
                      <div className='relative w-[40px] h-[40px] rounded-full border border-slate-600 bg-white shadow-md z-40 flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90'>
                        <Image src={Plus} alt="plus" width={20} height={20} />
                      </div>
                    </Link>
                  </div>
                 )
              }
            </div>
            <div className={`w-full mt-8 flex flex-wrap ${Array.isArray(books) && books.length > 3 ? 'justify-between' : 'justify-start'}`}>
              {
                 (searchParams.get('author') !== "invite" && auth?.user_id === poetry?.authorId) && (
                  <Link href={`/upload-book/${slug}/book`} className={`w-[23%] mb-5 flex ${books.length > 3 ? 'mr-0' : 'mr-3'} items-center justify-center flex-col h-[350px] rounded-[12px] bg-white border border-slate-400 shadow-sm cursor-pointer active:scale-[0.98] duration-200 overflow-hidden`}>
                    <div className='w-full flex items-center justify-center flex-col'>
                      <div className='relative w-[60px] h-[60px] rounded-full border border-slate-600 bg-white shadow-md z-40 flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90'>
                          <Image src={Plus} alt="plus" width={20} height={20} />
                      </div>
                      <p className='mt-6'>Add new book</p>
                    </div>
                  </Link>
                 )
              }
              {
                Array.isArray(books) && books.length > 0 ? (
                  books.map((_, index) => (
                  <div className={`w-[23%] mb-5 h-[350px] ${books.length > 3 ? 'mx-0' : 'mx-3'}`}>
                    <div key={index} className="w-full mb-5 h-full rounded-[12px] bg-white border border-slate-400 shadow-sm cursor-pointer duration-200 overflow-hidden">
                    
                      <div className="relative w-full h-[60%] overflow-hidden object-cover">
                        {
                           (searchParams.get('author') !== "invite" && auth?.user_id === poetry?.authorId) && (
                              <>
                                <div onClick={() => handleDelete(_?.title, _?.book_id)} className="absolute top-4 left-4 p-1 cursor-pointer hover:brightness-90 active:scale-[0.98] duration-100 w-[34px] h-[34px] bg-slate-200 text-slate-800 border border-white flex items-center justify-center rounded-full">
                                  <Image src={Trash} alt='trash-icon' width={20} height={20} />
                                </div>
                                <div onClick={() => handleEditBook(_)} className="absolute bottom-4 left-4 p-1  cursor-pointer hover:brightness-90 active:scale-[0.98] duration-100 w-[34px] h-[34px] bg-white text-white shadow-md border border-white flex items-center justify-center rounded-full">
                                  <Image src={Pen} alt='pen-icon' width={14} height={14} />
                                </div>
                                <div onClick={() => handleCreatePoetry(_)} className='absolute flex bg-white rounded-full hover:brightness-90 active:scale-[0.98] duration-100 px-2 py-1 shadow-md border border-white items-center bottom-4 right-4'>
                                  <div className="relative mr-2 p-1 cursor-pointer active:scale-[0.97] duration-100 w-[26px] h-[26px] bg-white text-white shadow-md border border-slate-500 flex items-center justify-center rounded-full">
                                    <Image src={Plus} alt='pen-icon' width={14} height={14} />
                                  </div>
                                  <p className='text-[14px]'>Create poetry</p>
                                </div>
                              </>
                           )
                        }
                        {/* <div className="absolute top-4 right-4 px-5 py-1 bg-slate-900 text-white shadow-md border border-white flex items-center justify-center rounded-full">
                          Book
                        </div> */}
                        <Image src={_?.cover ? _?.cover : Default} width={100} height={100} alt="Poetry Cover" className="w-full h-full object-cover" />
                      </div>

                      <div onClick={() => getPoetryByBookId(_?.book_id)} className="relative w-full p-3 h-[40%] hover:brightness-[95%] bg-white">
                        <h2 className="max-w-[90%] text-[18px] mt-2 text-blue-500 underline active:scale-[0.98] hover:text-blue-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{_?.title ?? '-'}</h2>
                        <i>
                        <small className="max-w-[90%] text-[13px] overflow-hidden whitespace-nowrap overflow-ellipsis">{_?.authorName ?? '-'}</small>
                        </i>
                        <hr className="my-4 border border-slate-200" />
                        <p className="rounded-full absolute bottom-4 px-4 py-2 max-w-[90%] left-0 text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <span className="font-bold mr-2">Year:</span> {_?.year ?? new Date().getFullYear()}</p>
                      </div>  
      
                    </div>
                  </div>
                   ))
                ) : (
                  <div className='w-[90vw] mx-auto lg:mx-4 h-[350px] flex justify-center items-center lg:w-[60vw] border border-slate-300 rounded-lg p-4'>
                    <p>No books available</p>
                  </div>
                )
              }
            </div>
        </div>
    </section>
  )
}

export default Page