import Modal from "react-modal";
Modal.setAppElement("#root");

type Props = {
    isOpen:boolean;
    img:string;
    onCloseModal: ()=>void;
}

export default function ImageModal({ isOpen, img, onCloseModal }:Props) {
    return <Modal isOpen={isOpen}><button onClick={() => onCloseModal() }>close</button> <img src={img } alt="" width={600} height={600} /></Modal>
}