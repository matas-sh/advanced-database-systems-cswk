import React from 'react';
import PropTypes from 'prop-types';

export const QueryContext = React.createContext();

const initialState = {
  date1: undefined,
  date2: undefined,
  latitude: undefined,
  longitude: undefined,
  crimeType: [],
  distance: undefined,
  docFields: [],
  loading: false,
  error: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'QUERY_COMPLETED':
      return {
        ...state, loading: false, error: undefined, ...action.payload,
      };
    case 'QUERY_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'QUERY_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const state = ({ children }) => {
  const [qState, qDispatch] = React.useReducer(reducer, initialState);
  const Query = { qState, qDispatch };

  return <QueryContext.Provider value={Query}>{children}</QueryContext.Provider>;
};

state.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default state;
