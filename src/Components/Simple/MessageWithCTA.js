import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/Message.css';

/**
 * Message bubble with CTA button
 */
function MessageWithCTA({text, ctaLabel, onCTAClicked}) {
  return <p className={'Message'}>{text} <button onClick={onCTAClicked}>{ctaLabel}</button></p>;
}

MessageWithCTA.propTypes = {
  /// message text to be desplayed
  text: PropTypes.string.isRequired,
  /// CTA button label
  ctaLabel: PropTypes.string.isRequired,
  /// callback for CTA button
  onCTAClicked: PropTypes.func.isRequired,
};

export default MessageWithCTA;
