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
    <div
      className="flex items-center justify-center relative"
      style={{ minHeight: "calc(100vh - 118px)", marginTop: "118px" }}
    >
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <img
          className="w-full h-full object-cover"
          src={dataNew.preview}
          alt={dataNew.preview}
        />
        <div
          className="absolute inset-0 bg-black opacity-75"
          style={{ zIndex: 1 }}
        />
      </div>
      <div className="text-white">
        <h1 className="text-7xl">{dataNew.title}</h1>
        <p className="text-4xl">{dataNew.description}</p>
      </div>
    </div>
  );
}
