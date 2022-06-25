import React, { useEffect } from 'react';
import Router from './routes';
import AuthProvider from './contexts/Auth';
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
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </div>
  );
}

export default App;
