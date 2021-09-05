import React from 'react';
import PropTypes from 'prop-types';

/**
 * simple message that should be displayed if one or more requests have failed
 * it offers a button to run requests again.
 */
function RequestFailed({onTryAgain}) {
  return (
    <p>One or more requests failed to load...<button onClick={onTryAgain}>Try again</button></p>
  );
}

RequestFailed.propTypes = {
  /// callback to try reloading data from the API
  onTryAgain: PropTypes.func.isRequired,
};

export default RequestFailed;
