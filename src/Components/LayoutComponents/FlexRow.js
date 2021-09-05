import React from 'react';
import PropTypes from 'prop-types';

/**
 * Layout helper component
 * alignChildren can have values [center|start|end]
 * center is default
 */
function FlexRow({ alignChildren, children }) {
  /// Additional FlexColumn class modifier  ------------------------------------
  let flexAlignChildrenClassName = 'align-children-center';
  if (alignChildren === 'start') flexAlignChildrenClassName = 'align-children-start';
  else if (alignChildren === 'end') flexAlignChildrenClassName = 'align-children-end';
  else if (alignChildren === 'space-betwen') flexAlignChildrenClassName = 'align-children-space-between';

  return (
    <div className={'FlexRow ' + flexAlignChildrenClassName }>
      { children }
    </div>
  );
}

FlexRow.propTypes = {
  /// default value is center
  alignChildren: PropTypes.string,
};

export default FlexRow;
