// Definir el estado inicial de la aplicación 
// Cargar fav del LocalStorege al iniciar la aplicación

export const initialStore = () => {
    const localFavs = localStorage.getItem('sw_favorites');
    let parsedFavs = localFavs ? JSON.parse(localFavs) : [];

    return {
        people: [],
        vehicles: [],
        planets: [],
        favorites: parsedFavs, // Lista de objetos {uid, name, type}
        loading: true,
    };
};

// Acciones para evitar errores

export const actionTypes = {
    SET_DATA: "SET_DATA",
    ADD_FAVORITE: "ADD_FAVORITE",
    REMOVE_FAVORITE: "REMOVE_FAVORITE",
    SET_LOADING: "SET_LOADING"
};

// Cambios de estado con reducer

export default function storeReducer(state = initialStore(), action) {
    switch (action.type) {
        // Guardar datos que vienen de la API
        case actionTypes.SET_DATA:
            return {
                ...state,
                people: action.payload.people || state.people,
                vehicles: action.payload.vehicles || state.vehicles,
                planets: action.payload.planets || state.planets,
            };
        // Agregar favoritos
        case actionTypes.ADD_FAVORITE:
        // Evitar duplicados comprobando uid
        if (state.favorites.some(fav => fav.uid === action.payload.uid)) {
            return state;
        }
        return {
            ...state,
            favorites: [...state.favorites, action.payload]
        };
        // Eliminar favoritos
        case actionTypes.REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(fav => fav.uid !== action.payload.uid)
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            throw new Error(`Acción no soportada: ${action.type}`);
    };
};

