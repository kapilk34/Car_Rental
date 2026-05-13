import React from 'react'
import HeroSection from '../components/Hero.jsx';
import FeaturedSections from '../components/FeaturedSection.jsx';
import Banner from '../components/Banner.jsx';
import TestimonialSection from '../components/Testimonials.jsx';
import NewsLetter from '../components/NewsLetter.jsx';
import LogosCards from '../components/LogosCards.jsx';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <LogosCards/>
      <FeaturedSections/>
      <Banner/>
      <TestimonialSection/>
      <NewsLetter/>
    </div>
  )
}

export default Home