import React from 'react';
import PropTypes from 'prop-types';

export const MapContext = React.createContext();

/**
 * Intial state setup with empty objects.
 */
const initialState = {
  location: [52.4866322, -1.8925337],
};

/**
 * Reducer function for easily accessing context state outside of provider.
 * Used by consumers that subscribe to this.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

const state = ({ children }) => {
  const [mState, mDispatch] = React.useReducer(reducer, initialState);
  const Map = { mState, mDispatch };

  return <MapContext.Provider value={Map}>{children}</MapContext.Provider>;
};

state.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default state;
