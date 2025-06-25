import React from 'react'
import Navbar from '../components/Navbar'
import Footer from  '../components/Footer'
import Books from '../components/books'
import { useEffect } from 'react'

const BookPage = () => {
    useEffect(()=>{
      window.scrollTo(0,0);
  
    },[])
  return (
    <>
    <Navbar />
    <Books />
    <Footer />
    </>
  )
}

export default BookPage