import React from 'react';
import PropTypes from 'prop-types';
import Message from '../../Components/Simple/Message';
import MessageWithCTA from '../../Components/Simple/MessageWithCTA';

/**
 * Component renders simple info message that list is empty
 * or, in case there is some searchTerm, it offers button to reset search
 */
function EmptyCurrencyList({currentSearchTerm, onClearSearchTerm}) {
  if (currentSearchTerm.length > 0) {
    return <MessageWithCTA text={'There are no results..'} ctaLabel={'Reset search'} onCTAClicked={onClearSearchTerm} />;
  }
  return <Message text={'There are no results...'} />;
}

EmptyCurrencyList.propTypes = {
  /// used to decide if CTA button should be visible or not
  currentSearchTerm: PropTypes.string.isRequired,
  /// used as callback for CTA button
  onClearSearchTerm: PropTypes.func.isRequired,
};

export default EmptyCurrencyList;
