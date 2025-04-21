import React, { useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function Home() {
  const mainRef = useRef(null);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Head>
        <title>The Finals Assistant - Game Enhancement Tool</title>
        <meta name="description" content="Professional gaming assistance for The Finals" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="bg-light-pattern"></div>

      <Navbar />
      
      <main ref={mainRef} className="scroll-container">
        <section id="hero" className="section">
          <Hero />
        </section>
        
        <section id="showcase" className="section">
          <Showcase />
        </section>
        
        <section id="features" className="section">
          <Features />
        </section>
        
        <section id="pricing" className="section">
          <Pricing />
        </section>
        
        <section id="footer" className="section">
          <Footer />
        </section>
      </main>
    </div>
  );
} 