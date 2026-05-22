import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {

  // mobile state store karega
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    // screen size check karne ke liye
    const checkScreenSize = () => {

      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

    };

    // first time run
    checkScreenSize();

    // resize hone par check karega
    window.addEventListener("resize", checkScreenSize);

    // cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };

  }, []);

  return isMobile;
}

export default useIsMobile;