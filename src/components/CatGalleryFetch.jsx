import { useEffect } from "react";
import { useState } from "react"

const CatGalleryFetch = () => {
  const [cat, setCat] = useState([]);
  const [error, setError] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
      const data = await res.json();
      setCat(data);
    } catch (error) {
      console.log("Error", error);
      setError('Error en la solicitud');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">Galeria de Gatitos con Fetch</h2>

      <div className="row overflow-auto vh-80" style={{ maxHeight: '80vh', overflowY: 'scroll'}}>
        <div className="row">
          {cat.map((item, index) => (
            <div key={index} className="co-md-4 mb-4">
              <div className="card h-100 d-flex flex-column">
                <img src={item.url} className="card-img-top img-fluid object-fit-cover" alt="Cat" />

                <div className="card-body">
                  <h5 className="card-title">Gatito {index + 1}</h5>
                  <p className="card-text">¡Un lindo gatito de nuestra galeria!</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CatGalleryFetch