import React, { useEffect } from 'react';
import useGlobalReducer from '../store/StoreProvider';
import { actionTypes } from '../store/index';
import { API_URL } from '../utils/helpers';
import { HorizontalSection } from '../components/HorizontalSection';

export function Home() {
  const { store, dispatch } = useGlobalReducer();
  // ... (La lógica de useEffect para fetch data sigue igual)

  useEffect(() => {
    const loadData = async () => {
      // Si ya tenemos datos, no hacemos fetch de nuevo
      if (store.people.length > 0) {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        return;
      }
      
      dispatch({ type: actionTypes.SET_LOADING, payload: true });

      try {
        // Fetch de las tres categorías en paralelo
        const [peopleRes, vehiclesRes, planetsRes] = await Promise.all([
          fetch(`${API_URL}/people?page=1&limit=20`),
          fetch(`${API_URL}/vehicles?page=1&limit=10`),
          fetch(`${API_URL}/planets?page=1&limit=10`)
        ]);

        const peopleData = await peopleRes.json();
        const vehiclesData = await vehiclesRes.json();
        const planetsData = await planetsRes.json();

        // Despachamos los datos al Reducer
        dispatch({
            type: actionTypes.SET_DATA,
            payload: { 
                people: peopleData.results,
                vehicles: vehiclesData.results,
                planets: planetsData.results,
            }
        });
      } catch (error) {
        console.error("Error cargando datos de la fuerza:", error);
      } finally {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    loadData();
  }, [dispatch, store.people.length]);

  if (store.loading && store.people.length === 0) return (
     // Ajuste de clases para el spinner de carga
     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted small">Cargando datos del Banco Galáctico...</p>
        </div>
     </div>
  );

  return (
    // Sin clases de animación de Tailwind, solo un contenedor div
    <div> 
      <HorizontalSection 
        title="Personajes de la Galaxia" 
        items={store.people} 
        type="people" 
      />
      <HorizontalSection 
        title="Naves y Vehículos" 
        items={store.vehicles} 
        type="vehicles" 
      />
      <HorizontalSection 
        title="Planetas Conocidos" 
        items={store.planets} 
        type="planets" 
      />
    </div>
  );
}