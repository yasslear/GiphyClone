import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import { useParams } from "react-router-dom";
import FilterGif from "../components/gif-filter";
import Gif from "../components/gif";

const Search = () => {

  const [searchResults, setSearchResults] = useState([]);
  const {gif, filter} = GifState();
  const {query} = useParams();

  const fetchSearchResults = async () => {
    try {
      const {data} = await gif.search(query, {
        sort:'relevant',
        lang:'en',
        type:filter,
        limit:30
      });
      setSearchResults(data);

    } catch(err) {
      console.log(err)
    };

  };


  useEffect(() => {
    fetchSearchResults()
  }, [query, filter]);


  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif/>
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No {filter} artwork found for {query}. Try searching with different keywords instead?
        </span>
      )}
    </div>
  );
};

export default Search;