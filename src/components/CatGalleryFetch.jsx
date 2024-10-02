import { useEffect, useState } from "react";

const CatGalleryFetch = () => {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (loadMore = false) => {
    try {
      const res = await fetch(`https://api.thecatapi.com/v1/images/search?limilimit=10&page=${page}&order=DESC`);
      const data = await res.json();

      if (loadMore) {
        setCats(prevCats => [...prevCats, ...data]);
      } else {
        setCats(data);
      }
    } catch (error) {
      console.log("Error", error);
      setError('Error en la solicitud');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreCats = () => {
    setPage(prevPage => prevPage + 1);
    fetchData(true);
  };

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    )
  };

  return (
    <div className='container pt-4 overflow-hidden'>
      <h2 className='text-center text-white mb-4'>Galería de Gatitos con Fetch</h2>
      <div className='row overflow-auto vh-80 scrollable-container'>
        {cats.map((cat, index) => (
          <div className='col-md-4 mb-4' key={index}>
            <div className='card h-100 d-flex flex-column'>
              <img src={cat.url} className='fixed-img' alt="Cat" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-3">
        <button className="btn btn-primary" onClick={loadMoreCats}>
          Cargar más gatos
        </button>
      </div>
    </div>
  )
}

export default CatGalleryFetch