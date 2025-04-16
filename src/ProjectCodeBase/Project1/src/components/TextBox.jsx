import React from 'react';
// Update the path to match the correct location of TextBox.css
import '../css/TextBox.css';

function TextBox({ placeholder, value, onChange }) {
  return (
    <textarea
      className="custom-textbox"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ overflow: 'hidden' }} // Prevent scrollbars
    />
  );
}

export default TextBox;
