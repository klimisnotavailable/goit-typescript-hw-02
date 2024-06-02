import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { getImages } from './images-api';
import ImageGallery from './components/imageGallery/ImageGallery';
import toast from 'react-hot-toast';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

const toastSettings:object = {
    duration: 4000,
    position: 'top-center',
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
};

type Image = {
  id:string;
  urls:{raw:string,regular:string,thumb:string,full:string,small:string}
};

type Response = {
  results:Image[];
  total:number;
  total_pages:number;
}


function App() {
  const [imagesData, setImagesData] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState("");
 
  const loadMore = () => {
    setPage(page + 1)
  };

  const showError = () => toast.error('Enter something you want to see', toastSettings);
  
  const onSearch = (newSearch:string) => {
    setImagesData([])
    setQuery(newSearch)
    setPage(1)
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        const data:Response = await getImages(query, page);
        console.log(data)
        setImagesData((prevImages):Image[] => {
          return [...prevImages, ...data.results]
        })

      }
      catch (error) {
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }

    fetchImages();
  }, [page, query]);

  const showModal = ():void => {
    setIsOpen(true)
  };
  
  const closeModal = ():void => {
    setIsOpen(false)
  };


  return (
    <>
      <SearchBar onSearch={onSearch} catchError={showError}></SearchBar>
      {imagesData.length > 0 && <ImageGallery data={imagesData} setImage={setImageToShow} setIsOpen={setIsOpen} ></ImageGallery>}
      {isOpen && <ImageModal isOpen={isOpen} img={imageToShow} onCloseModal={closeModal}></ImageModal>}
      {error && <ErrorMessage/>}
      {loading && <Loader/>}
      {imagesData.length > 0 && <LoadMoreBtn onLoadMore={loadMore}/>}
      {/* <button onClick={() => { setIsOpen(true) }}>open modal</button> */}

    </>
  )
}

export default App
