import React from 'react';
import Hero from '../../components/home/ui/Hero';
/* import Features from '../../components/home/ui/Features';
import Testimonials from '../../components/home/ui/Testimonials';
import ContactSection from '../../components/home/ui/ContactSection'; */

function Home() {
  return (
    <div className="home-page">
      <Hero />
      
      {/* You can uncomment these components as they are implemented */}
      {/* <Features /> */}
      {/* <Testimonials /> */}
      {/* <ContactSection /> */}
    </div>
  );
}

export default Home;
