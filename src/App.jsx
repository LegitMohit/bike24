import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import VerifyPhone from './pages/VerifyPhone';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify" element={<VerifyPhone />} />
      </Routes>
    </Layout>
  );
}

export default App;

