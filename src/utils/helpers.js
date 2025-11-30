// Exportar las URLs de las APIS que usaré

export const API_URL = "https://www.swapi.tech/api";
export const IMAGE_URL_BASE = "https://starwars-visualguide.com/assets/img";

// Generar la URL de la imagen basada en el tipo de entidad y el identificador único

export const getImgUrl = (type, uid) => {
    let category = '';
    switch(type) {
        case 'people':
            category = 'characters';
            break;
        case 'planets':
            category = ' planets';
            break;
        case 'vehicles':
            category = 'vehicles';
            break;
        default:
            category = 'characters';
    }
    return `${IMAGE_URL_BASE}/${category}/${uid}.jpg`
}