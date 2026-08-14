import { createContext, useContext, useEffect, useReducer } from "react";

const MyListContext = createContext(null);

const initialState = {
  movies: [],
};

// Load initial state from localStorage
const getInitialState = () => {
  try {
    const savedList = localStorage.getItem("my-list");

    if (savedList) {
      const parsedList = JSON.parse(savedList);

      if (Array.isArray(parsedList)) {
        return {
          movies: parsedList,
        };
      }
    }
  } catch (error) {
    console.error("Failed to load My List:", error);
  }

  return initialState;
};

const myListReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MOVIE": {
      const exists = state.movies.some(
        (movie) => movie.id === action.payload.id,
      );

      if (exists) {
        return {
          movies: state.movies.filter(
            (movie) => movie.id !== action.payload.id,
          ),
        };
      }

      return {
        movies: [...state.movies, action.payload],
      };
    }

    case "REMOVE_MOVIE":
      return {
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    default:
      return state;
  }
};

export const MyListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    myListReducer,
    initialState,
    getInitialState,
  );

  // Save My List whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("my-list", JSON.stringify(state.movies));
    } catch (error) {
      console.error("Failed to save My List:", error);
    }
  }, [state.movies]);

  const toggleMovie = (movie) => {
    dispatch({
      type: "TOGGLE_MOVIE",
      payload: movie,
    });
  };

  const removeMovie = (movieId) => {
    dispatch({
      type: "REMOVE_MOVIE",
      payload: movieId,
    });
  };

  const isInList = (movieId) => {
    return state.movies.some((movie) => movie.id === movieId);
  };

  return (
    <MyListContext.Provider
      value={{
        movies: state.movies,
        toggleMovie,
        removeMovie,
        isInList,
      }}
    >
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);

  if (!context) {
    throw new Error("useMyList must be used inside MyListProvider");
  }

  return context;
};
