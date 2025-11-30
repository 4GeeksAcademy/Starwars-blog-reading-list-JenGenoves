import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Details() {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`https://swapi.tech/api/${type}/${uid}`);
      const data = await res.json();
      setItem(data.result);
    };
    load();
  }, [type, uid]);

  if (!item) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{item.properties.name}</h1>
      <pre>{JSON.stringify(item.properties, null, 2)}</pre>
    </div>
  );
}
