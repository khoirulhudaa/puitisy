"use client"

import Hero from "@/components/hero";
import Icons from "@/components/icons";
import Dummy from '@/public/dummy.jpeg';
import Flower1 from '@/public/flower1.png';
import { getPoetryDetail } from "@/redux/auth/DataSlice";
import { url_endpoint } from "@/services/Actions";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Home = () => {
  const [searchAuthor, setSearchAuthor] = useState('');
  const [allPoetry, setAllPotery] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectGenre, setSelectGenre] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [poemsPerPage, setPoemsPerPage] = useState(30); // Default to 30 poems per page

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const responseGetAllPoetry = async () => {
      try {
        const getPoetry = await url_endpoint.getAllPoetry();
        setAllPotery(getPoetry?.data?.data || []);
        console.log(getPoetry?.data?.data);
      } catch (error) {
        console.error('Error fetching poetry data:', error);
      }
    };
    responseGetAllPoetry();

    if (searchParams.get('success') === "true") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      Toast.fire({
        icon: "success",
        customClass: {
          popup: 'my-toast'
        },
        title: "Login successfully!",
      });

      router.replace('/', undefined, { shallow: true });
    }
  }, [searchParams, router]);

  const filteredPoetry = allPoetry.filter(poetry => {
    const matchesTitle = searchTitle === '' || poetry.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesAuthor = searchAuthor === '' || poetry.author.toLowerCase().includes(searchAuthor.toLowerCase());
    const matchesGenre = selectGenre === 'All' || poetry.genre === selectGenre;

    return matchesTitle && matchesAuthor && matchesGenre;
  });

  // Pagination logic
  const indexOfLastPoem = currentPage * poemsPerPage;
  const indexOfFirstPoem = indexOfLastPoem - poemsPerPage;
  const currentPoems = filteredPoetry.slice(indexOfFirstPoem, indexOfLastPoem);

  // Number of pages
  const totalPages = Math.ceil(filteredPoetry.length / poemsPerPage);

  // Handler for page navigation
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Handler for poems per page
  const handlePoemsPerPageChange = (event) => {
    setPoemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const genres = [
    'All',
    'Personal Reflection',
    'Loss and Sorrow',
    'Hope and Dreams',
    'Life and Death',
    'Transformation',
    'Relationships',
    'Motivational',
    'Environment',
    'Celebration',
    'Urban Life',
    'Happiness',
    'Romantic',
    'Struggle',
    'Mystery',
    'Sadness',
    'Culture',
    'Memory',
    'Nature',
    'Life',
    'Other'
  ];

  const handleGenreClick = (genre) => {
    setSelectGenre(prevGenre => prevGenre === genre ? 'All' : genre);
  };

  const handleSelectedPoetry = (data) => {
    dispatch(getPoetryDetail(data));
    router.push(`/read/${data?.title}`);
  };

  return (
    <section className="w-screen">
      <Hero />

      {/* Content */}
      <div className="w-full h-max py-4 px-12 box-border">
        <div className="w-full mt-3">
          <div className="flex items-center w-full">
            <p className="font-bold text-[20px] mr-3 my-3 flex w-max">Author :</p>
            {/* Search Author */}
            <div className="w-[25%] flex py-3 items-center justify-between px-3 gap-3 rounded-lg border-[0.4px] border-[#BFBFBF]">
              <Icons type="find" className="flex items-center justify-center w-3 h-3" />
              <input type="text" name='searchAuthor' value={searchAuthor} onChange={e => setSearchAuthor(e.target.value)} placeholder="Search by author poetry" className="h-full w-[220px] text-slate-600 outline-0 border-0 text-[15px]" />
              <Icons type="close" className="flex items-center justify-center w-3 h-3 cursor-pointer active:scale-[0.98]" onClick={() => setSearchAuthor('')} />
            </div>
            {/* Search Title */}
            <p className="font-bold text-[20px] mr-1 ml-5 my-3 flex w-max">Title :</p>
            <div className="w-[25%] ml-3 flex py-3 items-center justify-between px-3 gap-3 rounded-lg border-[0.4px] border-[#BFBFBF]">
              <Icons type="find" className="flex items-center justify-center w-3 h-3" />
              <input type="text" name='title' value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder="Search by title poetry" className="h-full w-[220px] text-slate-600 outline-0 border-0 text-[15px]" />
              <Icons type="close" className="flex items-center justify-center w-3 h-3 cursor-pointer active:scale-[0.98]" onClick={() => setSearchTitle('')} />
            </div>
          </div>

          {/* List Genre */}
          <div className="w-full flex items-center mt-4">
            <p className="font-bold pb-4 text-[20px] mr-3 my-3 flex items-center w-[82px]">Genre :</p>
            <div id="swap-genre" className="w-full pr-12 overflow-x-auto flex items-center">
              <div className="flex items-center w-max pb-4">
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className={`w-max h-max px-5 py-2 rounded-full flex items-center justify-center cursor-pointer active:scale-[0.98] hover:bg-blue-200 hover:text-blue-800 mr-3 border border-slate-400 ${selectGenre === genre ? 'bg-blue-200 text-blue-800' : ''}`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="my-7 w-full border border-slate-300" />

          <div id="read" className={`w-full flex flex-wrap ${filteredPoetry.length > 3 ? 'justify-between' : 'justify-start'}`}>
            {Array.isArray(currentPoems) && currentPoems.length > 0 ? (
              currentPoems.map((poem, index) => (
                <div key={index} className={`${filteredPoetry.length > 3 ? 'mr-0' : 'mr-5'} w-[23%] mb-5 h-[360px] rounded-[12px] bg-white border border-slate-300 shadow-sm cursor-pointer duration-200 overflow-hidden`}>
                  <div className="relative w-full h-[60%] overflow-hidden object-cover">
                    <div className="absolute top-4 right-4 px-5 py-1 bg-slate-200 text-slate-800 shadow-md border border-white flex items-center justify-center rounded-full">
                      Poem
                    </div>
                    <Image src={poem?.cover && poem?.cover !== '-' ? poem?.cover : Dummy} alt="Poetry Cover" className="w-full h-full object-cover" width={100} height={100} />
                  </div>
                  <div onClick={() => handleSelectedPoetry(poem)} className="relative w-full p-3 h-[40%]">
                    <h2 className="max-w-[90%] text-blue-500 underline active:scale-[0.98] text-[18px] mt-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{poem?.title}</h2>
                    <i>
                      <small className="max-w-[90%] text-[13px] overflow-hidden whitespace-nowrap overflow-ellipsis">{poem?.author}</small>
                    </i>
                    <hr className="my-4 border border-slate-200" />
                    <p className="rounded-full absolute bottom-4 px-4 py-2 max-w-[90%] left-0 text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                      <span className="font-bold mr-2">Genre:</span> {poem?.genre}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className='w-[90vw] mx-auto lg:mx-4 h-[350px] flex justify-center items-center lg:w-[90vw] border border-slate-300 rounded-lg p-4'>
                <p>Poetry not found</p>
              </div>
            )}
          </div>

          <hr className="my-4 border border-slate-300" />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <div>Show </div>
              <select
                value={poemsPerPage}
                onChange={handlePoemsPerPageChange}
                className="border border-slate-300 mx-3 px-3 py-2 rounded-md"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <div> /page</div>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-slate-300 rounded-md mr-2"
              >
                Previous
              </button>
              <span className="mx-1">Page <b>{currentPage}</b> of <b className="ml-1">{totalPages}</b></span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-slate-300 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="relative overflow-hidden w-[100vw] mx-auto py-20 h-max text-center flex flex-col items-center justify-center px-12 box-border">
         <Image src={Flower1} alt='flower' width={370} height={370} className='absolute right-[0%] bottom-[0%] z-[1] opacity-15' />
          <h2 className="text-[40px] leading-loose w-[70vw] z-[333333]">"Words are the keys to the hearts. When wisdom is written, it unlocks the doors of knowledge, and when knowledge is shared, it illuminates the soul."</h2>
            <p className="relative before:absolute before:bottom-0 before:left-0 before:w-[90%] mt-3 text-[18px] before:h-[2px] before:bg-slate-500">Imam Al-Ghazali</p>
      </div>

      <hr className="w-full my-8 border border-slate-300" />
      
      <div id="desc" className="relative overflow-hidden w-[100vw] mx-auto py-20 h-max flex flex-col items-end px-12 box-border">
         <Image src={Flower1} alt='flower' width={370} height={370} className='absolute left-[-4%] bottom-[0%] z-[1] opacity-15' />
          <h2 className="relative w-max text-[36px] mb-6">– Is that poetry</h2>
          <p className="w-[80%] leading-loose">Poetry is a form of literary expression that uses structured, rhythmic language, often with emotional undertones, to convey ideas, feelings, or experiences. In poetry, every word is carefully chosen to create deeper meaning and aesthetic effects, often employing styles such as metaphor, simile, alliteration, and symbolism. –</p>
      </div>

      <hr className="w-full my-8 border border-slate-300" />

      <div id="tips" className="relative overflow-hidden w-[100vw] mx-auto pb-12 pt-12 h-max px-12 box-border">
         <Image src={Flower1} alt='flower' width={370} height={370} className='absolute right-[-4%] top-[0%] z-[1] opacity-15' />
          <h2 className="relative w-max text-[36px] mb-6">– Go further!</h2>
          <div className="w-full flex justify-between items-center flex-wrap">
              <div className="w-[48.5%] mb-10 border border-slate-300 rounded-md px-6 py-8">
                <h3 className="font-bold mb-3">Exploring Poetic Styles and Techniques</h3>
                <p className="leading-loose w-[90%] text-[14px] text-slate-600">Discuss various styles of poetry, such as free verse, sonnets, haikus, and other classical forms. Explain advanced techniques like enjambment, anaphora, complex metaphors, and sound play.</p>
              </div>
              <div className="w-[48.5%] mb-10 border border-slate-300 rounded-md px-6 py-8">
                <h3 className="font-bold mb-3">Developing Your Personal Poetic</h3>
                <p className="leading-loose w-[90%] text-[14px] text-slate-600">Find your unique poetic voice by experimenting with different themes and styles. Focus on authenticity to create poetry that reflects your true self and stands out in the literary world.</p>
              </div>
              <div className="w-[48.5%] border border-slate-300 rounded-md px-6 py-8">
                <h3 className="font-bold mb-3">Editing and Refining Poetry</h3>
                <p className="leading-loose w-[90%] text-[14px] text-slate-600">Edit your poetry to improve clarity and emotional depth. Maintain rhythm and refine diction to ensure each line contributes effectively while preserving the poem's essence.</p>
              </div>
              <div className="w-[48.5%] border border-slate-300 rounded-md px-6 py-8">
                <h3 className="font-bold mb-3">Published and Winning Awards </h3>
                <p className="leading-loose w-[90%] text-[14px] text-slate-600">Learn how to publish your poetry and enter contests. Build a professional reputation and explore strategies for advancing your career as a poet through networking and literary engagement.</p>
              </div>
          </div>
      </div>

    </section>
  );
}

export default Home;
