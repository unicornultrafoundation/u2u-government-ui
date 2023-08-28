import React from 'react';
import './App.css';
import { Layout } from './components';
import { Route, Routes } from "react-router-dom";
import { Portfolio } from './page/portfolio';
import { Validator } from './page/validator';
import { Home } from './page/home';


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/validator" element={<Validator />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
