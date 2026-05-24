import React from 'react'
import HeroSection from '../components/Hero.jsx';
import FeaturedSections from '../components/FeaturedSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Banner from '../components/Banner.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import TestimonialSection from '../components/Testimonials.jsx';
import NewsLetter from '../components/NewsLetter.jsx';
import LogosCards from '../components/LogosCards.jsx';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <LogosCards/>
      <FeaturedSections/>
      <HowItWorks/>
      <Banner/>
      <WhyChooseUs/>
      <TestimonialSection/>
      <NewsLetter/>
    </div>
  )
}

export default Home
