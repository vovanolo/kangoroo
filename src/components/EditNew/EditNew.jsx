import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useFormik } from "formik";

import { authStorage } from "../../config/jotai";
import { getNewById, updateNewById } from "../../api";

export default function EditNew({ newId, onUpdate }) {
  const { token } = useAtomValue(authStorage);

  const [isData, setIsData] = useState(false);
  const [isFetchingNewByid, setIsFetchingNewByid] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      setIsUpdating(true);
      updateNewById(newId, values, file, (newId, values) =>
        onUpdate(newId, { ...values, preview })
      )
        .then((res) => res)
        .catch((err) => err)
        .finally(() => setIsUpdating(false));
    },
  });

  useEffect(() => {
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }, [file]);

  useEffect(() => {
    setIsFetchingNewByid(true);
    getNewById(newId)
      .then((res) => {
        console.log(res);
        setIsData(res ? true : false);
        const { title, description, preview } = res;
        formik.setFieldValue("title", title);
        formik.setFieldValue("description", description);
        setPreview(preview);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsFetchingNewByid(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newId]);

  if (!token) {
    return <p>"MustLogin"</p>;
  }

  if (isUpdating || isFetchingNewByid) {
    return <p>"Loading..."</p>;
  }

  if (!isData) {
    return <p>"Data with this id not found"</p>;
  }

  return (
    <div>
      EditNew {newId}
      <div className="flex items-center justify-center text-2xl text-white relative pb-4">
        <form
          className="flex flex-col gap-12 w-96"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="title">
            <input
              className="w-full bg-blue-300 focus:bg-blue-400 p-4"
              name="title"
              id="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Create title"
            />
          </label>
          <label htmlFor="description">
            <textarea
              className="w-full bg-blue-300 focus:bg-blue-400 p-4"
              name="description"
              id="description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Create description"
            ></textarea>
          </label>
          <label htmlFor="preview">
            <input
              name="preview"
              id="preview"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              placeholder="Create description"
            />

            {preview && <img src={preview} alt={preview} />}
          </label>

          <button
            className="bg-blue-400"
            type="submit"
            disabled={isUpdating || isFetchingNewByid}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
