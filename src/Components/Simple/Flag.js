import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/Flag.css';
import '../../Styles/flags.css';

/**
 * renders empty div with class name flag-{countryCode}
 */
function Flag({countryCode}) {
  return <div className={'Flag flag-' + countryCode.toLowerCase()}></div>
};

Flag.propTypes = {
  /// alpoha2Code for the country
  countryCode: PropTypes.string.isRequired,
};

export default Flag;
