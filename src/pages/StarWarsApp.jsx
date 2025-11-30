import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../store/context";
import { fetchData } from "../store/actions";
import { Link } from "react-router-dom";

export default function StarWarsApp() {
  const { store, dispatch } = useContext(GlobalContext);
  // const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchData(dispatch, "people");
    fetchData(dispatch, "planets");
    fetchData(dispatch, "starships");
  }, []);

  if (store.loading) return <p>Cargando...</p>;
  if (store.error) return <p>Error: {store.error}</p>;

  return (
    <div>
      <h1>Star Wars</h1>

      <h2>Personajes</h2>
      <div className="d-flex gap-3 flex-wrap">
        {store.people.map((p) => (
          <Link
            key={p.uid}
            to={`/details/people/${p.uid}`}
            className="btn btn-outline-dark"
          >
            {p.name}
          </Link>
        ))}
      </div>

      <h2 className="mt-4">Planetas</h2>
      <div className="d-flex gap-3 flex-wrap">
        {store.planets.map((p) => (
          <Link
            key={p.uid}
            to={`/details/planets/${p.uid}`}
            className="btn btn-outline-dark"
          >
            {p.name}
          </Link>
        ))}
      </div>

      <h2 className="mt-4">Naves</h2>
      <div className="d-flex gap-3 flex-wrap">
        {store.starships.map((s) => (
          <Link
            key={s.uid}
            to={`/details/starships/${s.uid}`}
            className="btn btn-outline-dark"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
