// Exportar las URLs de las APIS que usaré

// export const API_URL = "https://www.swapi.tech/api";
// export const IMAGE_URL_BASE = "https://starwars-visualguide.com/assets/img";

// Generar la URL de la imagen basada en el tipo de entidad y el identificador único

// export const getImgUrl = (type, uid) => {
//     let category = '';
//     switch(type) {
//         case 'people':
//             category = 'characters';
//             break;
//         case 'planets':
//             category = ' planets';
//             break;
//         case 'vehicles':
//             category = 'vehicles';
//             break;
//         default:
//             category = 'characters';
//     }
//     return `${IMAGE_URL_BASE}/${category}/${uid}.jpg`
// }

export const API_URL = 'https://www.swapi.tech/api';

// 2. Función para generar la URL de la imagen de una entidad (corregida previamente)
export const getImgUrl = (type, uid) => {
  // 'people' debe mapearse a 'characters' en la URL del visual guide.
  const normalizedType = type === 'people' ? 'characters' : type;

  // La URL base del visual guide para las imágenes.
  const baseUrl = 'https://starwars-visualguide.com/assets/img/';

  // Construcción de la URL: Evitamos espacios en blanco indeseados.
  const imageUrl = `${baseUrl}${normalizedType}/${uid}.jpg`;

  return imageUrl;
};