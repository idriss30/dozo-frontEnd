import { useEffect, useReducer } from "react";
import axios from "axios";

// a reducer function which takes a state object and a return a function
const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case "PROCESS_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "PROCESS_COMPLETE":
      return {
        ...state,
        isLoading: false,
        setError: false,
        data: action.payload, // to set the data to the response
      };

    case "PROCESS_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useCustomFetch = (initialLink, initialItems) => {
  // define the initial data
  const [state, dispatch] = useReducer(fetchDataReducer, {
    loading: false,
    isError: false,
    data: initialItems,
  });

  useEffect(() => {
    // define a variable to stop the effect to setState on unmounted component
    let isUnMounted = false;
    const launchFetch = async () => {
      // dispatch action to the reducer to launch initial process of fetch
      dispatch({ type: "PROCESS_INIT" });
      try {
        const result = await axios(initialLink);
        if (!isUnMounted) {
          // dispatch the success when component is mounted
          dispatch({ type: "PROCESS_COMPLETE", payload: result.data });
        }
      } catch (error) {
        // dispatch the error action
        dispatch({ type: "PROCESS_ERROR" });
      }
    };
    launchFetch();
    return () => {
      isUnMounted = true;
    };
  }, [initialLink]);

  return state;
};

export default useCustomFetch;
