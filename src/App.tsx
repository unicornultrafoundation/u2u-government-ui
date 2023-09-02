import React from 'react';
import './App.css';
import { Layout } from './components';
import { Route, Routes } from "react-router-dom";
import { Portfolio } from './page/portfolio';
import { Validator } from './page/validator';
import { Home } from './page/home';
import { ValidatorRegistration } from './page/validator/register';


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="validator/register" element={<ValidatorRegistration />} />
          <Route path="validator" element={<Validator />}>
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
