import { Link } from "react-router-dom"

const Gif = ({gif, hover=true}) => {
  return (
    <Link to={`/${gif.type}/${gif.slug}`}>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-3 sm:mb-4 break-inside-avoid">
            <img
                src={gif?.images?.fixed_width.webp}
                alt={gif?.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium truncate">{gif?.title}</p>
            </div>
        </div>
    </Link>
  );
}

export default Gif;