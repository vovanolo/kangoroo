import styles from "./Principles.module.css";
import { data } from "./data";

function Principles() {
  return (
    <article id="Principles">
        <div className="flex flex-col items-center text-7xl p-10">
            <p>
               Чому батьки
            </p>
            <p>
               обирають Кенгуру ?
            </p>
        </div>

        <div className="flex flex-wrap gap-y-8 mt-10 container mx-auto">
            {data.map(({ key, source, label }) => (
              <div key={key} className="flex flex-col items-center w-full sm:w-1/2 lg:w-4/12">
                <div>
                  <img src={source} alt={label} className="w-24 h-24" />
                </div>
                <p className="mt-4 text-3xl">{label}</p>
              </div>
            ))}
        </div>
    </article>
  );
}

export default Principles;
