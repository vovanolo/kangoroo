import { useState } from "react";
import { useFormik } from "formik";
import { createNew } from "../../api";
import Loader from "../Loader/Loader";

export default function AddNews({ onAddNew, onCloseModals }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      createNew(values, file, (dataNew) => onAddNew(dataNew))
        .then((res) => {
          onCloseModals();
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <form
      className="flex flex-col gap-8 w-full px-20 py-4"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-4xl text-white">Create New</h2>
      <label htmlFor="title">
        <input
          className="w-full bg-blue-300 focus:bg-blue-400 p-4 italic placeholder:text-slate-500 text-2xl font-bold"
          name="title"
          id="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Create title"
          disabled={isLoading}
        />
      </label>
      <label htmlFor="description">
        <textarea
          className="w-full bg-blue-300 focus:bg-blue-400 p-4 italic placeholder:text-slate-500 text-2xl font-bold"
          name="description"
          id="description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Create description"
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </label>

      <button className="bg-blue-400 p-4" type="submit" disabled={isLoading}>
        {isLoading ? <Loader size="small" /> : "Create"}
      </button>
    </form>
  );
}
