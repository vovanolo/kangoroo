import { useEffect, Suspense } from "react";
import { useSetAtom } from "jotai";
import { RouterProvider } from "react-router-dom";

import { getUser } from "./api";
import routerOConfig from "./config/routes";
import { authStorage } from "./config/jotai";

function App() {
  const setAuthAtom = useSetAtom(authStorage);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      console.log(user);
      if (typeof user !== "string") {
        setAuthAtom({
          ...user,
        });
      }
    })();
  }, [setAuthAtom]);

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <RouterProvider router={routerOConfig} />
    </Suspense>
  );
}

export default App;
