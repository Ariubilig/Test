import './Navbar.css';
import { Link } from 'react-router-dom';
import Up from '../../UX/SplitText/SplitTextUp';
import { useState, useEffect, useRef } from "react";


export default function Navbar() {


  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;
      const threshold = 50;

      if (diff > threshold && currentScrollY > 100) {
        setHidden(true); // scroll up
      } else if (diff < -threshold) {
        setHidden(false);// scrioll down
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`Navbar ${hidden ? "Navbar--hidden" : ""}`}>

      <Up delay={1}>
        <Link to="/" className="h1">ЭЛИКСИР КОМБИНАТ</Link>
      </Up>

      <Up delay={1}>
        <div className="links">
          <Link to="/Music">MUSIC</Link>
          <Link to="/Merch">Merch</Link>
        </div>
      </Up>

    </div>
  );
}