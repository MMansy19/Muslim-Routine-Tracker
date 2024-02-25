import React, { useState } from 'react';
import './styles/style.css';
import HeaderSection from './headerSection.js';
import BioSection from './simulateTextSection.js';
import SkillsSection from './skillsSection.js';
import ContactSection from './contactSection.js';

function App() {
  let checkVisibility = 0;
  const [showSkills, setShowSkills] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBio, setShowBio] = useState(true);

  const skillsFunction = () => {
    setShowBio(false);
    setShowSkills(true);
    setShowAddSkill(false);
    setShowContact(false);
  };
  const addSkillFunction = () => {
    setShowBio(false);
    setShowSkills(false);
    setShowAddSkill(true);
    setShowContact(false);
  };
  const contactFunction = () => {
    setShowBio(false);
    setShowSkills(false);
    setShowAddSkill(false);
    setShowContact(true);
    checkVisibility = true;
  };
  const mainFunction = () => {
    setShowBio(true);
    setShowSkills(false);
    setShowContact(false);
    setShowAddSkill(false);
  };

  return (
    <>

      {/* Start Header */}
      <HeaderSection  skillsFunction={skillsFunction} addSkillFunction={addSkillFunction} contactFunction={contactFunction} mainFunction={mainFunction}/>
      {/* End Header */}

      {/* Start Bio */}
      {showBio && <BioSection showBio={showBio} setShowBio={setShowBio} />}
      {/* End Bio */}


      {/* Start Skills Section */}
      {(showAddSkill || showSkills) && < SkillsSection showSkills={showSkills} setShowSkills={setShowSkills} showAddSkill={showAddSkill} setShowAddSkill={setShowAddSkill} addSkillFunction={addSkillFunction}/>}
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
