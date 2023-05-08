import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getNewById } from "../../api";
import { Loader } from "../../components";
import { isEmpty } from "lodash";

export default function AboutNew() {
  const { newId } = useParams();
  const [dataNew, setDataNew] = useState({});
  const [isLoadingNew, setIsLoadingNew] = useState(false);

  useEffect(() => {
    setIsLoadingNew(true);
    getNewById(newId)
      .then((res) => setDataNew(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingNew(false));

    return () => {
      setDataNew({});
      setIsLoadingNew(false);
    };
  }, [newId]);

  if (isLoadingNew) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ marginTop: 118 }}
      >
        <Loader />
      </div>
    );
  }

  if (isEmpty(dataNew)) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ marginTop: 118 }}
      >
        <h1>Not found this new with "{newId}"</h1>
      </div>
    );
  }

  return (
    <div className="relative" style={{ marginTop: "118px" }}>
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="text-white">
          <h1 className="flex justify-center items-center text-7xl relative">
            {dataNew.title}
          </h1>
        </div>
        <div className="absolute inset-0" style={{ zIndex: -1 }}>
          <img
            className="w-full h-full object-cover"
            style={{ maxHeight: 550 }}
            src={dataNew.preview}
            alt={dataNew.preview}
          />
          <div
            className="absolute inset-0 bg-black opacity-75"
            style={{ zIndex: 1 }}
          />
        </div>
      </section>
      <div className="flex items-center justify-center mt-5">
        <p className="max-w-3xl flex justify-center items-center text-4xl">
          {dataNew.description}
        </p>
      </div>
    </div>
  );
}
