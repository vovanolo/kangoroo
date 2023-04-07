import { useState, useEffect } from "react";
import { Modal } from "../";
import { GrClose } from "react-icons/gr";
import { getGallery } from "../../api";

function Gallery() {
  const [previews, setPreviews] = useState([]);
  const [currentIndexImg, setCurrentIndexImg] = useState(-1);

  const toggleModal = () => {
    setCurrentIndexImg(-1);
  };

  useEffect(() => {
    (async () => {
      const images = await getGallery();
      setPreviews(images);
    })();
  }, []);

  return (
    <section id="Gallery">
      <Modal open={currentIndexImg !== -1}>
        <div
          className="relative flex justify-center items-center h-screen"
          onClick={toggleModal}
        >
          <div>
            {currentIndexImg !== -1 && (
              <img
                style={{ maxWidth: "80vw", maxHeight: "80vh" }}
                className="object-cover w-full h-full"
                src={previews[currentIndexImg]}
                alt={previews[currentIndexImg]}
              />
            )}
            <GrClose
              color="#ffff"
              size={40}
              className="absolute top-10 right-10"
              onClick={toggleModal}
            />
          </div>
        </div>
      </Modal>

      <h5 className="flex justify-center text-7xl">Галерея</h5>
      <div className="flex flex-wrap justify-evenly gap-2 container mx-auto mt-10">
        {previews.length !== 0 &&
          previews.map((url, index) => (
            <div
              key={index}
              className="max-w-3xl"
              onClick={() => setCurrentIndexImg(index)}
            >
              <img
                style={{ maxHeight: 300, maxWidth: 400 }}
                src={url}
                alt={url}
                className="w-full h-full object-cover visible"
              />
            </div>
          ))}
      </div>
    </section>
  );
}
export default Gallery;
