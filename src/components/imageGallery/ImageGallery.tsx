import ImageCard from '../ImageCard/ImageCard';
import css from "../imageGallery/ImageGallery.module.css";

type Props ={
    data:Image[];
    setIsOpen: (isOpen:boolean)=>void;
    setImage: (image:string) =>void;
};

type Image = {
    id:string;
    urls: {raw:string,regular:string,full:string,small:string,thumb:string};   
};

export default function ImageGallery({ data, setIsOpen, setImage }:Props) {
    const gallery = data.map((image) => {
        return <li key={image.id}> <ImageCard image={image} setIsOpen={setIsOpen} 
        setImage={setImage} /></li>
    });
    return <ul className={css.imageGallery}>{gallery }</ul>
}

