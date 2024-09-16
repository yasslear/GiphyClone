
import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState, useEffect } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useState([]);

  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  useEffect(() => {
    const favourite = JSON.parse(localStorage.getItem("favouriteGIFs")) || [];
    setFavourites(favourite);
  }, []);

  const addRemoveFavourites = (id) => {
    console.log(id);
    if (favourites.includes(id)) {
      
      const updatedFavourites = favourites.filter((itemId) => itemId !== id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } else {
      
      const updatedFavourites = [...favourites];
      updatedFavourites.push(id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    }
  };


  return (
    <GifContext.Provider value={{ gif, gifs, setGifs, filter, setFilter, favourites, addRemoveFavourites }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};
export default GifProvider;
