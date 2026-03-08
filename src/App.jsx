import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import VerifyPhone from './pages/VerifyPhone';
import Sell from './pages/Sell';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify" element={<VerifyPhone />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </Layout>
  );
}

export default App;

