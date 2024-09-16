import {useEffect, useState} from "react";
import Gif from "../components/gif";
import {GifState} from "../context/gif-context";

const Favourites = () => {
  const {gif, favourites} = GifState();
  const [favouriteGIFs, setFavouriteGIFs] = useState([]);

  const fetchFavouriteGIFs = async () => {
    const {data: gifs} = await gif.gifs(favourites);
    setFavouriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavouriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text font-extrabold text-xl ">My favourites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favouriteGIFs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;