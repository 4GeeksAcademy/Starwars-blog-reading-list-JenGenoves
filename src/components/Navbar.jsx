import React, { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import useGlobalReducer from '../store/StoreProvider';
import { actionTypes } from '../store/index';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { store, dispatch } = useGlobalReducer();
  const [isOpen, setIsOpen] = useState(false);

  // Función para eliminar favorito usando dispatch
  const handleRemoveFavorite = (uid) => {
    dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: { uid } });
  };

  return (
    // bg-light, border-bottom, sticky-top, shadow-sm
    <nav className="bg-light border-bottom p-3 sticky-top shadow-sm z-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo / Brand */}
        <Link 
          to="/"
          className="d-flex align-items-center text-decoration-none text-dark"
        >
          {/* Usamos la clase CSS personalizada para el logo */}
          <div className="star-logo">
            STAR
          </div>
          <div className="fs-5 fw-bold ms-3 me-2 text-uppercase">WARS</div>
          <span className="text-muted small d-none d-sm-inline-block">DATABANK</span>
        </Link>

        {/* Dropdown de Favoritos */}
        <div className="position-relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-primary d-flex align-items-center" // btn-primary para azul
          >
            Favoritos
            <span className="badge bg-white text-primary rounded-pill ms-2">
              {store.favorites.length}
            </span>
          </button>

          {/* Menú Dropdown (Usamos la lógica de React para mostrar/ocultar) */}
          {isOpen && (
            <>
              {/* Overlay para cerrar al hacer click fuera */}
              <div 
                className="position-fixed top-0 start-0 w-100 h-100" 
                style={{ zIndex: 1040 }}
                onClick={() => setIsOpen(false)}
              ></div>
              
              <div 
                className="dropdown-menu show position-absolute end-0 mt-2 p-0 shadow-lg border rounded-3" 
                style={{ width: '280px', zIndex: 1045 }}
              >
                <ul className="list-unstyled mb-0 overflow-auto" style={{ maxHeight: '400px' }}>
                  {store.favorites.length === 0 ? (
                    <li className="p-3 text-muted text-center small fst-italic">
                      (vacío) No hay favoritos
                    </li>
                  ) : (
                    store.favorites.map((fav) => (
                      <li key={fav.uid} className="d-flex justify-content-between align-items-center p-2 border-bottom">
                        {/* El Link navega a la vista de detalle */}
                        <Link
                          to={`/details/${fav.type}/${fav.uid}`}
                          onClick={() => setIsOpen(false)}
                          className="text-primary text-decoration-none text-truncate me-2"
                        >
                          {fav.name} ({fav.type === 'people' ? 'P' : fav.type === 'planets' ? 'L' : 'V'})
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(fav.uid);
                          }}
                          className="btn btn-sm btn-link text-danger p-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}