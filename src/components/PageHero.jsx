import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export const PageHero = ({ 
  title, 
  sanskrit, 
  subtitle, 
  image, 
  video, 
  mobileImage, 
  align = "center", 
  imageFit = "cover", 
  imagePosition = "center center", 
  size = "default", 
  children,
  preloaderBgImage,
  horseImage,
  showStaticHorse = false // REMOVED - no longer used
}) => {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [showMainContent, setShowMainContent] = useState(!video || !preloaderBgImage || !horseImage);

  useEffect(() => {
    // Only show preloader if we have video and preloader assets
    if (video && preloaderBgImage && horseImage) {
      const timer = setTimeout(() => {
        setShowMainContent(true);
      }, 3000); // Animation duration
      
      return () => clearTimeout(timer);
    }
  }, [video, preloaderBgImage, horseImage]);

  // Responsive height based on screen size
  const getSectionHeight = () => {
    if (size === "full") {
      return "min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[82vh] xl:min-h-[85vh]";
    } else if (size === "compact") {
      return "min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[68vh]";
    } else {
      return "min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh]";
    }
  };

  // Responsive text sizes
  const getTitleSize = () => {
    if (size === "compact") {
      return "text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.4rem]";
    } else {
      return "text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem]";
    }
  };

  const getSanskritSize = () => {
    return "text-sm sm:text-base md:text-xl lg:text-2xl";
  };

  const getSubtitleSize = () => {
    if (size === "compact") {
      return "text-xs sm:text-sm md:text-base lg:text-xl";
    } else {
      return "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl";
    }
  };

  // Responsive padding
  const getPadding = () => {
    if (size === "compact") {
      return "py-6 sm:py-8 md:py-10 lg:py-12";
    } else if (size === "full") {
      return "py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20";
    } else {
      return "py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16";
    }
  };

  return (
    <section className={`relative w-full overflow-hidden bg-gradient-temple flex items-center ${getSectionHeight()}`}>
      
      {/* Background - Show preloader or main content */}
      <div className="absolute inset-0 w-full h-full">
        {!showMainContent && preloaderBgImage && horseImage ? (
          /* Preloader with horse animation */
          <>
            {/* Preloader background image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${preloaderBgImage})`,
              }}
            />
            
            {/* Dark overlay for preloader */}
            <div className="absolute inset-0 bg-black/50 sm:bg-black/60" />
            
            {/* Horse animation - coming from right side */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute h-full top-1/2 -translate-y-1/2 animate-horse-ride">
                <img
                  src={horseImage}
                  alt="Horse"
                  className="h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] w-auto object-contain max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </div>
            </div>
          </>
        ) : (
          /* Main content background */ 
          <>
            {video ? (
              /* Video background — plays only first 6 seconds then loops */
              <video
                autoPlay
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: imagePosition }}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.currentTime >= 6) {
                    v.currentTime = 0;
                  }
                }}
              >
                <source src={video} type="video/mp4" />
                <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              </video>
            ) : imageFit === "contain" ? (
              /* For contain: use CSS background so the full image shows without cropping */
              <div
                className="absolute inset-0 w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundColor: "#0d0500",
                }}
              />
            ) : mobileImage ? (
              <picture className="absolute inset-0 h-full w-full">
                <source media="(max-width: 640px)" srcSet={mobileImage} />
                <source media="(max-width: 768px)" srcSet={mobileImage} />
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  style={{ objectPosition: imagePosition }}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-90 animate-fade-in"
                />
              </picture>
            ) : (
              <img
                src={image}
                alt=""
                aria-hidden
                style={{ objectPosition: imagePosition }}
                className="absolute inset-0 h-full w-full object-cover opacity-90 animate-fade-in"
              />
            )}
            {/* Dark scrim - responsive opacity */}
            <div className={`absolute inset-0 ${imageFit === "contain" && !video ? "bg-black/40 sm:bg-black/50" : "bg-black/45 sm:bg-black/55"}`} />
            {/* Warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20 sm:bg-[linear-gradient(160deg,hsl(20_60%_10%/0.65)_0%,hsl(20_40%_12%/0.35)_60%,transparent_100%)]" />
            {/* Festive radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(22_88%_52%/0.1),transparent_55%)] sm:bg-[radial-gradient(circle_at_30%_50%,hsl(22_88%_52%/0.15),transparent_55%)]" />
          </>
        )}
      </div>

      {/* REMOVED: Static Horse Image section completely */}

      {/* Content - Only show when main content is ready */}
      {showMainContent && (
        <div className={`container-narrow relative w-full z-10 ${getPadding()} ${align === "center" ? "text-center" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full px-2 sm:px-4 md:px-6 ${
              align === "center" ? "mx-auto text-center" : ""
            } ${
              size === "compact" 
                ? "max-w-2xl sm:max-w-3xl md:max-w-4xl" 
                : "max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
            }`}
          >
            {/* SANSKRIT TEXT - MADE DARKER */}
            {sanskrit && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className={`font-sanskrit ${getSanskritSize()} tracking-wide text-amber-600 mb-2 sm:mb-3 md:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] break-words`}
              >
                {sanskrit}
              </motion.div>
            )}

            {/* TITLE - MADE DARKER */}
            <h1
              className={`font-bold drop-shadow-[0_10px_24px_rgba(0,0,0,0.9)] ${
                isHindi ? "font-sanskrit" : "font-display"
              } ${getTitleSize()} break-words`}
              style={{ lineHeight: isHindi ? 1.4 : 1.2 }}
            >
              {isHindi ? (
                <span
                  style={{
                    background: "linear-gradient(90deg, #d4a017 0%, #c47a1a 28%, #b86b1a 55%, #d4a017 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                    paddingTop: "0.1em",
                    paddingBottom: "0.05em",
                  }}
                >
                  {title}
                </span>
              ) : (
                <span
                  className="bg-clip-text text-transparent inline-block pb-1"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #d4a017 0%, #c47a1a 28%, #b86b1a 55%, #d4a017 100%)",
                  }}
                >
                  {title}
                </span>
              )}
            </h1>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`${isHindi ? "mt-1 sm:mt-2" : "mt-3 sm:mt-4"} flex items-center gap-2 sm:gap-3 ${align === "center" ? "justify-center" : ""}`}
            >
              <span className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold animate-flame text-base sm:text-lg md:text-xl">✦</span>
              <span className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-l from-transparent to-gold" />
            </motion.div>

            {/* SUBTITLE - MADE DARKER */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className={`font-display text-amber-200 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] tracking-wide ${
                  size === "compact"
                    ? `${isHindi ? "mt-1 sm:mt-2 font-sanskrit" : "mt-2 sm:mt-3"} ${getSubtitleSize()}`
                    : `${isHindi ? "mt-2 sm:mt-3 font-sanskrit" : "mt-3 sm:mt-4 md:mt-5"} ${getSubtitleSize()} font-medium`
                } break-words px-2 sm:px-4`}
              >
                {subtitle}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className={`mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-3 md:gap-4 overflow-x-clip px-2 sm:px-0 ${align === "center" ? "justify-center" : ""}`}
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};