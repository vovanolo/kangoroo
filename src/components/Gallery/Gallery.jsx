import { useState } from "react"
import {Modal} from "../"
import { data } from "./data"
import {GrClose} from 'react-icons/gr'

function Gallery (){
    const [currentIndexImg, setCurrentIndexImg] = useState(-1)

    const toggleModal = () => {
        setCurrentIndexImg(-1);
    }

    return(
        <section>
            <Modal open={currentIndexImg!==-1}>
                <div className="flex justify-center items-center h-screen" onClick={toggleModal}>
                    <div className=""style={{minWidth: "80rem", minHeight: "50rem"}}>
                     {currentIndexImg!==-1&& <img className="object-cover w-full h-full" src={data[currentIndexImg].img} alt={data[currentIndexImg].key} />}
                     <GrClose className="flex" onClick={toggleModal}/>
                    </div>
                </div>
            </Modal>

            <h5 className="flex justify-center text-7xl">Галерея</h5>
            <div className="flex flex-wrap justify-center gap-2 container mx-auto mt-10">
                {data.map(({key,img},index)=>(
                    <div className="max-w-3xl" key={key} onClick={()=>setCurrentIndexImg(index)}>
                        <img src={img} alt={key} className="w-full h-full object-cover visible" />
                    </div>
                ))}
            </div>
        </section>

    )
}
export default Gallery