import React from 'react';
import PropTypes from 'prop-types';

/**
 * Layout helper component
 */
function FlexColumn({ alignChildren, fullWidth, children }) {
  /// Additional FlexColumn class modifier  ------------------------------------
  let flexAlignChildrenClassName = 'align-children-center';
  if (alignChildren === 'left') flexAlignChildrenClassName = 'align-children-left';
  else if (alignChildren === 'right') flexAlignChildrenClassName = 'align-children-right';

  return (
    <div className={'FlexColumn ' + flexAlignChildrenClassName + (fullWidth === true ? ' full-width' : '')}>
      { children }
    </div>
  );
}

FlexColumn.propTypes = {
  /// default value is center
  alignChildren: PropTypes.string,
  /// should have width 100%, default is "false"
  fullWidth: PropTypes.bool,
};

export default FlexColumn;
