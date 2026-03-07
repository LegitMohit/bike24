import React from 'react';
import Layout from './components/Layout';
import Logo from './components/Logo';
import Button from './components/Button';
import './styles/App.css';

function App() {
  return (
    <Layout>
      <Logo />

      <div className="button-group">
        <Button variant="primary">
          Get Started
        </Button>
        <Button variant="secondary">
          I have an account
        </Button>
      </div>

      <p className="footer-text">
        Trusted by 10,000+ sellers
      </p>
    </Layout>
  );
}

export default App;

