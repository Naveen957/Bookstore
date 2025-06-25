import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import { useEffect } from 'react'

const ContactPage = () => {
    useEffect(()=>{
      window.scrollTo(0,0);
  
    },[])
  return (
    <>
    <Navbar/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default ContactPage