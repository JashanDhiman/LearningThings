export const INITIAL_STATE = {
  loading: false,
  post: {},
  error: false,
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        post: {},
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        post: action.payload,
        error: false,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        post: {},
        error: true,
      };
    default:
      return state;
  }
};
