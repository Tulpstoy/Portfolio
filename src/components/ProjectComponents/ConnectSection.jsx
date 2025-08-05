import React from 'react';
import '../ProjectComponents/ConnectSection.css';

const ConnectSection = ({ email = "micah.bron@icloud.com" }) => (
  <section className="connect-section">
    <div className="connect-content">
      <h2>Connect With Me</h2>
      <p>Let's work together to bring your ideas to life.</p>
      <div className="email-container">
        <a href={`mailto:${email}`} className="email">{email}</a>
      </div>
    </div>
  </section>
);

export default ConnectSection;
