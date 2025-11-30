import React, { useState, useEffect } from 'react'; // <-- CORRECCIÓN: Se agrega 'useEffect'
import { Heart } from 'lucide-react';
import useGlobalReducer from '../store/StoreProvider';
import { actionTypes } from '../store/index';
import { getImgUrl } from '../utils/helpers';
import { Link } from 'react-router-dom';

export function EntityCard({ item, type }) {
  const { store, dispatch } = useGlobalReducer();
  const isFav = store.favorites.some(fav => fav.uid === item.uid);
  const [imgError, setImgError] = useState(false);
  
  // Generamos la URL una sola vez
  const imageUrl = getImgUrl(type, item.uid);
  
  // DEBUGGING: Muestra la URL en la consola del navegador
  useEffect(() => {
      console.log(`[DEBUG - Imagen] Intentando cargar ${type}/${item.uid}: ${imageUrl}`);
  }, [imageUrl, type, item.uid]);


  const handleFavClick = () => {
    if (isFav) {
      dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: item });
    } else {
      dispatch({ type: actionTypes.ADD_FAVORITE, payload: { ...item, type } });
    }
  };

  return (
    <div className="card shadow-sm min-w-custom border border-light-subtle rounded-3 d-flex flex-column m-3 transition-shadow hover-shadow-md">
      {/* Imagen Header */}
      <div className="bg-secondary rounded-top custom-card-img overflow-hidden position-relative">
        {!imgError ? (
          <img 
            src={imageUrl} 
            alt={item.name}
            onError={(e) => {
              // DEBUGGING: Registra el error de carga de la imagen
              console.error(`[DEBUG - Imagen] Error al cargar ${imageUrl}`, e);
              setImgError(true);
            }}
            className="w-100 h-100 object-fit-cover" 
          />
        ) : (
          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark text-secondary p-4 text-center">
            <span className="fs-2 mb-2">❌</span>
            <span className="small">Imagen no disponible para {item.name}. (UID: {item.uid})</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column flex-grow-1">
        <h5 className="card-title fw-bold text-dark text-truncate">{item.name}</h5>
        <div className="text-secondary small mb-3 flex-grow-1">
          <p className="mb-1">ID: {item.uid}</p>
          <p className="mb-0 text-capitalize">Tipo: {type === 'people' ? 'Personaje' : type === 'planets' ? 'Planeta' : 'Vehículo'}</p>
        </div>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top border-light-subtle mt-auto">
          {/* Link para navegar a la vista de detalle */}
          <Link
            to={`/details/${type}/${item.uid}`}
            className="btn btn-outline-primary btn-sm fw-bold"
          >
            Leer más
          </Link>
          <button 
            onClick={handleFavClick}
            className={`btn btn-sm rounded-circle p-2 ${isFav ? 'btn-warning text-dark' : 'btn-outline-secondary text-muted'}`}
            title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
            style={{ 
              backgroundColor: isFav ? '#fefce8' : 'transparent', 
              borderColor: isFav ? '#fde047' : '#ced4da' 
            }}
          >
            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}