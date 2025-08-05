import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../ProjectComponents/CodeSnippet.css'; 

const CodeSnippet = ({ title, id, code, language = 'javascript', activeSection, toggle }) => {
  // Language indicator colors (pastel shades)
  const languageColors = {
    javascript: { bg: '#FDFD96', text: '#333333' }, // Pastel Yellow
    jsx: { bg: '#B0E0E6', text: '#333333' },       // Powder Blue
    css: { bg: '#A7D9F4', text: '#333333' },        // Light Sky Blue
    html: { bg: '#FFDAB9', text: '#333333' },       // Peach Puff
    js: { bg: '#FDFD96', text: '#333333' },         // Pastel Yellow
    react: { bg: '#B0E0E6', text: '#333333' },      // Powder Blue
    typescript: { bg: '#9ACEEB', text: '#333333' }, // Sky Blue (slightly deeper pastel)
    tsx: { bg: '#9ACEEB', text: '#333333' },        // Sky Blue (slightly deeper pastel)
    python: { bg: '#E6F3FF', text: '#333333' },     // Very Light Blue
    java: { bg: '#FFE4B5', text: '#333333' },       // Moccasin
    cpp: { bg: '#E0F6FF', text: '#333333' },        // Light Cyan
    csharp: { bg: '#E8F5E8', text: '#333333' },     // Light Green
    php: { bg: '#F0E6FF', text: '#333333' },        // Light Lavender
    ruby: { bg: '#FFE6E6', text: '#333333' },       // Light Pink
    go: { bg: '#E6F7FF', text: '#333333' },         // Light Blue
    rust: { bg: '#FFE6CC', text: '#333333' },       // Light Orange
    swift: { bg: '#FFE6F0', text: '#333333' },      // Light Pink
    kotlin: { bg: '#F0E6FF', text: '#333333' },     // Light Purple
    scala: { bg: '#FFE6E6', text: '#333333' }       // Light Red
  };

  const getLanguageColor = (lang) => {
    return languageColors[lang.toLowerCase()] || { bg: '#F5F5F5', text: '#666666' };
  };

  const languageColor = getLanguageColor(language);

  return (
    <div className="code-section">
      <div className="code-header" onClick={() => toggle(id)}>
        <div className="code-title-section">
          <h4>{title}</h4>
          <span 
            className="language-indicator"
            style={{
              backgroundColor: languageColor.bg,
              color: languageColor.text
            }}
          >
            {language.toUpperCase()}
          </span>
        </div>
        <button className="code-toggle">
          <span className={`plus-icon ${activeSection === `code-${id}` ? 'is-active' : ''}`}>+</span>
        </button>
      </div>
      <div className={`code-content ${activeSection === `code-${id}` ? 'is-expanded' : ''}`}>
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '16px',
            background: '#1e1e1e',
            borderRadius: '0',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            fontFamily: "'Fira Code', monospace"
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            color: '#6e6e6e',
            fontSize: '0.8rem',
            paddingRight: '12px'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippet;
