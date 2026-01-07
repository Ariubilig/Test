import { useEffect, useState } from "react";


export function useFontsReady() {

  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsReady(true);
      return;
    }

    document.fonts.ready.then(() => { // waits all fonts finish
      setFontsReady(true);
    });
  }, []);

  return fontsReady;
  
}