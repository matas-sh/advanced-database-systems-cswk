import React from 'react';
import PropTypes from 'prop-types';

export const SearchContext = React.createContext();

const initialState = {
  location: [52.4866322, -1.8925337],
  zoom: 14,
  loading: false,
  radius: 5000,
  error: undefined,
};

const reducer = (state, action) => {
  console.log('wtf');
  switch (action.type) {
    case 'SET_LOCATION_FOUND':
      return {
        ...state, loading: false, error: undefined, ...action.payload,
      };
    case 'SET_SEARCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RADIUS':
      return { ...state, radius: action.payload };
    default:
      return state;
  }
};

const state = ({ children }) => {
  const [sState, sDispatch] = React.useReducer(reducer, initialState);
  const Search = { sState, sDispatch };

  return <SearchContext.Provider value={Search}>{children}</SearchContext.Provider>;
};

state.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default state;
