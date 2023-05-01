import { useState, useEffect } from "react";

import { getNews } from "../../api";

function News() {
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
            </div>
          ))}
      </div>
    </article>
  );
}
export default News;
