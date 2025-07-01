import React,{useState,useEffect} from "react";
import { homeBooksStyles as styles } from "../assets/dummystyles";
import { useCart } from "../CartContext/CartContext";
import { hbbooks } from "../assets/dummydata";
import {  ArrowRight, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HomeBooks = () => {
  const { cart, dispatch } = useCart();
  const inCart = (id) => cart?.items?.find((item) => item.id === id);

  const handleAdd = (book) =>
    dispatch({ type: "ADD_ITEM", payload: { ...book, quantity: 1 } });
  const handleInc = (id) => dispatch({ type: "INCREMENT", payload: { id } });
  const handleDec = (id) => dispatch({ type: "DECREMENT", payload: { id } });

    const [homeImages, setHomeImages] = useState(null);
  
    useEffect(() => {
      fetch("https://bookstore-backend-6c1r.onrender.com/api/picture/home")
        .then((res) => res.json())
        .then((data) => setHomeImages(data))
        .catch((err) => console.error("Image fetch failed:", err));
    }, []);
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className="text-center mb-12">
            <h2 className={styles.heading}>Bookseller Favorites</h2>
            <div className={styles.headingLine} />
          </div>

          <div className={styles.grid}>
            {hbbooks.map((book,index) => {
              const item = inCart(book.id);
              return (
                <div key={book.id} className={styles.bookCard}>
                  <div className={styles.imageWrapper}>
                     {homeImages && homeImages.length > index + 8 && homeImages[index + 8] ? (
  <img
    src={homeImages[index + 8].image}
    alt="Team"
    className={styles.image}
  />
) : (
  <div className="text-white text-center">Loading image...</div>
)}

                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          className={`h-4 w-4 ${
                            i < book.rating
                              ? "text-[#43C6AC] fill-[#54C6AC]"
                              : "text-gray-300"
                          }`}
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className={styles.title}>{book.title}</h3>
                  <p className={styles.author}>
                    {book.author} best author in this week
                  </p>

                  <span className={styles.actualPrice}>₹{book.price}</span>

                  {item ? (
                    <div className={styles.qtyBox}>
                      <button
                        onClick={() => handleDec(book.id)}
                        className={styles.qtyBtn}
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => handleInc(book.id)}
                        className={styles.qtyBtn}
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(book)}
                      className={styles.addBtn}
                    >
                        <ShoppingCart className='h-5 w-5'/>
                        <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.viewBtnWrapper} >
             <Link to='/books' className={styles.viewBtn}>
             <span>View All Books</span>
             <ArrowRight className={styles.viewIcon} />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBooks;
