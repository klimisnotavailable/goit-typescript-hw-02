type Props ={
    image:Image;
    setIsOpen: (value:boolean)=>void;
    setImage:(image:string)=>void;
};

type Image = {
    id:string;
    urls: {raw:string,regular:string,full:string,small:string,thumb:string};   
};

export default function ImageCard({ image, setIsOpen, setImage }:Props) {
    const {  regular, small } = image.urls;

    return <div id={image.id} >
        <img onClick={() => { setIsOpen(true); setImage(regular)}} src={small} alt="" width={50} height={50}/>
    </div>
}