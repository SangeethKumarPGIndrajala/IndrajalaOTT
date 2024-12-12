import React, { useEffect, useState } from 'react';
import './Indrajala.css';
import backgroundImage from '../assets/Name.png';

const Indrajala = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="indrajala-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="app">
        <header>
          
        </header>
        <main>
          <h2 className={`main-message ${animate ? 'animate' : ''}`}>
           <br/>
          </h2>
          <p className={`sub-message ${animate ? 'animate' : ''}`}>
           
          </p>
          <div className={`tagline ${animate ? 'animate' : ''}`}>
           
          </div>
          <p className={`coming-soon ${animate ? 'animate' : ''}`}>
            Coming Soon to Ignite Your Imagination
          </p>
        </main>
        <footer>
          <p>Must be Indulge responsibly.</p>
        </footer>
      </div>
    </div>
  );
};

export default Indrajala;