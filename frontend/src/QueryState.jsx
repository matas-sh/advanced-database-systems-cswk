import React from 'react';
import PropTypes from 'prop-types';

export const SearchContext = React.createContext();

const initialState = {
  searchForDate1: null,
  searchForDate2: null,
  searchForCrimeType: [],
};

/**
 * Reducer function for easily accessing context state outside of provider.
 * Used by consumers that subscribe to this.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATION_FOUND':
      return { ...state, loading: false, location: action.payload };
    case 'SET_SEARCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
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
