import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/Message.css';

/**
 * Simple message bubble
 */
function Message({text}) {
  return <p className={'Message'}>{text}</p>;
}

Message.propTypes = {
  /// message text to be desplayed
  text: PropTypes.string.isRequired,
};

export default Message;
