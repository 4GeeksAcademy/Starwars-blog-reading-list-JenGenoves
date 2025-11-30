// Exportar las URLs de las APIS que usaré

export const API_URL = "https://www.swapi.tech/api";
export const IMAGE_URL_BASE = "https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img";
// export const IMAGE_URL_BASE = "/assets/img/starwars";
export const PLACEHOLDER_PLANET = "/placeholders/planet.jpg";
export const PLACEHOLDER_VEHICLE = "/placeholders/vehicle.jpg";
export const PLACEHOLDER_DEFAULT = "/placeholders/default.jpg"

// Generar la URL de la imagen basada en el tipo de entidad y el identificador único

// export const getImgUrl = (type, uid) => {
//     let category = '';
//     switch(type) {
//         case 'people':
//             category = 'characters';
//             break;
//         case 'planets':
//             category = 'planets';
//             break;
//         case 'vehicles':
//             category = 'vehicles';
//             break;
//         default:
//             category = 'characters';
//     }
//     return `${IMAGE_URL_BASE}/${category}/${uid}.jpg`
// }

export const getImgUrl = (type, uid) => {
  // Nota: el repositorio de GitHub solo tiene "people"
  if (type === "people") {
    return `${IMAGE_URL_BASE}/people/${uid}.jpg`;
  }

  // Para planets y vehicles usamos placeholders locales
  if (type === "planets") return PLACEHOLDER_PLANET;
  if (type === "vehicles") return PLACEHOLDER_VEHICLE;

  return PLACEHOLDER_DEFAULT;
};
