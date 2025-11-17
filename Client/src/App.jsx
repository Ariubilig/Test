import { useState, useRef, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/UI/Navbar/Navbar';
// import Footer from './components/UI/Footer/Footer';

import Home from './pages/Home/Home.jsx';
import Music from './pages/Music/Music.jsx';
import Merch from './pages/Merch/Merch.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

import Preloader from './components/UX/Preloader/Preloader';
import FadeDownUp from './components/UX/PageTransiton/FadeDownUp.jsx';
import { useScrollSmoother } from './components/hooks/useScrollSmootherLoad.jsx';
import { useFontsReady } from "./components/hooks/useFontsReady.js";


function App() {

  //////////////////////////////////////////////////////////////////
  const [preloaderDone, setPreloaderDone] = useState(false);
  const smoothWrapperRef = useRef(null);
  useScrollSmoother(smoothWrapperRef, preloaderDone);
  const fontsReady = useFontsReady();
  //////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (fontsReady) {
      setPreloaderDone(true);
    }
  }, [fontsReady]);
  

  return (
    <>

    {!preloaderDone ? (
      <Preloader onFinish={() => setPreloaderDone(true)} />
    ) : (
      <>

      <FadeDownUp>

        <Navbar />

        <div id="smooth-wrapper" ref={smoothWrapperRef}>
          <div id="smooth-content">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Music" element={<Music />} />
              <Route path="/Merch" element={<Merch />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>

          </div>
        </div>

        {/* <Footer /> */}

      </FadeDownUp>

      </>
    )}

    </>
  );
}


export default App;