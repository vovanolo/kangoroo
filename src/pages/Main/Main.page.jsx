import { Fragment } from "react";
import { Contacts, Gallery, News, Principles } from "../../components";
import banner from "../../images/banner.png";

function main() {
  return (
    <Fragment>
      <section id="Main" className="flex items-center min-h-screen relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-50">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-gray-800/75" />
        </div>

        <div className="container mx-auto text-white text-7xl font-bold">
          <h3>Кенгуру</h3>
          <h2>Центр дитячого розвитку</h2>
          <h2>Запрошуємо діток від 3 до 6 років</h2>
        </div>
      </section>

      <Principles />

      <News />
      <Gallery />
      <Contacts />
    </Fragment>
  );
}

export default main;
