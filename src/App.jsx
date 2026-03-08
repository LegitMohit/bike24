import React from 'react';
import Layout from './components/Layout';
import Logo from './components/Logo';
import Button from './components/Button';

function App() {
  return (
    <Layout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Logo />
      </div>

      <div className="w-full flex flex-col gap-5 px-2.5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
        <Button variant="primary">
          Get Started
        </Button>
        <Button variant="secondary">
          I have an account
        </Button>
      </div>

      <p className="text-sm font-medium text-gray-500 mt-2.5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
        Trusted by 10,000+ sellers
      </p>
    </Layout>
  );
}

export default App;

