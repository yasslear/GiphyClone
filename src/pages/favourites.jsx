import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Gif from "../components/gif";
import {GifState} from "../context/gif-context";
import { HiHeart, HiMagnifyingGlass } from "react-icons/hi2";

const Favourites = () => {
  const {gif, favourites} = GifState();
  const [favouriteGIFs, setFavouriteGIFs] = useState([]);

  const fetchFavouriteGIFs = async () => {
    if (favourites.length > 0) {
      const {data: gifs} = await gif.gifs(favourites);
      setFavouriteGIFs(gifs);
    }
  };

  useEffect(() => {
    fetchFavouriteGIFs();
  }, [favourites]);

  return (
    <div className="mt-2">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          My Favourites
        </h1>
        {favourites.length > 0 && (
          <p className="text-gray-400 mt-2">
            You have {favourites.length} favourite GIF{favourites.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <HiHeart className="h-24 w-24 text-gray-600 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              No favourites yet
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              You haven't added any GIFs to your favourites yet. Start exploring and click the heart icon on any GIF you love!
            </p>
            <div className="space-y-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
                Explore Trending GIFs
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {favouriteGIFs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;