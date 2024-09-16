import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";


const contentType = ["gif", "sticker", "text"]

const GifPage = () => {

  const {type, slug} = useParams();
  const [singleGif, setSingleGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const {gif, favourites, addRemoveFavourites} = GifState();


  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    const fetchGif = async () => {
      const gifId = slug.split("-").pop();
      const {data} = await gif.gif(gifId);
      const {data: related} = await gif.related(gifId, {limit: 25});
      setSingleGif(data);
      setRelatedGifs(related);
    };

    fetchGif();
  }, [type, slug]);

  const handleCopyUrl = () => {
    const url = window.location.href; // Get the current URL
    navigator.clipboard.writeText(url) // Copy the URL to the clipboard
      .then(() => alert("URL copied to clipboard!"))
      .catch(err => console.error("Failed to copy URL:", err));
  };


  return <div className="grid grid-cols-4 my-10 gap-4">
    <div className="hidden sm:block">
        {singleGif?.user && (
          <>
            <div className="flex gap-1">
              <img 
              src={singleGif?.user?.avatar_url}
              alt={singleGif?.user.display_name}
              className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{singleGif?.user?.display_name}</div>
                <div>@{singleGif?.user?.username}</div>
              </div>
            </div>
            {singleGif?.user?.description && (
              <p className="py-4 whitespace-pre-line">
                {singleGif?.user?.description}
              </p>
            )}
            <hr></hr>
            {singleGif?.source && (
              <div>
                <span className="text-gray-200 font-bold">Source</span>
                <div className="flex items-center text-sm font-bold gap-1">
                  <HiOutlineExternalLink size={25}/>
                  <a href={singleGif.source} target="_blank" className="truncate">{singleGif.source}</a>
                </div>
              </div>
            )}
          </>
        )}
    </div>
    <div className="col-span-4 sm:col-span-3">
      <div className="flex gap-6">
        <div className="w-full sm:w-3/4">
          <div className="font-bold truncate mb-2">{singleGif.title}</div>
          <Gif gif={singleGif} />
          {/*mobile ui*/ }
          <div className="flex sm:hidden gap-1">     
          <div className="flex gap-1">
              <img 
              src={singleGif?.user?.avatar_url}
              alt={singleGif?.user?.display_name}
              className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{singleGif?.user?.display_name}</div>
                <div>@{singleGif?.user?.username}</div>
              </div>
            </div>
            <button 
            onClick={handleCopyUrl}
            className="ml-auto pl-3">
              <FaPaperPlane size={25}/>
            </button>
            <button onClick={()=>addRemoveFavourites(singleGif.id)} className="pl-3">
              <HiHeart className={`${favourites.includes(singleGif.id)? "text-red-500": "" }`} size={30}/>
            </button>
          </div>
        </div>
        <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button 
              onClick={handleCopyUrl}
              className="flex gap-5 items-center font-bold text-lg">
                <FaPaperPlane size={30}/> Share
            </button>
            <button 
              onClick={()=>addRemoveFavourites(singleGif.id)} 
              className="flex gap-5 items-center font-bold text-lg" >
                <HiHeart className={`${favourites.includes(singleGif.id)? "text-red-500": "" }`} size={30}/> Favourite
            </button>
        </div>
      </div>
     
    </div>
    
    <div className="mt-5 col-span-4">
        <span className="font-bold"> Related GIFS</span>
        <div className="columns-2 md:columns-3 gap-2 ">
          {relatedGifs.slice(1).map((gif) => (
            <Gif gif={gif} key={gif.id}/>
          ))}
        </div>
      </div>

  </div>;
};

export default GifPage;