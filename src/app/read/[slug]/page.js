"use client";

import convertToWord from '@/app/helpers/convertToWord';
import ArrowLeft from '@/public/arrow-left.png';
import AudioActive from '@/public/audioActive.png';
import AudioInActive from '@/public/audioInActive.png';
import Copy from '@/public/copy.png';
import Flower1 from '@/public/flower1.png';
import Ig from '@/public/ig.png';
import Pen from '@/public/penWhite.png';
import Share from '@/public/share.png';
import Speed from '@/public/speed.png';
import Tele from '@/public/tele.png';
import Download from '@/public/unduh.png';
import User from '@/public/user.png';
import Wa from '@/public/wa.png';
import store from '@/redux/Store';
import { url_endpoint } from '@/services/Actions';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Page = () => {
  const [showShare, setShowShare] = useState(false);
  const [active, setActive] = useState(false);
  const [customDocx, setCustomDocx] = useState(false);
  const [author, setAuthor] = useState(null);
  const [book, setBook] = useState(null);
  const [paper, setPaper] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [font, setFont] = useState(null);

  const { slug } = useParams()
  const poetry = store.getState().Data?.poetry
  const auth = store.getState().Auth?.auth

  useEffect(() => {
    const getAuthor = async () => {
      const response = await url_endpoint?.getAccountById(poetry?.authorId)
      const responseBook = await url_endpoint?.getBookById(poetry?.book_id)
      setAuthor(response?.data?.data)
      setBook(responseBook?.data?.data)
    }

    getAuthor()
  }, [])

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''; // Mendapatkan URL saat ini

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareToInstagram = () => {
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`;
    window.open(instagramUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      // Tampilkan toast menggunakan SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'URL copied to clipboard!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#fff',
        customClass: {
          popup: 'my-toast',
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    });
  };

  const MenuShare = () => {
    return (
      <div className='absolute top-[-180%] lg:bottom-[-110%] rounded-md lg:left-[-200%] left-[-100%] flex lg:flex-col justify-center w-max h-max px-4 py-1 bg-white shadow-lg border border-slate-400 z-[3]'>
        <div onClick={() => shareToWhatsApp()} className='w-[32px] flex items-center justify-center h-[32px] rounded-full bg-white border border-slate-300 lg:mx-0 mx-3 my-2 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100'>
          <Image src={Wa} alt='icon-sosmed' width={16} height={16} />
        </div>
        <div onClick={() => shareToInstagram()} className='w-[32px] flex items-center justify-center h-[32px] rounded-full bg-white border border-slate-300 lg:mx-0 mx-3 my-2 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100'>
          <Image src={Ig} alt='icon-sosmed' width={16} height={16} />
        </div>
        <div onClick={() => shareToTelegram()} className='w-[32px] flex items-center justify-center h-[32px] rounded-full bg-white border border-slate-300 lg:mx-0 mx-3 my-2 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100'>
          <Image src={Tele} alt='icon-sosmed' width={16} height={16} />
        </div>
        <div onClick={() => copyToClipboard()} className='w-[32px] flex items-center justify-center h-[32px] rounded-full bg-white border border-slate-300 lg:mx-0 mx-3 my-2 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100'>
          <Image src={Copy} alt='icon-sosmed' width={16} height={16} />
        </div>
      </div>
    )
  }

  const PaperSizes = [
    { value: 'A4', label: 'A4', width: 11906, height: 16838, margin: 720 },
    { value: 'A5', label: 'A5', width: 8272, height: 11692, margin: 720 },
  ];
  
  // Mengonversi objek FontSizes menjadi array
  const FontSizes = [
    { value: 10, label: '10-px', size: 20 },
    { value: 11, label: '11-px', size: 22 },
    { value: 12, label: '12-px', size: 24 },
  ];
  
  // Mengonversi objek Fonts menjadi array
  const Fonts = [
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Calibri', label: 'Calibri' },
  ];

  const MenuCustomDocx = () => {
    return (
      <div className={`fixed top-[35%] rounded-md left-[50%] transform lg:transform-none lg:translate-x-0 translate-x-[-50%] lg:left-[38%] flex flex-col justify-center w-[92vw] lg:w-max h-max px-4 py-5 bg-white shadow-lg border border-slate-400 z-[33333333]`}>
        <div className='w-max flex items-center'>
          {
            FontSizes?.map((data, index) => (
              <div key={index} onClick={() => setFontSize(data?.value)} className={`w-max px-2 flex items-center justify-center h-[40px] rounded-md ${fontSize === data?.value ? 'bg-blue-500 text-white' : 'bg-white text-black'} border border-slate-300 mx-2 mb-3 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100`}>
                <p>{data?.label}</p>
              </div>
            ))
          }
        </div>
        <hr className='mb-3 border border-slate-200' />
        <div className='w-max flex items-center'>
          {
            PaperSizes?.map((data, index) => (
              <div key={index} onClick={() => setPaper(data?.value)} className={`w-[40px] flex items-center justify-center h-[40px] rounded-md ${paper === data?.value ? 'bg-blue-500 text-white' : 'bg-white text-black'} border border-slate-300 mx-2 mb-3 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100`}>
                <p>{data?.label}</p>
              </div>
            ))
          }
        </div>
        <hr className='mb-3 border border-slate-200' />
        <div className='w-max flex items-center'>
          {
            Fonts?.map((data, index) => (
              <div key={index} onClick={() => setFont(data?.value)} className={`w-max px-3 flex items-center justify-center h-[40px] rounded-md ${font === data?.value ? 'bg-blue-500 text-white' : 'bg-white text-black'} border border-slate-300 mx-2 mb-3 cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100`}>
                <p>{data?.label}</p>
              </div>
            ))
          }
        </div>
        <hr className='mb-3 border border-slate-200' />
        
        <div className='relative w-full flex z-[33] items-center justify-between'>
          <div onClick={() => setCustomDocx(false)} className='w-[48%] h-max text-red-500 bg-white border border-red-500 rounded-md cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100 flex items-center justify-center px-4 py-2 mt-2'>
            Cancel
          </div>
          <div onClick={() => convertToWord(poetry?.content, poetry?.title, author?.penName, fontSize, paper, font)} className='w-[48%] h-max text-white bg-blue-500 rounded-md cursor-pointer active:scale-[0.98] hover:brightness-90 duration-100 flex items-center justify-center px-4 py-2 mt-2'>
            Download
          </div>
        </div>
      </div>
    )
  }

  const readTextAloud = (html) => {
    try {
      // Menggunakan DOMParser untuk mengonversi HTML menjadi teks biasa
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.innerText.trim()).filter(text => text.length > 0);
  
      if (paragraphs.length === 0) {
        return;
      }
  
      const synth = window.speechSynthesis;
  
      // Hentikan semua pembacaan aktif
      if (synth.speaking) {
        synth.cancel(); // Hentikan pembacaan aktif
      }
  
      console.log('Mulai membaca teks...');
      setActive(true); // Menandai bahwa pembacaan aktif
  
      const readParagraph = (index) => {
        if (index >= paragraphs.length) {
          setActive(false); // Menandai bahwa pembacaan selesai
          return;
        }
  
        const utterance = new SpeechSynthesisUtterance(paragraphs[index]);
        utterance.lang = 'id-ID'; // Set bahasa jika diperlukan
  
        utterance.onstart = () => {
          console.log(index + 1);
        };
  
        utterance.onend = () => {
          console.log(index + 1);
          setTimeout(() => {
            readParagraph(index + 1); // Lanjutkan ke bagian berikutnya
          }, 1000); // Penundaan 1 detik
        };
  
        utterance.onerror = (event) => {
          console.error('Kesalahan saat membaca teks bagian', index + 1, ':', event);
          // Lanjutkan ke bagian berikutnya meskipun ada kesalahan
          readParagraph(index + 1);
        };
  
        // Mulai pembacaan
        synth.speak(utterance);
      };
  
      // Mulai membaca paragraf pertama
      readParagraph(0);
    } catch (error) {
      console.error('Kesalahan dalam proses:', error);
      setActive(false); // Menandai bahwa pembacaan selesai meskipun ada kesalahan
    }
  };

  const skipReading = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  const stopReading = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause(); // Hentikan semua pembacaan suara
      setActive(false); // Menandai bahwa pembacaan telah dihentikan
    }
  };

  return (
    <section className='w-screen flex min-h-[80vh]'>

      <div className='w-full p-4 lg:p-10 pt-8 lg:pt-10 pb-2'>
        <div className='w-full lg:flex items-center'>
          <div className='w-full lg:w-1/2'>
            <div className='lg:flex items-center w-full lg:w-max'>
              <Link href={`/profile/${author?.penName}`} className='mr-2 w-[10%]'>
                <div className='w-[30px] h-[30px] rounded-full flex mr-4 items-center justify-center p-1 bg-white border border-slate-400 shadow-sm text-white cursor-pointer active:scale-[0.97] hover:brightness-90'>
                  <Image src={ArrowLeft} alt='arrow-left-icon' width={14} height={14} />
                </div>
              </Link>
              <h2 className='relative font-[800] w-[85%] text-[24px] lg:text-[30px] flex items-center'><span className='mr-2 lg:flex hidden'>–</span> <span className='w-[100%] overflow-hidden whitespace-nowrap text-ellipsis'>{decodeURIComponent(poetry?.title)}</span></h2>
            </div>
            <i>
              <small className='text-[15px] lg:text-[17px]'>Oleh: {author?.penName}</small>
            </i>
          </div>
          <p className='ml-auto text-[15px] lg:text-[18px]'>{poetry?.timeMarker ?? '-'}</p>
        </div>

        <hr className='my-5 border-[1px] border-slate-200' />

        <div className='lg:flex w-full h-max'>
          <div className='relative lg:flex w-full lg:w-[70%] lg:mb-0 mb-10 lg:border-b-0 lg:min-h-screen lg:border-r lg:border-r-slate-300'>

            <div className='absolute right-[-120px] top-[10%] overflow-hidden'>
              <Image src={Flower1} alt="flower" width={400} height={400} className='opacity-5 lg:opacity-15' />
            </div>

            <div className='w-full lg:w-[70px] mr-4 mt-[7px] h-max pb-4 lg:border-b border-b-slate-300'>
              <div className={`w-[40px] h-[40px] border ${active ? 'border-white bg-blue-500 text-white' : 'border-slate-300'} rounded-md flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90`} onClick={() => {!active ? readTextAloud(poetry?.content) : null()}}>
                <Image src={active ? AudioActive : AudioInActive} alt='audio-icon' width={20} height={20} />
              </div>
              {
                active && (
                  <>
                    <div onClick={() => skipReading()} className={`w-[40px] h-[40px] mt-5 border border-slate-400 text-white rounded-md flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90`}>
                      <Image src={Speed} alt='audio-icon' width={20} height={20} />
                    </div>
                    <div onClick={() => stopReading()} className={`w-[40px] h-[40px] mt-5 border border-red-500 text-white rounded-md flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-90`}>
                      <div className='w-[40%] h-[40%] rounded-full bg-red-500'></div>
                    </div>
                  </>
                )
              }
            </div>

            <div className='w-[90%] lg:border-r border-r-slate-300'>
              <div dangerouslySetInnerHTML={{ __html: poetry?.content }} />
              <i>
                <p className='text-slate-400 mt-12 text-[16px] flex items-center'><span className='mr-2 lg:flex hidden'>–</span> {poetry?.timeMarker}</p>
              </i>
            </div>

            <div className='relative h-full flex lg:flex-col items-center z-[44] w-max px-0 lg:mt-0 mt-6 lg:w-[10%]'>
              <div onClick={() => setCustomDocx(!customDocx)} className='relative top-0 rounded-full flex lg:mb-5 lg:mr-0 mr-3 items-center justify-center lg:p-3 bg-blue-400 text-white w-[40px] h-[40px] cursor-pointer'>
                <Image src={Download} alt='download-icon' width={20} height={20} />
              </div>
              {
                customDocx && <MenuCustomDocx />
              }

              <div className='w-[70%] lg:flex hidden h-[1px] border-b border-b-slate-300 mb-5' />

              <div onClick={() => setShowShare(!showShare)} className='relative top-0 rounded-full lg:mr-0 mr-3 flex items-center justify-center p-3 bg-gray-400 text-white w-[40px] h-[40px] cursor-pointer active:scale-[0.98]'>
                <Image src={Share} alt='share-icon' width={20} height={20} className='relative left-[-1.2px]' />
                {
                  showShare && <MenuShare />
                }
              </div>

              <div className='w-[70%] lg:flex hidden h-[1px] border-b border-b-slate-300 my-5' />
              
              {
                poetry?.authorId === auth?.user_id ? (
                  <Link href={`/edit-poetry/${poetry?.poetry_id}/${poetry?.title}`}>
                    <div className='top-0 rounded-full flex items-center justify-center p-3 bg-indigo-400 text-white w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90'>
                      <Image src={Pen} alt='user-icon' width={20} height={20} className='relative' />
                    </div>
                  </Link>
                ):
                <Link href={`/profile/${author?.penName}?author=invite`}>
                  <div className='top-0 rounded-full flex items-center justify-center p-3 bg-indigo-400 text-white w-[40px] h-[40px] cursor-pointer active:scale-[0.98] hover:brightness-90'>
                    <Image src={User} alt='user-icon' width={20} height={20} className='relative' />
                  </div>
                </Link>
              }
            </div>

          </div>

          <hr className='mb-6 border-[1px] lg:hidden border-slate-200' />

          <div className='relative w-full lg:w-[30%] h-max pb-2 lg:pb-10 lg:pl-6 pr-3'>
            <label className='font-bold flex items-center'><span className='mr-2 lg:flex hidden'>–</span> Bionarasi:</label>
            <p className='text-[14px] leading-loose'>{author?.bionarasi}</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold flex items-center'><span className='mr-2 lg:flex hidden'>–</span> Genre:</label>
            <p className='text-[14px] leading-loose'>{poetry?.genre}</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold flex items-center'><span className='mr-2 lg:flex hidden'>–</span> Sinopsis:</label>
            <p className='text-[14px] leading-loose'>{book?.synopsis}</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold flex items-center'><span className='mr-2 lg:flex hidden'>–</span> Book/Link Reference:</label>
            <p className='text-[14px] leading-loose'>{poetry?.source}</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold flex items-center'><span className='mr-2 lg:flex hidden'>–</span> {poetry?.typeNumberBook === 'ISBN' ? 'ISBN' : poetry?.typeNumberBook === 'QRCBN' ? 'QRCBN' : '-'}</label>
            <p className='text-[14px] leading-loose'>{poetry?.numberBook ? poetry?.numberBook : '-' }</p>
            
            <hr className='my-6 border border-slate-300' />

            <label className='font-bold flex items-center'><span className='mr-2 lg:flex hidden'>–</span> Instagram:</label>
            <p className='text-[14px] leading-loose'>{author?.instagram}</p>
          </div>
        </div>

        <hr className='mt-5 border w-full border-slate-300' />

      </div>

      {/* <div>{decodeURIComponent(slug)}</div>
      <div>{id}</div> */}
    </section>
  )
}

export default Page