import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/PageTitle.css';

/**
 * Page title component
 * title is rendered in H1
 */
function PageTitle({ title }) {
  return (
    <div className={'PageTitle'}>
      <h1>{ title }</h1>
    </div>
  );
}

PageTitle.propTypes = {
  /// title to be desplayed
  title: PropTypes.string.isRequired,
};

export default PageTitle;
