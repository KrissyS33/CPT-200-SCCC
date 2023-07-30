import React, {Component} from 'react';
import Contact from './components/Contact'
import About from './components/About'
import Resources from './components/Resources'
///import Thing from './components/Thing'
import Body from './components/Body';
import Header from './components/Header';
import GraphForm from './components/GraphForm';

function App() {
  return (
    <div>    
    <Header />
    <Body />
    <GraphForm />
    <Resources />
    <About />
    <Contact />
    </div>
  );
}

export default App;
