const initialState = {
  user: null,
};

//reducer function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...action.payload },
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
