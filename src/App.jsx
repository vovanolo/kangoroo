import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import routerOConfig from "./config/routes";

function App() {
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <RouterProvider router={routerOConfig} />
    </Suspense>
  );
}

export default App;
