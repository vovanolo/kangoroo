import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { BsTrashFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";

import { authStorage } from "../../../config/jotai";
import { getNews, deleteNewById } from "../../../api";
import { Modal, AddNews, EditNews } from "../../../components";
import Loader from "../../../components/Loader/Loader";
import { SIZE_TYPE } from "../../../components/Modal/Modal";

const activeModals = {
  create: "CREATE",
  update: "UPDATE",
};
export default function NewsTab() {
  const { token } = useAtomValue(authStorage);
  const [activeModal, setActiveModal] = useState(null);
  const [choosenNewId, setChoosenNewId] = useState(null);
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

  function onAddNew(dataNew) {
    setNews((prev) => [{ ...dataNew }, ...prev]);
  }

  function onUpdateNew(id, data) {
    setNews((prev) =>
      prev.map((news) =>
        news.id === id ? { ...data, id: news.id } : { ...news }
      )
    );
  }

  function openModal(modalName, id = null) {
    setActiveModal(modalName);
    setChoosenNewId(id);
  }

  function onClose() {
    setActiveModal(null);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="px-8 py-4 bg-blue-300 hover:bg-blue-400 text-2xl transition-colors"
        onClick={() => openModal(activeModals.create)}
      >
        Create New
      </button>
      <Modal
        open={activeModal === activeModals.create}
        onClose={onClose}
        size={SIZE_TYPE.small}
        isDimmer
      >
        <AddNews onAddNew={onAddNew} onCloseModals={onClose} />
      </Modal>
      <Modal
        open={activeModal === activeModals.update}
        onClose={onClose}
        size={SIZE_TYPE.small}
        isDimmer
      >
        <EditNews newId={choosenNewId} onUpdate={onUpdateNew} />
      </Modal>
      {isLoading && <Loader />}
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
                  style={{ minHeight: 250 }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-3xl">{title}</p>
              <p>{description}</p>

              {token && (
                <div className="absolute top-0 right-0 flex gap-4 items-center bg-gray-200 px-4 py-2">
                  <button onClick={() => openModal(activeModals.update, id)}>
                    <AiTwotoneEdit size={26} />
                  </button>
                  <button onClick={() => deleteNew(id)}>
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
