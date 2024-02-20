import React, { useState } from 'react';
import './styles/style.css';
import HeaderSection from './headerSection.js';
import LoginForm from './loginSection.js';
import BioSection from './simulateTextSection.js';
import SkillsSection from './skillsSection.js';
import ContactSection from './contactSection.js';

function App() {
  let checkVisibility = 0;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBio, setShowBio] = useState(true);
  const loginFunction = () => {
    setShowLogin(true);
    setShowRegistration(false);
    setShowSkills(false);
    setShowContact(false);
    setShowBio(false);
  };
  const registrationFunction = () => {
    setShowLogin(false);
    setShowRegistration(true);
    setShowSkills(false);
    setShowContact(false);
    setShowBio(false);
  };
  const skillsFunction = () => {
    setShowLogin(false);
    setShowRegistration(false);
    setShowBio(false);
    setShowSkills(true);
    setShowAddSkill(false);
    setShowContact(false);
  };
  const addSkillFunction = () => {
    setShowLogin(false);
    setShowRegistration(false);
    setShowBio(false);
    setShowSkills(false);
    setShowAddSkill(true);
    setShowContact(false);
  };
  const contactFunction = () => {
    setShowLogin(false);
    setShowRegistration(false);
    setShowBio(false);
    setShowSkills(false);
    setShowAddSkill(false);
    setShowContact(true);
    checkVisibility = true;
  };
  const mainFunction = () => {
    setShowLogin(false);
    setShowRegistration(false);
    setShowBio(true);
    setShowSkills(false);
    setShowContact(false);
    setShowAddSkill(false);
  };

  return (
    <>

      {/* Start Header */}
      <HeaderSection loginFunction={loginFunction} registrationFunction={registrationFunction} skillsFunction={skillsFunction} addSkillFunction={addSkillFunction} contactFunction={contactFunction} mainFunction={mainFunction}/>
      {/* End Header */}

      {/* Start Bio */}
      {showBio && <BioSection showBio={showBio} setShowBio={setShowBio} />}
      {/* End Bio */}

      {/* Start login */}
      {(showLogin || showRegistration) && <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} showRegistration={showRegistration} setShowRegistration={setShowRegistration} />}
      {/* End login */}

      {/* Start Skills Section */}
      {(showAddSkill || showSkills) && < SkillsSection showSkills={showSkills} setShowSkills={setShowSkills} showAddSkill={showAddSkill} setShowAddSkill={setShowAddSkill}/>}
      {/* End Skills Section */}

      {/* Start Contact */}
      {showContact && <ContactSection showContact={showContact} setShowContact={setShowContact} checkVisibility={checkVisibility} />}
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
