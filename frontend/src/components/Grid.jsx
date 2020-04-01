import React from 'react';
import PropTypes from 'prop-types';
import '../../style/custom.scss';

const Grid = ({ children }) => (
  <div className="row">
    <div className="col-xl-0 col-lg-2 col-md-2 col-sm-1 col-0" />
    <div className="col-xl-12 col-lg-8 col-md-8 col-sm-10 col-12">
      {children}
    </div>
    <div className="col-xl-0 col-lg-2 col-md-2 col-sm-1 col-0" />
  </div>
);

Grid.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Grid;
