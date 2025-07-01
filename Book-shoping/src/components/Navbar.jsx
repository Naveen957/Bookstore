import React, { useEffect, useState } from 'react'
import{navbarStyles} from '../assets/dummystyles'
import {Link, useLocation } from 'react-router-dom'
import {navItems} from '../assets/dummydata'

import logo from '../assets/logoicon.png'
import { FaOpencart } from 'react-icons/fa'
import { Menu, User, X } from 'lucide-react'
import { useCart} from '../CartContext/CartContext'

function Navbar() {
     
    const [scrolled,setscrolled] = useState(false);
    const [isOpen,setIsOpen] = useState(false)
    const location = useLocation()

    const {cart} = useCart()

const totalQuantity = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

    useEffect(() => {
        const handleScroll = () => setscrolled(window.scrollY > 10)
        window.addEventListener("scroll",handleScroll)
        return () => window.removeEventListener("scroll",handleScroll)
    }, [])

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
<nav className={navbarStyles.nav(scrolled)}>
    <div className={navbarStyles.container}>
        <div className='flex items-center justify-between'>
            {/* logo */}
            <Link to='/' className={navbarStyles.logoContainer}>
                <div className='relative gruop'>
                    <div className={navbarStyles.logoGradient}/>
                    <div className='relative flex items-center'>
{logo && (
  <img src={logo} alt="logo" className={navbarStyles.logoImage} />
)}                        <div className='ml-2'>
                            <h1 className={navbarStyles.logoText}>BOOKSTOR</h1>
                            <div className="h-0.5 w-0 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] group-hover:w-full transition-all duration-500" />

                        </div>
                    </div>
                </div>
            </Link>
            {/* navigation */}
            <div className={navbarStyles.desktopNavWrapper}>
                {navItems.map((item) =>{
                    const isAcctive = location.pathname === item.path
                    return(
                        <Link key={item.name} to={item.path} className={navbarStyles.navLink}>
                            <div className='relative z-10 flex items-center'>
                                <div className='relative'>
                                    <div className={navbarStyles.navIconWrapper(item.color)}/>
                                    <item.icon className={navbarStyles.navIcon(isAcctive)}/>
                                </div>
                                <span className={navbarStyles.navText(isAcctive, item.color)}>
                                    {item.name}
                                </span>
                                {isAcctive && <span className={navbarStyles.navUnderline(item.color)}/>}
                            </div>
                        </Link>
                    )
                })}
            </div>
                {/* right icone */}
                <div className={navbarStyles.rightIconsWrapper}>
                    <Link to='/cart' className={navbarStyles.cartWrapper}>
                        <div className={navbarStyles.cartGradient}/>
                        <div className='relative'>
                            <FaOpencart className={navbarStyles.cartIcon}/>
                            {totalQuantity > 0 &&(
                                <span className={navbarStyles.cartBadge}>
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                    </Link>
                    <Link to='/login' className={navbarStyles.loginWrapper}>
                    <div className={navbarStyles.loginGradient}/>
                    <div className='relative'>
                        <User className={navbarStyles.loginIcon}/>
                    </div>
                    </Link>
                </div>
                {/* menu but */}
                <div className=' md:hidden flex items-center'>
                    <button onClick={() => setIsOpen(!isOpen)} className={navbarStyles.menuBtn}>
                        <div className={navbarStyles.menuGradient}/>
                        <div className='relative'>
                            {isOpen ? <X className={navbarStyles.menuIcon}/> : <Menu className={navbarStyles.menuIcon} />}
                        </div>
                    </button>
                </div>
        </div>
    </div>

            {/* menu phn navigtion */}
            {isOpen && (
                <div className={navbarStyles.mobileMenu}>
                    <div className={navbarStyles.mobileContainer}>
                        <div className='flex flex-col space-y-1'>
                            {navItems.map((item) =>{
                                const isActive = location.pathname === item.path

                                return(
                                    <Link key={item.name} to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={navbarStyles.mobileNavItem(isActive, item.color)}>
                                        <item.icon className={navbarStyles.mobileNavIcon(isActive, item.color)} />
                                            <span className={navbarStyles.mobileNavText(isActive, item.color)}>
                                                {item.name}
                                            </span>
                                    </Link>
                                )
                            })}
                            <div className={navbarStyles.mobileIconRow}>
                                <Link to='/cart' className='relative group p-2'
                                    onClick={() => setIsOpen(false)}>
                                        <FaOpencart className='h-5 w-5 text-gray-600 group-hover:text-amber-600' />
                                        {totalQuantity > 0 && (
                                            <span className={navbarStyles.mobileCartBadge}>
                                                {totalQuantity}
                                            </span>
                                        )}
                                </Link>
                                <Link to='/login' className=' p-2 group' onClick={() => setIsOpen(false)}>
                                        <User className='h-5 w-5 text-gray-600 group-hover:text-emerald-600' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
</nav>    )
}

export default Navbar