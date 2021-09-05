import React from 'react';

/**
 * Layout helper component
 */
function StickyContainer({ children }) {
  return (
    <div className={'StickyContainer'}>
      { children }
    </div>
  );
}

export default StickyContainer;
