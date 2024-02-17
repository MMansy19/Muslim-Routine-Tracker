import React, { useState } from 'react';
import './styles/style.css';
import HeaderSection from './headerSection.js';
import LoginForm from './loginSection.js';
import BioSection from './simulateTextSection.js';
import SkillsSection from './skillsSection.js';
import ContactSection from './contactSection.js';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBio, setShowBio] = useState(true);

  const loginFunction = () => {
    setShowLogin(true);
    setShowSkills(false);
    setShowContact(false);
    setShowBio(false);
    
  };
  const linkFunction = () => {
    setShowLogin(false);
    setShowSkills(true);
    setShowContact(true);
    setShowBio(false);
  };
  const mainFunction = () => {
    setShowLogin(false);
    setShowSkills(false);
    setShowContact(false);
    setShowBio(true);
  };

  return (
    <>

      {/* Start Header */}
      <HeaderSection loginFunction={loginFunction} linkFunction={linkFunction} mainFunction={mainFunction}/>
      {/* End Header */}

      {/* Start Bio */}
      {showBio && <BioSection showBio={showBio} setShowBio={setShowBio}/>}
      {/* End Bio */}

      {/* Start login */}
      {showLogin && <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />}
      {/* End login */}

      {/* Start Skills Section */}
      {showSkills && < SkillsSection showSkills={showSkills} setShowSkills={setShowSkills}/>}
      {/* End Skills Section */}

      {/* Start Contact */}
      {showContact && <ContactSection showContact={showContact} setShowContact={setShowContact}/>}
      {/* End Contact */}

      {/* Start Footer */}
      <footer className="footer">
        <p className="footer__author">© المسلم<span className="bio__arrow">🔻</span></p>
      </footer>
      {/* End Footer */}
    </>
  );
}

export default App;
