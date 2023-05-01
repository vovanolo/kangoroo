import React, { Suspense, lazy, useState } from "react";
import Loader from "../../components/Loader/Loader";

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
  const [activeTab, setActiveTab] = useState(0);
  const TabComp = tabs[activeTab].element;

  function switchTab(index) {
    setActiveTab(index);
  }

  return (
    <Suspense fallback={<Loader />}>
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
      </div>

      <div className="flex items-center justify-center p-20">{<TabComp />}</div>
    </Suspense>
  );
}
