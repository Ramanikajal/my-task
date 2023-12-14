
const initialState = {
    showvalue: [],
    filter: "all",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return {
          ...state,
          filter: action.payload,
        };
      case 'SET_SHOW_VALUE':
        return {
          ...state,
          showvalue: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  