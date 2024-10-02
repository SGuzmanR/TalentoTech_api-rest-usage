import { useEffect, useState } from "react"

const ActivityFetch = () => {
  const [movies, setMovies] = useState([]);
  
  const fetchData = async () => {
    try {
      const res = await fetch('https://api.sampleapis.com/movies/horror');
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gradient">
      <div className="screen-max-width px-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-8 font-semibold text-4xl text-white">Galería de Peliculas de Terror</h1>

          <div className="my-3 grid grid-cols-4 gap-4 max-sm:grid-cols-2 max-[400px]:grid-cols-1 max-md:grid-cols-3">
                {movies.map((movie, index) => (
                  <div key={index} className="bg-white rounded-lg transition-all duration-200 overflow-hidden flex flex-col items-center justify-between w-full h-full">
                    <div className="flex h-full">  
                      <img src={movie.posterURL} alt={movie.title} className="hover:scale-105 rounded-lg transition-all duration-200 object-cover"></img>
                    </div>
                    <div>
                      <h5 className="py-3 px-3 text-center">{movie.title}</h5>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityFetch