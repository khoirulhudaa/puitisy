"use client";

import ArrowLeft from '@/public/arrow-left.png';
import Flower1 from '@/public/flower1.png';
import Upload1 from '@/public/upload1.jpeg';
import Upload2 from '@/public/upload2.jpeg';
import Upload3 from '@/public/upload3.jpeg';
import Upload4 from '@/public/upload4.jpeg';
import Upload5 from '@/public/upload5.jpeg';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import '../../../../globals.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

const Page = () => {

  const [title, setTitle] = useState('') 
  const [synopsis, setSynopsis] = useState('') 
  const [code, setCode] = useState('') 
  const [original, setOriginal] = useState('Y') 
  const [publish, setPublish] = useState('N') 
  const [source, setSource] = useState('') 
  const [ISBN, setISBN] = useState('') 
  const [QRCBN, setQRCBN] = useState('') 
  const [timeMarker, setTimeMarker] = useState('') 
  const [genre, setGenre] = useState('') 
  const [selectedImage, setSelectedImage] = useState(''); 
  const [editorData, setEditorData] = useState('');


  const { slug } = useParams()

  useEffect(() => {
    const images = [Upload1, Upload2, Upload3, Upload4, Upload5];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setSelectedImage(randomImage);
  }, []);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const [error, setError] = useState('')
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
        <Image src={selectedImage} alt='bg-login-side' className='w-full h-full object-cover' />
      </div>
      <div className='relative w-[70%] h-screen overflow-y-auto overflow-x-hidden py-6 px-12'>

        {/* Flower */}
        <Image src={Flower1} alt='flower' width={320} height={320} className='fixed right-[-3%] top-[-10%] transform -rotate-90 z-[1] opacity-30' />

        <h2 className='text-[56px] relative ml-[-10px]'>EdiT youR poeM!</h2>

        <form className='w-[90%] mt-2'>
          <label className='text-[16px]'>– Title poetry</label>
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

          <div className='w-[75%] flex flex-col mt-3 h-max'>
            <label className='mb-3 text-[16px]'>– content of the poem</label>
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={handleEditorChange}
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

          <div className='w-full flex mt-1 mb-3 flex-col min-h-[60px]'>
            <label className='mb-3 text-[16px]'>– Genre</label>
            <div className='flex w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
              <select className='w-full h-full py-5 outline-0' value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value={'Personal Reflection'}>Personal Reflection</option>
                <option value={'Relationships'}>Relationships</option>
                <option value={'Motivational'}>Motivational</option>
                <option value={'Celebration'}>Celebration</option>
                <option value={'Romantic'}>Romantic</option>
                <option value={'Mystery'}>Mystery</option>
                <option value={'Sadness'}>Sadness</option>
                <option value={'Nature'}>Nature</option>
                <option value={'Life'}>Life</option>
                <option value={'other'}>Other</option>
              </select>
            </div>
          </div>

          <br />

          <label className='mb-3 text-[16px]'>– Original Work ?</label>
          <div className='flex items-center w-max mt-4 rounded-md border border-slate-300 p-2'>
              {['Y', 'N'].map((option) => (
                <label className='flex mr-3 items-center' key={option}>
                  <input
                    type="radio"
                    name="original"
                    className='w-[20px] h-[20px]'
                    value={option}
                    checked={original === option}
                    onChange={(e) => setOriginal(e.target.value)}
                  />
                  <p className='ml-2'>
                    {option}
                  </p>
                </label>
              ))}
          </div>

          <br />

          <div className='w-full flex mt-4 mb-10 flex-col h-[60px]'>
            <label className={`mb-3 text-[16px] ${original === 'N' ? '' : 'text-slate-400'}`}>– Source (Book Name or Link)</label>
            <div className={`flex w-[75%] ${original === 'N' ? '' : 'bg-slate-200'} border border-slate-300 rounded-lg px-5 items-center`}>
              <input 
                type='text' 
                name='source' 
                value={source}
                disabled={original === 'Y'}
                placeholder='Enter Your Source...' 
                onChange={(e) => setSource(e.target.value)} 
                className={`w-full h-full py-5 outline-0 ${original === 'N' ? '' : 'bg-slate-200'}`} 
              />
            </div>
          </div>
    
          <br />

          <label className='mb-3 text-[16px]'>– Have you ever published the book?</label>
          <div className='flex items-center w-max mt-4 rounded-md border border-slate-300 py-4 px-3'>
              {['Y', 'N'].map((option) => (
                <label className='flex mr-3 items-center' key={option}>
                  <input
                    type="radio"
                    name="publish"
                    className='w-[20px] h-[20px]'
                    value={option}
                    checked={publish === option}
                    onChange={(e) => setPublish(e.target.value)}
                  />
                  <p className='ml-2'>
                    {option}
                  </p>
                </label>
              ))}
          </div>

          <br />

          <label className={`mb-3 text-[16px] ${publish === 'Y' ? '' : 'text-slate-400'}`}>– Type of book number</label>
          <div className={`flex items-center w-max mt-4 ${publish === 'Y' ? '' : 'bg-slate-300'} rounded-md border border-slate-300 py-4 px-3`}>
              {['ISBN', 'QRCBN'].map((option) => (
                <label className='flex mr-3 items-center' key={option}>
                  <input
                    type="radio"
                    name="code"
                    className='w-[20px] h-[20px]'
                    value={option}
                    disabled={publish === 'N'}
                    checked={code === option}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <p className={`ml-2 ${publish === 'Y' ? '' : 'text-slate-400'}`}>
                    {option}
                  </p>
                </label>
              ))}
          </div>

          <br />

          <div className='w-full flex mt-4 mb-10 flex-col h-[60px]'>
            <label className={`mb-3 text-[16px] ${publish === 'Y' ? '' : 'text-slate-400'}`}>{publish && code === 'ISBN' ? '– ISBN' : publish && code === 'QRCBN' ? '– QRCBN' : '– ISBN/QRCBN number'}</label>
            <div className={`flex w-[75%] ${publish === 'Y' ? '' : 'bg-slate-200'} border border-slate-300 rounded-lg px-5 items-center`}>
              <input 
                type='text' 
                name={code === 'ISBN' ? ISBN : code === 'QRCBN' ? QRCBN  : ''} 
                value={code === 'ISBN' ? ISBN : code === 'QRCBN' ? QRCBN  : ''}
                disabled={publish === 'N'}
                placeholder={`xxx-xxx-xxx-xxx`} 
                onChange={(e) => code === 'ISBN' ? setISBN(e.target.value) : setQRCBN(e.target.value)} 
                className={`w-full h-full py-5 outline-0 ${publish === 'Y' ? '' : 'bg-slate-200'}`} 
              />
            </div>
          </div>

          <br />

          <div className='w-full flex mb-12 flex-col h-[60px]'>
            <label className='mb-3 text-[16px]'>– Time marker</label>
            <div className='flex w-[75%] border border-slate-300 rounded-lg px-5 items-center'>
              <input 
                type='text' 
                name='TimeMarker' 
                value={timeMarker} 
                placeholder='Cirebon, 19 March 2024' 
                onChange={(e) => setTimeMarker(e.target.value)} 
                className='w-full h-full py-5 outline-0' 
              />
            </div>
          </div>

          <br />

          {/* Button */}
          <div className='relative flex items-center bg-blue-400 py-2 text-white rounded-md w-max h-[70%] px-10 cursor-pointer active:scale-[0.98] hover:brightness-[90%] duration-100'>
              <p>
                Upload Poetry
              </p>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Page