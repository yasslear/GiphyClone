import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import GifSearch from "./gif-search";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, SetShowCategories] = useState(false);
  const { gif, filter, setFilter, favourites } = GifState();

  const fetchGifCategories = async () => {
    try {
      const { data } = await gif.categories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchGifCategories();
  }, [gif]);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-end mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="Logo" className="w-8 " />
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight cursor-pointer">Giphy</h1>
        </Link>

        {categories?.slice(0, 5)?.map((category) => (
          <Link key={category.name} to={`/${category.name_encoded}`} className="px-4 py-2 hover:gradient border-b-4 hidden lg:block">
            {category.name}
          </Link>
        ))}

        <button onClick={() => SetShowCategories(!showCategories)}>
          <HiEllipsisVertical size={35} className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`} />
        </button>

        {favourites.length > 0 && (
          <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favourites">Favourites</Link>
          </div>
        )}

        <button onClick={() => SetShowCategories(!showCategories)}> 
          <HiMiniBars3BottomRight size={30} className="text-sky-400 block lg:hidden" />
        </button>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link to={`/${category.name_encoded}`} key={category.name} onClick={() => SetShowCategories(!showCategories)} className="font-bold hover:text-gray-400">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <GifSearch />
    </nav>
  );
};

export default Header;
