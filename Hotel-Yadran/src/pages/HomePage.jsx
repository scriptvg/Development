import React from 'react';
import Features from '../components/home/ui/Features';
import ContactSection from '../components/home/ui/ContactSection';
import Testimonials from '../components/home/ui/Testimonials';
import { Container } from 'react-bootstrap';

// You can also add a hero section or other components here
const HeroSection = () => {
  return (
    <section className="hero-section py-5 bg-dark text-white">
      <Container className="text-center py-5">
        <h1 className="display-4 fw-bold">Welcome to Hotel Yadran</h1>
        <p className="lead mb-4">Experience luxury and comfort in the heart of the city</p>
        <button className="btn btn-primary btn-lg">Book Now</button>
      </Container>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <Features />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default HomePage;
