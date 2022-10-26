import {data} from "./data"
function News(){
    return(
        <article id="News" className="p-10">
                <h5 className="flex justify-center text-7xl">Новини</h5>

                <div className="flex flex-wrap justify-center gap-y-8 container mx-auto mt-10">
                    {data.map(({key,title,richtext,img})=>(
                        <div key={key} className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/3">
                            <div className="max-w-3xl">
                                <img src={img} alt={title} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-3xl">{title}</p>
                            <p>{richtext}</p>
                        </div>
                    ))}
                </div>
        </article>

    );
}
export default News