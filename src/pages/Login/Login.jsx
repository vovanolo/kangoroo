import * as Yup from "yup";
import { useSetAtom } from "jotai";
import { useFormik } from "formik";

import bgBack from "../../images/gorila-ass.mp4";
import { authStorage } from "../../config/jotai";
import { logIn } from "../../api";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Повинно бути валідним!")
    .required("Обов'язкове для заповнення!"),
  password: Yup.string()
    .trim()
    .min(8, "Повинубути не манше 8 символів!")
    .required(),
});

export default function Login() {
  const setAuthAtom = useSetAtom(authStorage);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await logIn(values);
        setAuthAtom({
          user: { email: data.email, uuid: data.uid },
          token: data.accessToken,
        });
      } catch (err) {
        alert(err.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen text-2xl text-white relative">
      <div className="absolute" style={{ inset: 0, zIndex: -1 }}>
        <video className="w-full h-full" src={bgBack} loop autoPlay muted />
      </div>
      <form
        className="flex flex-col gap-12 w-96"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="email">
          <input
            className="w-full bg-blue-300 focus:bg-blue-400 p-4"
            name="email"
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="email"
          />
          <span className="text-red-300">{formik.errors.email}</span>
        </label>
        <label htmlFor="password">
          <input
            className="w-full bg-blue-300 focus:bg-blue-400 p-4"
            name="password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="password"
          />
          <span className="text-red-300">{formik.errors.password}</span>
        </label>

        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}
