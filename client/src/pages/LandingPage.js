import React from 'react';
import { useNavigate } from 'react-router-dom';
import landingImage from '../assets/landingpage.png';
import './LandingPage.css'; 
import Header from '../components/Header';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-container">
      <Header />
      <header className="landing-header">
        <h1 className="landing-title">
          Share Files in Seconds — <br />Go Beyond with Premium
        </h1>
        <p className="landing-description">
          SwiftShare lets anyone send files instantly — no account needed.
          <br />
          Need more space and control? Unlock powerful features with SwiftShare Premium.
        </p>
        <button
          className="landing-cta"
          onClick={() => navigate('/send')}
          aria-label="Navigate to file upload page"
        >
          Send File
        </button>
      </header>

      <div className="landing-image-wrapper">
        <img src={landingImage} alt="Landing illustration" className="landing-image" />
      </div>
    </section>
  );
};

export default LandingPage;
