import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";

import { BsTrashFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";

import urls from "../../config/urls";
import { authStorage } from "../../config/jotai";
import { getNews, deleteNewById } from "../../api";

function News() {
  const { token } = useAtomValue(authStorage);
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((data) => {
        setNews(data);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
    return () => {
      setNews([]);
      setLoading(false);
    };
  }, []);

  function deleteNew(newId) {
    setLoading(true);
    deleteNewById(newId)
      .then((res) => {
        setNews((prev) => prev.filter(({ id }) => id !== newId));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        alert("DELETED");
      });
  }

  console.log(token);

  return (
    <article id="News" className="p-10">
      <h5 className="flex justify-center text-7xl">Новини</h5>

      {isLoading && <p>Load news wait please...</p>}
      <div className="flex flex-wrap justify-center gap-8 container mx-auto mt-10">
        {!isLoading &&
          news &&
          news.map(({ id, title, description, preview }, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4 relative"
            >
              <div className="max-w-3xl">
                <img
                  src={preview}
                  alt={title}
                  style={{ minHeight: 250, maxHeight: 250 }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-3xl">{title}</p>
              <p>{description}</p>

              {token && (
                <div className="absolute top-0 right-0 flex gap-4 items-center">
                  <Link to={urls.news + "/" + id} target="_blank">
                    <AiTwotoneEdit size={26} />
                  </Link>
                  <button onClick={() => deleteNew(id)}>
                    <BsTrashFill size={24} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </article>
  );
}
export default News;
