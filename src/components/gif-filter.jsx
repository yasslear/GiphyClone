import {HiMiniArrowTrendingUp} from "react-icons/hi2";
import {GifState} from "../context/gif-context";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    icon: "🎬"
  },
  {
    title: "Stickers",
    value: "stickers", 
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    icon: "🎯"
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500", 
    icon: "📝"
  },
];

const FilterGif = () => {
  const {filter, setFilter} = GifState();

  return (
    <div className="flex my-6 gap-3 justify-center">
      <div className="flex w-full max-w-md rounded-full bg-gray-800/50 backdrop-blur-sm p-1 shadow-lg border border-gray-700">
        {filters.map((f) => {
          return (
            <button
              onClick={() => setFilter(f.value)}
              className={`${
                filter === f.value 
                  ? `${f.background} text-white shadow-lg scale-105` 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              } font-semibold py-3 px-4 flex-1 text-center rounded-full cursor-pointer transition-all duration-300 text-sm flex items-center justify-center gap-2`}
              key={f.title}
            >
              <span className="text-base">{f.icon}</span>
              <span>{f.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;