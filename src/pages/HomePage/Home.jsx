import React from 'react'
import HomeMain from "./../../components/HomePage/MainSection";
import PopularEvents from "./../../components/HomePage/PopularEvents";
import HelpUs from '../../components/HomePage/HelpUs';
import FinestPhotographers from '../../components/HomePage/FinestPhotographers';
import EventPlanning from '../../components/HomePage/EventPlanning';
import TopArticles from '../../components/HomePage/TopArticles';
import OurCustomers from '../../components/HomePage/OurCustomers';
import AboutUs from '../../components/HomePage/AboutUs';
import VendorRegistration from '../../components/HomePage/VendorRegistration';
import Footer from '../../components/HomePage/Footer';
import Navbar from '../../components/HomePage/Navbar';
import FinestDecorators from '../../components/HomePage/FinestDecorators';
import FinestCaterers from '../../components/HomePage/FinestCaterers';
import FinestMakeupArtist from '../../components/HomePage/FinestMakeup-Artist';
const Home = () => {
  return (
    <>
    <Navbar/>
    <HomeMain/>
    <PopularEvents/>
    <HelpUs/>
    <FinestPhotographers/>
    <FinestDecorators/>
    <FinestMakeupArtist/>
    <FinestCaterers/>
    <EventPlanning/>
    <TopArticles/>
    <OurCustomers/>
    <AboutUs/>
    <VendorRegistration/>
    <Footer/>
    </>
  )
}

export default Home