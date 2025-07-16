import { useEffect } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FilterGif from "../components/gif-filter";

const Home = () => {

    const {gif, gifs, setGifs, filter} = GifState();

    const fetchTrendingGifs = async () => {
        try {
            const {data} = await gif.trending({
                limit:30,
                type:filter,
                rating:"g",
            })
            setGifs(data);
        } catch(err) {
            console.log(err)
        };
    };

    useEffect( () => {
        fetchTrendingGifs();
    }, [filter]);


    return (
      <div>
        <div className="relative mb-6">
          <img 
              src="/banner.gif"
              alt="banner"
              className="w-full rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
        </div>
        
        <FilterGif />
        
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {gifs.map((gif) => {
               return <Gif gif={gif} key={gif.id}/>
            })}
        </div>
      </div>
    );
  };
  
  export default Home;