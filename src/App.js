import React from 'react'

import { Header } from './components/allComponents.js';
import { Home, NotFound } from './pages/index.js'
import { Cart } from './pages/index.js';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';


function App() {
 return (
    <div className="wrapper">
     <Header />
      <div className="content">
        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
