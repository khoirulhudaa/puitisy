"use client"

import '@/app/globals.css'
import calculateDifference from '@/app/helpers/getAge'
import ArrowLeft from '@/public/arrow-left.png'
import Beginner from '@/public/beginner.png'
import Border from '@/public/border.png'
import ChevronDown from '@/public/chevron.png'
import ChevronUp from '@/public/chevronUp.png'
import Default from '@/public/default.jpeg'
import Female from '@/public/female.png'
import Flower1 from '@/public/flower1.png'
import Male from '@/public/male.png'
import Most from '@/public/most.png'
import Netral from '@/public/N.png'
import Pen from '@/public/pen.png'
import Plus from '@/public/plus.png'
import Pro from '@/public/pro.png'
import Streak from '@/public/streak.png'
import Ten from '@/public/ten.png'
import Times from '@/public/times.png'
import Trash from '@/public/trash.png'
import Veteran from '@/public/veteran.png'
// import Winner from '@/public/winner.png'
import checkDate from '@/app/helpers/getOneYear'
import { authSignIn } from '@/redux/auth/authSlice'
import { getBookDetail, getPoetryDetail } from '@/redux/auth/dataSlice'
import store from '@/redux/store'
import { url_endpoint } from '@/services/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const Page = () => {
  
  const [data, setData] = useState(null)
  const [books, setBooks] = useState([])
  const [allPoems, setAllPoems] = useState([])
  const [poems, setPoems] = useState([])
  const [status, setStatus] = useState(false)
  const [mute, setMute] = useState(false)
  const [showSide, setShowSide] = useState(false)
  const [showHero, setShowHero] = useState(false)

  const { slug } = useParams() 
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const auth = store.getState().Auth?.auth
  const poetry = store.getState().Data?.poetry
  console.log(auth)

  useEffect(() => {
    const getAccount = async () => {
      const responseAllPoems = await url_endpoint.getAllPoetryByAuthorId(auth?.user_id)
      const response = await url_endpoint.getAccountById(searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id)
      const responseBook = await url_endpoint.getBookByAuthorId(searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id)
      setData(response?.data?.data)
      setAllPoems(responseAllPoems?.data?.data)
      setBooks(responseBook?.data?.data)
      console.log('books:', responseBook?.data?.data)
      dispatch(authSignIn(response?.data?.data))
    }

    if(searchParams.get('success-update-book') === "true") {
      setStatus(true)
    }

    getAccount()
  }, [status, dispatch, auth?.user_id, poetry?.authorId, searchParams])

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
    console.log(id)
    const response = await url_endpoint?.getAllPoetryByBookId(id)
    setPoems(response?.data?.data)
    console.log('poemss:', response)
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
          
          <div className='w-max lg:w-[7%]'>
            <div onClick={() => setShowSide(false)} className='relative ml-2 mr-6 bottom-1 w-[40px] h-[40px] rounded-md flex items-center justify-center bg-white border border-red-500 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100 shadow-md p-1'>
              <Image src={Times} alt='times-icon' width={20} height={20} />
            </div>
          </div>
          
          <div className='w-max flex items-center'>
            {
              poems && poems?.length > 0 ? (
                poems?.map((data, index) => (
                  <div onClick={() => handleReadPoetry(data)} key={index} className='w-max lg:w-[260px] mr-4 bg-white flex items-center justify-between h-[100px] rounded-[10px] py-2 px-6 lg:px-3 border border-slate-400 mb-3 cursor-pointer active:scale-[0.98] duration-100 hover:brightness-90'>
                    <div className='w-max lg:w-[98%]'>
                      <h2 className='w-full font-bold text-[17px] lg:overflow-hidden lg:whitespace-nowrap lg:text-ellipsis'>{data?.title}</h2>
                      <p className='w-full lg:overflow-hidden lg:whitespace-nowrap lg:text-ellipsis'>Genre: {data?.genre}</p>
                      <i className='w-full flex lg:text-right items-center justify-end'>
                        <p className='w-full ml-auto lg:overflow-hidden lg:whitespace-nowrap lg:text-ellipsis text-[12px] text-slate-400'>{data?.timeMarker}</p>
                      </i>
                    </div>
                  </div>
                ))
              ):
                <p>Poetry not found!</p>
            }
          </div>
        </div>
        
        <div className={`relative overflow-hidden lg:flex items-center justify-center w-full ${showHero ? 'h-0 duration-200 lg:h-[0vh]' : 'h-max lg:h-[45vh] duration-200'} lg:py-0 py-1 bg-slate-900`}>
            <div className='relative lg:absolute lg:top-8 lg:mt-0 mt-6 left-[-6px] lg:left-[30px] flex items-center justify-between w-full lg:w-max lg:scale-1 scale-[0.9]'>
              <div className='flex mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white' title='Beginner writer'>
                <Image src={Beginner} alt='beginner-icon' width={20} height={20} />
              </div>
              {/* <div className='flex mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white' title='Winner of competition'>
                <Image src={Winner} alt='beginner-icon' width={20} height={20} />
              </div> */}
              <div className={`${allPoems && allPoems?.length >= 10 ? 'flex' : 'hidden'} mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white`} title='Collector of 10 poems'>
                <Image src={Ten} alt='beginner-icon' width={20} height={20} />
              </div>
              <div className={`${allPoems && allPoems?.length >= 20 ? 'flex' : 'hidden'} mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white`} title='Collector of 20 poems'>
                <Image src={Streak} alt='beginner-icon' width={20} height={20} />
              </div>
              <div className={`${allPoems && allPoems?.length >= 30 ? 'hidden lg:flex' : 'hidden'} mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white`} title='Pro writer'>
                <Image src={Pro} alt='beginner-icon' width={20} height={20} />
              </div>
              <div className={`${allPoems && allPoems?.length >= 30 ? 'flex' : 'hidden'} mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white`} title='Collector of 30 poems'>
                <Image src={Most} alt='beginner-icon' width={20} height={20} />
              </div>
              <div className={`${allPoems && (allPoems?.length >= 30 && checkDate(auth?.created_at)) ? 'hidden lg:flex' : 'hidden'} mx-2 lg:mr-4 cursor-pointer duration-100 shadow-md border border-white items-center justify-center w-[40px] h-[40px] rounded-full bg-white`} title='This is Legend!'>
                <Image src={Veteran} alt='beginner-icon' width={20} height={20} />
              </div>
            </div>


            <h1 className='relative lg:absolute w-full z-[1] opacity-30 text-[70px] lg:text-[104px] text-center text-slate-100 hidden lg:flex items-center justify-center transform translate-x-[0%] top-[40%]'>P.O.E.T.R.Y</h1>
            <div className='relative z-[333] w-[180px] h-[180px] mx-auto lg:my-0 my-12 rounded-full bg-white shadow-md'>
                <Image src={data && data.avatar === 'default' ? Default : data?.avatar} alt='photo-profile-me' width={240} height={240} className='w-full bg-white h-full z-[333] duration-300 hover:grayscale-[50%] object-cover rounded-full' />
                <Image src={Border} alt='photo-profile-me' width={500} height={500} className='absolute scale-[1.3] z-[-1] top-0 w-full h-full duration-300 object-cover rounded-full' />
            </div>
            
            <div className='absolute w-max flex items-center top-8 right-[40px]'>
              {
                (data?.user_id === auth?.user_id) && (
                  <Link href={`/upload-book/${auth?.penName}/book`}>
                      <div title='edit-profile' className='relative w-[40px] p-3 h-[40px] bg-white shadaw-md hidden lg:flex item-center justify-center rounded-full border border-slate-300 cursor-pointer active:scale-[0.97] z-[44] hover:brightness-[90%]'>
                          <Image src={Plus} alt='icon-pen' width={20} height={20} />
                      </div>
                  </Link>
                )
              }
              {
                (data?.user_id === auth?.user_id) && (
                  <Link href={`/profile/edit/${slug}/${searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id}`}>
                      <div title='edit-profile' className='relative w-[40px] p-3 h-[40px] bg-white ml-10 shadaw-md hidden lg:flex item-center justify-center rounded-full border border-slate-300 cursor-pointer active:scale-[0.97] z-[44] hover:brightness-[90%]'>
                          <Image src={Pen} alt='icon-pen' width={20} height={20} />
                      </div>
                  </Link>
                )
              }
              <div onClick={() => setShowHero(!showHero)} className={`relative hidden lg:flex ml-10 cursor-pointer duration-100 hover:brightness-90 shadow-md items-center justify-center w-[40px] h-[40px] rounded-full bg-white`}>
                <Image src={showHero ? ChevronUp : ChevronDown} alt='beginner-icon' width={18} height={18} className={`duration-200 relative ${showHero ? '-top-[1px]' : 'top-[1px]'} left-[-0.5px]`} />
              </div>
            </div>
        </div>

        <div className='relative w-full px-4 lg:px-10 py-5'>
            {/* Flower */}
            <Image src={Flower1} alt="flower" width={400} height={400} className='absolute right-[-5%] top-3 opacity-5 lg:opacity-15' />

            <div className='w-full flex items-center justify-between'>
              <Link href={'/'} className='w-max h-max'>
                <div className='w-max flex z-[3333] items-center text-blue-600'>
                    <Image src={ArrowLeft} onClick={() => router.push('/')} alt='arrow-left' width={20} height={30} className='mr-1 z-[333333]' />
                    <p className='relative lg:flex hidden top-[-2px] ml-1'>profile <span className='mx-1'>/</span> {decodeURIComponent(slug)}</p>
                </div>
              </Link>

              <div className='w-max flex items-center'> 
                <p className='flex w-max'>{data && data?.year !== '-' ? data?.year : ''} ({data && data?.year !== '-' ? `${calculateDifference(data?.year)} - ${calculateDifference(data?.year) + 1} tahun` : 'Usia belum diketahui' }), <b className='ml-1'>{data?.country}</b></p>
              </div>
            </div>

            <hr className='mt-6 mb-4 border border-slate-300' />

            <div className='w-full border-b pb-3 border-b-slate-400 mb-5 flex lg:hidden items-center justify-between'>
              <Link href={`/profile/edit/${slug}/${searchParams.get('author') === "invite" ? poetry?.authorId : auth?.user_id}`}>
                <div className={`relative lg:hidden flex cursor-pointer duration-100 hover:brightness-90 shadow-md items-center justify-center w-[40px] h-[40px] rounded-full ${mute ? 'border-red-500 border-[2px]' : 'border-slate-500 border'} bg-white`}>
                  <Image src={Pen} alt='pen-icon' width={14} height={14} />
                </div>
              </Link>
              <div onClick={() => setShowHero(!showHero)} className={`relative flex ml-5 cursor-pointer duration-100 border border-slate-500 hover:brightness-90 shadow-md items-center justify-center w-[40px] h-[40px] rounded-full bg-white`}>
                  <Image src={showHero ? ChevronUp : ChevronDown} alt='beginner-icon' width={18} height={18} className={`duration-200 relative ${showHero ? '-top-[1px]' : 'top-[1px]'} left-[-0.5px]`} />
                </div>
            </div>

            <h2 className='font-bold lg:flex items-center text-[26px] lg:text-[36px]'>– {data?.penName ?? ''} <span className='lg:flex hidden'>-</span> <Image src={data && data?.gender === 'M' ? Male : data && data?.gender === 'F' ? Female : Netral} alt='arrow-left' width={data && (data?.gender === 'M' || data?.gender === 'F') ? 20 : 30} height={data && (data?.gender === 'M' || data?.gender === 'F') ? 20 : 30} className='ml-3 lg:flex hidden' /></h2>
            <p className='w-[90%] lg:w-[70%] text-slate-600 lg:text-[16px] text-[14px] leading-loose'>– {data?.bionarasi === null || data?.bionarasi === '-' ? 'Bionarration has not been added to this account' : data?.bionarasi}</p>
            {/* <p className='w-[70%] text-slate-600 leading-loose'>– Mahasiswa semester 8 angkatan tahun 2021, asal dari prodi teknik informatika di STMIK IKMI KOTA CIREBON. Pria yang hobi berpuisi dan nogding serta olahrga futsal dan renang.</p> */}
            
            <hr className='my-6 border border-slate-300' />

            {/* List poetry */}
            <div className='w-full flex items-center justify-between'>
              <h2 className='font-bold text-[26px] lg:text-[36px]'>– His digital Book</h2>
              {
                 (data?.user_id === auth?.user_id) && (
                  <div className='flex items-center'>
                    <p className='mr-3 lg:flex hidden text-[17px]'>Create book</p>
                    <Link href={`/upload-book/${slug}/book/`}>
                      <div className='relative w-[35px] lg:w-[40px] h-[35px] lg:h-[40px] rounded-full border border-slate-600 bg-white shadow-md z-40 flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90'>
                        <Image src={Plus} alt="plus" width={20} height={20} />
                      </div>
                    </Link>
                  </div>
                 )
              }
            </div>
            <div className={`w-full mt-8 flex flex-wrap ${Array.isArray(books) && books.length > 3 ? 'justify-between' : 'justify-start'}`}>
              {
                Array.isArray(books) && books.length > 0 ? (
                  books.map((_, index) => (
                  <div key={index} className={`w-full lg:w-[23%] mb-5 h-[350px] ${books.length > 3 ? 'mx-0' : 'lg:mx-3'}`}>
                    <div className="w-full mb-5 h-full rounded-[12px] bg-white border border-slate-400 shadow-sm cursor-pointer duration-200 overflow-hidden">
                    
                      <div className="relative w-full h-[60%] overflow-hidden object-cover">
                        {
                           (data?.user_id === auth?.user_id) && (
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
                  <div className='w-[90vw] mx-auto lg:mx-4 h-[350px] flex-col flex justify-center items-center lg:w-full border border-slate-300 rounded-lg p-4'>
                    {
                      (data?.user_id === auth?.user_id && books.length === 0) && (
                        <Link href={`/upload-book/${slug}/book`}>
                          <div className='w-[50px] h-[50px] mb-5 flex items-center justify-center p-1 cursor-pointer active:scale-[0.97] hover:brightness-90 duration-75 border border-slate-400 rounded-full'>
                            <Image src={Plus} alt='icon-plus' width={24} height={24} />
                          </div>
                        </Link>
                      )
                    }
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