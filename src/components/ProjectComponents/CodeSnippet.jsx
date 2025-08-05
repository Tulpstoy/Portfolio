import React from 'react';
import '../ProjectComponents/CodeSnippet.css'; 

const CodeSnippet = ({ title, id, code, activeSection, toggle }) => (
  <div className="code-section">
    <div className="code-header" onClick={() => toggle(id)}>
      <h4>{title}</h4>
      <button className="code-toggle">
        <span className={`plus-icon ${activeSection === `code-${id}` ? 'is-active' : ''}`}>+</span>
      </button>
    </div>
    <div className={`code-content ${activeSection === `code-${id}` ? 'is-expanded' : ''}`}>
      <pre><code>{code}</code></pre>
    </div>
  </div>
);

export default CodeSnippet;
