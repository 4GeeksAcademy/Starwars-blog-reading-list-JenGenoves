import React, { useState, useEffect } from 'react'; // <-- CORRECCIÓN: Se asegura 'useEffect' esté aquí
import { useParams, useNavigate } from 'react-router-dom';
import { getImgUrl, API_URL } from '../utils/helpers';
import { Heart } from 'lucide-react';
import useGlobalReducer from '../store/StoreProvider';
import { actionTypes } from '../store/index';

export function Details() {
  const { type, uid } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  // Generamos la URL de la imagen para la vista de detalle
  const imageUrl = getImgUrl(type, uid);

  // Lógica para verificar si es favorito
  const isFav = store.favorites.some(fav => fav.uid === uid && fav.type === type);

  useEffect(() => {
    // DEBUGGING: Muestra la URL en la consola del navegador
    console.log(`[DEBUG - Imagen Detalle] Intentando cargar ${type}/${uid}: ${imageUrl}`);

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${type}/${uid}`);
        if (!response.ok) {
          throw new Error(`Error al cargar los detalles: ${response.statusText}`);
        }
        const data = await response.json();
        setDetails(data.result.properties);
      } catch (e) {
        console.error("Error fetching details:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, uid, imageUrl]);

  const handleFavClick = () => {
    const item = { uid, name: details?.name || `Entidad ${uid}`, type };
    if (isFav) {
      dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: item });
    } else {
      dispatch({ type: actionTypes.ADD_FAVORITE, payload: item });
    }
  };

  // Función para renderizar los detalles
  const renderDetails = () => {
    if (!details) return null;

    // Campos a excluir o que son objetos anidados/URLs que no queremos mostrar directamente
    const excludedKeys = ['url', 'created', 'edited', 'homeworld', 'films', 'species', 'starships', 'vehicles', 'pilots', 'residents'];

    return (
      <dl className="row g-3 fs-6">
        {Object.entries(details).map(([key, value]) => {
          if (excludedKeys.includes(key) || value === 'n/a' || value === 'unknown') {
            return null; // Omitir campos no deseados
          }

          // Formatear la clave para que sea más legible (ej: 'hair_color' -> 'Color de Pelo')
          const formattedKey = key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <React.Fragment key={key}>
              <dt className="col-sm-4 text-start text-sm-end fw-semibold text-primary">{formattedKey}:</dt>
              <dd className="col-sm-8 text-start text-dark">{value}</dd>
            </React.Fragment>
          );
        })}
      </dl>
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center alert alert-danger">
        <h4 className="alert-heading">Error de Carga</h4>
        <p>No pudimos encontrar la información de esta entidad ({type} - {uid}). Puede que el ID no exista o la API esté inactiva.</p>
        <p className="small mt-3">Detalle del Error: {error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-3">Volver a la Home</button>
      </div>
    );
  }
  
  if (!details) {
    return (
        <div className="container py-5 text-center alert alert-warning">
            <h4 className="alert-heading">Entidad Desconocida</h4>
            <p>El objeto con ID {uid} no pudo ser cargado o no existe.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary mt-3">Volver a la Home</button>
        </div>
    );
  }


  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        {/* Columna de Imagen */}
        <div className="col-12 col-lg-5">
          <div className="bg-dark p-3 rounded-3 shadow-lg h-100 d-flex align-items-center justify-content-center">
            {!imgError ? (
              <img 
                src={imageUrl} 
                alt={details.name} 
                onError={(e) => {
                  console.error(`[DEBUG - Imagen Detalle] Error al cargar ${imageUrl}`, e);
                  setImgError(true);
                }}
                className="img-fluid rounded-2" 
                style={{ maxHeight: '600px', objectFit: 'contain' }}
              />
            ) : (
              <div className="p-5 text-center text-secondary">
                <span className="fs-1 mb-2">🚫</span>
                <p className="small mb-0">Imagen no disponible para {details.name}.</p>
                <p className="small mb-0">UID: {uid}</p>
              </div>
            )}
          </div>
        </div>

        {/* Columna de Detalles */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-lg border-0 p-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-3">
                <h1 className="card-title text-primary fw-bolder mb-0">{details.name}</h1>
                <button 
                  onClick={handleFavClick}
                  className={`btn btn-sm rounded-circle p-2 ms-3 ${isFav ? 'btn-warning text-dark' : 'btn-outline-secondary text-muted'}`}
                  title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                  style={{ backgroundColor: isFav ? '#fefce8' : 'transparent', borderColor: isFav ? '#fde047' : '#ced4da' }}
                >
                  <Heart size={24} fill={isFav ? "currentColor" : "none"} />
                </button>
              </div>
              
              <p className="lead text-dark mb-4 text-capitalize">
                Tipo de Entidad: {type === 'people' ? 'Personaje' : type}
              </p>

              {renderDetails()}

              <div className="mt-4 pt-3 border-top">
                <button onClick={() => navigate(-1)} className="btn btn-outline-secondary">
                  &larr; Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}