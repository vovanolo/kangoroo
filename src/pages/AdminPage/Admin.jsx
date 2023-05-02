import React, { Fragment, Suspense, lazy, useState } from "react";
import { useSetAtom } from "jotai";
import { ImExit } from "react-icons/im";

import Loader from "../../components/Loader/Loader";
import { authStorage, initialAtom } from "../../config/jotai";

const tabs = [
  {
    key: "Tab1",
    label: "Новини",
    element: lazy(() => import("./Tabs/NewsTab")),
  },
  {
    key: "Tab2",
    label: "Галерея",
    element: lazy(() => import("./Tabs/GalleryTab")),
  },
];

export default function Admin() {
  const setAuthAtom = useSetAtom(authStorage);
  const [activeTab, setActiveTab] = useState(0);
  const TabComp = tabs[activeTab].element;

  function exitUser() {
    setAuthAtom(initialAtom);
  }

  function switchTab(index) {
    setActiveTab(index);
  }

  return (
    <Fragment>
      <div className="flex items-center justify-center text-3xl p-4">
        {tabs.map(({ key, label }, index) => (
          <button
            key={key}
            className={`${
              activeTab === index ? "bg-blue-400 " : "bg-blue-300"
            } px-8 py-4 border-r-2 border-x-red-500 last:border-white transition-colors`}
            onClick={() => switchTab(index)}
          >
            {label}
          </button>
        ))}
        <button className="absolute right-8" onClick={exitUser}>
          <ImExit size={25} />
        </button>
      </div>

      <Suspense fallback={<Loader />}>
        <div className="flex items-center justify-center p-20">
          {<TabComp />}
        </div>
      </Suspense>
    </Fragment>
  );
}
