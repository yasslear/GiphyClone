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
      <div className="relative flex gap-2 sm:gap-4 justify-between items-end mb-4 sm:mb-6">
        <Link to="/" className="flex gap-2 items-center">
          <img src="/logo.svg" alt="Logo" className="w-6 sm:w-8" />
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Giphy
          </h1>
        </Link>

        {/* Desktop Categories */}
        <div className="hidden lg:flex gap-1">
          {categories?.slice(0, 5)?.map((category) => (
            <Link 
              key={category.name} 
              to={`/${category.name_encoded}`} 
              className="px-3 py-2 text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors duration-200 border-b-2 border-transparent hover:border-purple-500"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <button 
          onClick={() => SetShowCategories(!showCategories)}
          className="hidden lg:block"
        >
          <HiEllipsisVertical 
            size={28} 
            className={`p-1 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${showCategories ? "bg-gray-800 text-purple-400" : ""}`} 
          />
        </button>

        {/* Favourites Button - Always Visible */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg">
          <Link to="/favourites" className="font-medium text-sm">
            Favourites {favourites.length > 0 && `(${favourites.length})`}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => SetShowCategories(!showCategories)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        > 
          <HiMiniBars3BottomRight size={24} className="text-purple-400" />
        </button>

        {/* Mobile/Tablet Categories Dropdown */}
        {showCategories && (
          <div className="absolute right-0 top-14 sm:top-16 w-full sm:w-96 lg:w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl z-20 border border-gray-700 backdrop-blur-sm">
            <div className="p-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Categories
              </span>
              <hr className="border-gray-600 my-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {categories.map((category) => (
                  <Link 
                    to={`/${category.name_encoded}`} 
                    key={category.name} 
                    onClick={() => SetShowCategories(false)} 
                    className="font-medium text-sm p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-center"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <GifSearch />
    </nav>
  );
};

export default Header;
