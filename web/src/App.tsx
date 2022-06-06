import React, { useEffect } from 'react';
import Router from './routes';
import WebFont from 'webfontloader';

function App() {
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Press Start 2P']
      }
    });
  }, []);

  return (
    <div className="App">
        <Router/>
    </div>
  );
}

export default App;
