import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";

import { BsTrashFill } from "react-icons/bs";

import { authStorage } from "../../../config/jotai";
import Loader from "../../../components/Loader/Loader";
import { getGallery, deleteImageFromGallery, uploadImage } from "../../../api";

export default function GalleryTab() {
  const { token } = useAtomValue(authStorage);
  const uploadRef = useRef(null);
  const [file, setFile] = useState(null);
  const [gallaries, setGallaries] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGallery()
      .then((data) => {
        setGallaries(data);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
    return () => {
      setGallaries([]);
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (file) {
      (async () => {
        await uploadImage(file, (convertedURL) =>
          setGallaries((prev) => [convertedURL, ...prev])
        );
      })();
    }
  }, [file]);

  function deleteImage(imageId) {
    setLoading(true);
    deleteImageFromGallery(imageId, (imageId) =>
      setGallaries((prev) => prev.filter((url) => url !== imageId))
    )
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        alert("DELETED");
      });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        ref={uploadRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="px-8 py-4 bg-blue-300 hover:bg-blue-400 text-2xl transition-colors"
        onClick={() => uploadRef.current.click()}
      >
        Upload A New Image
      </button>
      {isLoading && <Loader />}
      <div className="flex flex-wrap justify-center gap-8 container mx-auto mt-10">
        {!isLoading &&
          gallaries &&
          gallaries.map((url, index) => (
            <div key={index} className="relative">
              <div key={index} className="max-w-3xl">
                <img
                  style={{ maxHeight: 300, maxWidth: 400 }}
                  src={url}
                  alt={url}
                  className="w-full h-full object-cover visible"
                />
              </div>

              {token && (
                <div className="absolute top-0 right-0 flex gap-4 items-center bg-gray-200 px-4 py-2">
                  <button onClick={() => deleteImage(url)}>
                    <BsTrashFill size={24} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
