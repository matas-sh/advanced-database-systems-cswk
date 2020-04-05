import React from 'react';
import PropTypes from 'prop-types';

export const QueryContext = React.createContext();

const initialState = {
  date1: '2020-01',
  date2: undefined,
  position: [52.4866322, -1.8925337],
  crimeType: new Set(['Burglary', 'Robbery']),
  distance: 1500,
  option: 'grouped-location',
  loading: false,
  error: undefined,
  zoom: 14,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUERY_VALUES':
      return { ...state, ...action.payload };
    case 'QUERY_COMPLETED':
      return {
        ...state, loading: false, error: undefined, data: action.payload,
      };
    case 'QUERY_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'QUERY_LOADING':
      return { ...state, loading: true };
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
