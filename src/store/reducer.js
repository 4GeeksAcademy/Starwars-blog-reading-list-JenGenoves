export const initialState = {
  people: [],
  planets: [],
  starships: [],
  loading: true,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

