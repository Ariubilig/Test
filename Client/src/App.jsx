import { useState, useRef, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/UI/Navbar/Navbar';
import ParallaxFooter from "./components/UI/Footer/ParallaxFooter.jsx";
import Home from './pages/Home/Home.jsx';
import Music from './pages/Music/Music.jsx';
import Merch from './pages/Merch/Merch.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

import Preloader from './components/UX/Preloader/Preloader';
import FadeDownUp from './components/UX/PageTransiton/FadeDownUp.jsx';
import { useScrollSmoother } from './components/hooks/useScrollSmootherLoad.jsx';
import { useFontsReady } from "./components/hooks/useFontsReady.js";

function App() {


/////////////////////////////////////////////////////////////////////////
  const [preloaderAnimDone, setPreloaderAnimDone] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const smoothWrapperRef = useRef(null);
  const fontsReady = useFontsReady();
  useScrollSmoother(smoothWrapperRef, preloaderDone);
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => { // both animation, fonts done hide preloader
    if (preloaderAnimDone && fontsReady) {
      setPreloaderDone(true);
    }
  }, [preloaderAnimDone, fontsReady]);


  return (
    <>

      {!preloaderDone ? (
        <Preloader onFinish={() => setPreloaderAnimDone(true)} />
      ) : (

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

              <ParallaxFooter />

            </div>
          </div>
        </FadeDownUp>

      )}

    </>
  );
}


export default App;