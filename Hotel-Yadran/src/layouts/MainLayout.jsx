import React from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
