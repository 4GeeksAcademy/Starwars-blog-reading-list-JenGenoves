export const fetchData = async (dispatch, type) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });

    const res = await fetch(`https://swapi.tech/api/${type}`);
    const data = await res.json();

    dispatch({
      type: "SET_DATA",
      payload: { key: type, data: data.results },
    });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};
