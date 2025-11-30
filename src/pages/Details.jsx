import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getImgUrl, API_URL } from '../utils/helpers';

export function Details() {
  const { type, uid } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  // ... (La lógica de fetch sigue igual)
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setImgError(false);
      try {
        const res = await fetch(`${API_URL}/${type}/${uid}`);
        if (!res.ok) throw new Error('Fallo al cargar la entidad');
        const json = await res.json();
        setDetails(json.result.properties);
      } catch (err) {
        console.error("Error fetching details", err);
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [type, uid]);


  if (loading) return (
    <div className="d-flex justify-content-center align-items-center h-100" style={{ minHeight: '300px' }}>
      <div className="spinner-border text-dark me-2" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <span className="text-secondary fs-5">Consultando archivos...</span>
    </div>
  );
  
  if (!details) return (
    <div className="text-center py-5">
      <h1 className="fs-2 fw-bold text-danger">Error en el Holocrón</h1>
      <p className="text-muted mt-2">No se pudo cargar la información de {type} con ID {uid}.</p>
      <button 
        onClick={() => navigate('/')} 
        className="btn btn-link text-primary mt-3 d-flex align-items-center justify-content-center mx-auto"
      >
        <ArrowLeft size={20} className="me-1" /> Volver
      </button>
    </div>
  );


  return (
    <div className="container py-4">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-link text-secondary d-flex align-items-center mb-4 p-0"
      >
        <ArrowLeft size={20} className="me-1" /> Volver al Banco de Datos
      </button>

      <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
        <div className="d-flex flex-column flex-md-row">
          {/* Imagen Grande */}
          <div className="w-100 w-md-50 bg-dark position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
             {!imgError ? (
                <img 
                  src={getImgUrl(type, uid)} 
                  alt={details.name} 
                  onError={() => setImgError(true)}
                  className="w-100 h-100 object-fit-contain p-3" // object-fit-contain para no cortar
                />
             ) : (
                <div className="text-white text-center p-4">
                  <div className="fs-1 mb-3">🌌</div>
                  <p>Imagen holográfica corrupta</p>
                </div>
             )}
          </div>

          {/* Información */}
          <div className="w-100 w-md-50 p-4 p-md-5 text-center text-md-start">
            <h1 className="fs-3 fw-bold text-dark mb-4">{details.name}</h1>
            <p className="text-muted mb-4 mx-auto mx-md-0" style={{ maxWidth: '400px' }}>
               Información técnica detallada de la entidad. Usamos los datos crudos de la SWAPI para informar.
            </p>

            <div className="row g-3 small border-top pt-4">
              {/* Renderizado dinámico de propiedades según el tipo */}
              {type === 'people' && (
                <>
                  <div className="col-6"><strong>Nacimiento:</strong> <br/><span className="text-secondary">{details.birth_year}</span></div>
                  <div className="col-6"><strong>Género:</strong> <br/><span className="text-secondary">{details.gender}</span></div>
                  <div className="col-6"><strong>Altura:</strong> <br/><span className="text-secondary">{details.height} cm</span></div>
                  <div className="col-6"><strong>Color Piel:</strong> <br/><span className="text-secondary">{details.skin_color}</span></div>
                  <div className="col-6"><strong>Color Ojos:</strong> <br/><span className="text-secondary">{details.eye_color}</span></div>
                </>
              )}
              {type === 'planets' && (
                <>
                  <div className="col-6"><strong>Clima:</strong> <br/><span className="text-secondary">{details.climate}</span></div>
                  <div className="col-6"><strong>Población:</strong> <br/><span className="text-secondary">{details.population}</span></div>
                  <div className="col-6"><strong>Terreno:</strong> <br/><span className="text-secondary">{details.terrain}</span></div>
                  <div className="col-6"><strong>Diámetro:</strong> <br/><span className="text-secondary">{details.diameter} km</span></div>
                  <div className="col-6"><strong>Gravedad:</strong> <br/><span className="text-secondary">{details.gravity}</span></div>
                </>
              )}
               {type === 'vehicles' && (
                <>
                  <div className="col-6"><strong>Modelo:</strong> <br/><span className="text-secondary">{details.model}</span></div>
                  <div className="col-6"><strong>Fabricante:</strong> <br/><span className="text-secondary">{details.manufacturer}</span></div>
                  <div className="col-6"><strong>Clase:</strong> <br/><span className="text-secondary">{details.vehicle_class}</span></div>
                  <div className="col-6"><strong>Pasajeros:</strong> <br/><span className="text-secondary">{details.passengers}</span></div>
                  <div className="col-6"><strong>Costo:</strong> <br/><span className="text-secondary">{details.cost_in_credits} créditos</span></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}