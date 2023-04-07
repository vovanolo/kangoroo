import { useState } from "react";
import { useFormik } from "formik";
import { createNew } from "../../api";

export default function NewsPage() {
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => await createNew(values, file),
  });

  return (
    <div className="flex items-center justify-center h-screen text-2xl text-white relative">
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
        </label>

        <button className="bg-blue-400" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
