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


    return (<div>
        <img 
            src="/banner.gif"
            alt="banner"
            className="mt-2 rounded w-full"
        />
    <FilterGif />
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-3">
        {gifs.map((gif) => {
           return <Gif gif={gif} key={gif.id}/>
        })}
    </div>
    </div>
    );
  };
  
  export default Home;