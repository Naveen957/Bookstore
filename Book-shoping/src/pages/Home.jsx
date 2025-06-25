import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import OurBestSellers from '../components/OurBestSellers'
import HomeBooks from '../components/HomeBooks'
import HomeAbout from '../components/HomeAbout'
import Footer from '../components/Footer'
import { useEffect } from 'react'

function Home() {
    useEffect(()=>{
      window.scrollTo(0,0);
  
    },[])
  return (
    <>
    <Navbar />
    <Banner />
    <OurBestSellers />
    <HomeBooks />
    <HomeAbout />
    <Footer />
    </> 
 )
}

export default Home