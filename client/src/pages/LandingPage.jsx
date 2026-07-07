import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Tour from '../components/landing/Tour';
import Stats from '../components/landing/Stats';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  // Smooth scroll implementation when page loads or navigation is clicked
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener('click', handleAnchorClick));

    return () => {
      links.forEach((link) => link.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Fixed Sticky Header */}
      <Header />

      {/* Main content grid */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Problem Section */}
        <Problem />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Real App CSS Mockup Tour */}
        <Tour />

        {/* Social Proof & Metrics */}
        <Stats />

        {/* Pricing Matrix */}
        <Pricing />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Final Call to Action */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
