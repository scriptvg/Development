import React from 'react';
import Hero from '../../components/home/ui/Hero';
import BarraNav from '../../components/home/BarraNav';
import Features from '../../components/home/ui/Features.jsx';
import Testimonials from '../../components/home/ui/Testimonials.jsx';
import ContactSection from '../../components/home/ui/ContactSection.jsx';

function Home() {
  return (
    <div className="home-page">
      <BarraNav />
      <Hero />

      {/* You can uncomment these components as they are implemented */}
      <Features />
      <Testimonials />
      <ContactSection />
    </div>
  );
}

export default Home;
