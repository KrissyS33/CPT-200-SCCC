import React from 'react';
import Contact from './components/Contact'
import About from './components/About'
import Resources from './components/Resources'
import THing from './components/Thing'
import Body from './components/Body';
import Header from './components/Header';

function App() {
  return (
    <div>    
    <Header />
    <Body />
    <Thing />
    <Resources />
    <About />
    <Contact />
    </div>
  );
}

export default App;
