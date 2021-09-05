import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from '../LayoutComponents/FlexColumn';
import '../../Styles/SearchBox.css';

/**
 * Simple input field with label that fires event on value change
 */
function SearchBox({ label, value, onValueChange, disabled }) {
  return (
    <div className={'SearchBox'}>
      <FlexColumn alignChildren={'right'}>
        <label>
          { label }
          <input value={value} onChange={(event) => onValueChange(event.target.value)} disabled={disabled} />
        </label>
      </FlexColumn>
    </div>
  );
}

SearchBox.propTypes = {
  /// label for input field
  label: PropTypes.string.isRequired,
  /// search term value for input field
  value: PropTypes.string.isRequired,
  /// callback that accepts one argument of type string
  /// (newValue) => {}
  onValueChange: PropTypes.func.isRequired,
  /// disabled attribute for input field
  disabled: PropTypes.bool.isRequired,
};

export default SearchBox;
