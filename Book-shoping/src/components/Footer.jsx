import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { footerStyles as styles } from '../assets/dummystyles'
import logo from '../assets/logoicon.png'
import { socialLinks,quickLinks } from '../assets/dummydata'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
        const [logo,setLogo] = useState(null)
    useEffect(() => {
      fetch("https://bookstore-backend-6c1r.onrender.com/api/logo")
        .then((res) => res.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setLogo(imageUrl);
        })
        .catch((err) => console.error("Image fetch failed:", err));
    }, []);
  return (
    <footer>
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.logoBlock}>
                        <Link to='/' className={styles.logoLink}>
{logo && (
  <img src={logo} alt="logo" className={styles.logoImg} />
)}                           <h1 className={styles.logoText}>
                            BOOKSTOR
                        </h1>
                        </Link>
                        <p className={styles.aboutText}>
                            Your gateway to literary adventures. Discover, explore, and immerse
                             yourself in the world of books.
                        </p>
                        <div className={styles.socialWrap}>
                            {socialLinks.map(({ Icon, url }, i) =>(
                                <a href={url} key={i} target='_blank' className={styles.socialButton}>
                                    <Icon className={styles.socialIcon}/>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className={styles.quickLinksBlock}>
                        <h3 className={styles.quickLinksTitle}>Quick Links</h3>
                        <ul className={styles.quickLinksList}>
                            {quickLinks.map((link, idx) =>(
                                <li key={idx}>
                                    <Link to={link.url} className={styles.quickLinkItem}>
                                    <span className={styles.quickLinkDot}></span>
                                    {link.title}
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.newsletterBlock}>
                        <h3 className={styles.newsletterTitle}>Stay Updated</h3>
                        <p className={styles.newsletterText}>
                            Subscribe to our newsletter for the latest releases and exclusive offers.
                        </p>

                        <form className={styles.formWrap}>
                            <input type="email" placeholder='Enter your email' className={styles.input} />
                            <button type='submit' className={styles.button}>
                                <ArrowRight className='h-4 w-4' />
                            </button>
                        </form>
                    </div>
                    <div className={styles.contactBlock}>
                        <h3 className={styles.contactTitle}>Contact Us</h3>
                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <MapPin className={styles.contactIcon} />
                                <span>123 Literary Lane , Bookville, BK 12345</span>
                            </div>
                            <div className={styles.contactRow}>
                                <Phone className={styles.contactIconInline} />
                                <span>91+ 6235923901</span>
                            </div>
                            <div className={styles.contactRow}>
                                <Mail className={styles.contactIconInline} />
                                <span>naveendasct901@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.copyrightWrap}>
                <p className={styles.copyrightText}>
                    &copy; {new Data().getFullYear()} BookShell. All rights reserved.
                </p>
                <a href=''></a>
            </div> */}
        </div>

    </footer>
  )
}

export default Footer