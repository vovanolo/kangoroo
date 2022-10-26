import { data } from "./data"

function Gallery (){
    return(
        <section>
            <h5 className="flex justify-center text-7xl">Галерея</h5>
            <div className="flex flex-wrap justify-center gap-2 container mx-auto mt-10">
                {data.map(({key,img})=>(
                    <div className="max-w-3xl">
                        <img src={img} alt={key} className="w-full h-full object-cover visible hover:invisible opacity-100 scale-100" />
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Gallery