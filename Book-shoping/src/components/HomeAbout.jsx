import React,{useState,useEffect} from "react";
import {featuredBooks, hastats} from '../assets/dummydata'
import { homeAboutStyles as s } from '../assets/dummystyles'
import HomeAboutImage from '../assets/HomeAboutImage.png'
import {Link} from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const HomeAbout = () => {

        const [homeImages, setHomeImages] = useState(null);
      
        useEffect(() => {
          fetch("http://localhost:4000/api/picture/home")
            .then((res) => res.json())
            .then((data) => setHomeImages(data))
            .catch((err) => console.error("Image fetch failed:", err));
        }, []);
  return (
    <div className={s.wrapper}>
        <div className=' absolute inset-0 overflow-hidden'>
            <div className={s.bgBlur1}></div>
            <div className={s.bgBlur2}></div>
        </div>
        <div className={s.container}>
            <div className={s.aboutGrid}>
                <div className={s.imageWrapper}>
                    <div className={s.imageGlow}></div>
                    <div className={s.imageContainer}>
{homeImages && homeImages[13] ? (
  <img
    src={homeImages[13].image}
    alt="Team"
    className={s.aboutImage}
  />
) : (
  <div className="text-white text-center">Loading image...</div>
)}                    </div>
                </div>
                <div className=' space-y-8'>
                    <div>
                        <h2 className={s.aboutHeader}>Our Literary journey</h2>
                        <div className={s.underline}></div>
                    </div>
                    <p className={s.aboutText}>
                        Founded with a passion for literature, BookShell has evolved into a sanctuary for book lovers.
                        We curate exceptional reading experiences, connecting readers with stories that inspire,
                         educate and transport them to new World
                    </p>
                    <div className={s.statGrid}>
                        {hastats.map((stat, index) =>(
                            <div className={s.statCard} key={index}>
                                <div className={s.statIconWrap}>
                                    <stat.icon className={s.statIcon} />
                                </div>
                                <h3 className={s.statValue}>{stat.value}</h3>
                                <p className={s.statLabel}>{stat.statLabel}</p>
                            </div>
                        ))}
                    </div>
                    <Link to='/about' className={s.aboutButton}>
                    <span>Learn More About us</span>
                    <ArrowRight className={s.arrowIcon}/>
                    </Link>
                </div>
            </div>
            <div className='mb-12 text-center'>
                <h2 className={s.sectionHeader}>Legendary Volumes</h2>
                <div className={s.headerUnderline}></div>
                <p className={s.headerText}>
                    Handpicked recommendations from our literary experts that you won't
                    want to miss.
                </p>
            </div>
            <div className={s.bookGrid}>
                {featuredBooks.map((book, index) => (
                    <div className={s.bookCardWrap} key={index}>
                        <div className={s.bookCardGlow}></div>
                    
                        <div className={s.bookCard}>
                            <div className={s.bookImageWrapper}>
{homeImages && homeImages.length > index + 14 && homeImages[index + 14] ? (
  <img
    src={homeImages[index + 14].image}
    alt="Team"
    className={s.bookImage}
  />
) : (
  <div className="text-white text-center">Loading image...</div>
)}                           </div>

                            <div className={s.bookContent}>
                                <h3 className={s.bookTitle}>{book.title}</h3>

                                <p className={s.bookAuthor}>{book.author}</p>
                                <p className={s.bookDesc}>{book.description}</p>

                                <Link to='/books' className={s.discoverLink}>
                                    <spam>
                                        Discover
                                    </spam> 
                                    <ArrowRight className={s.arrowSmall} />                            
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>

  )
}

export default HomeAbout