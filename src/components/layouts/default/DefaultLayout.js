import { useEffect, useState } from "react";
import DefaultLayoutStyles from "./DefaultLayout.module.scss";
import TopNav from "./TopNav/TopNav";
import Footer from "./Footer/Footer";
import PopularCategories from "./PopularCategories/PopularCategories";

const DefaultLayout = ({ children }) => {
  const [showNavShadow, setShowNavShadow] = useState(false);
  const scrollHandler = (e) => {
    if (window.scrollY > 0) {
      setShowNavShadow(true);
    } else {
      setShowNavShadow(false);
    }
  };

  // Listen scroll event.
  window.addEventListener("scroll", scrollHandler);
  useEffect(() => {
    return window.removeEventListener("scroll", scrollHandler);
  });

  return (
    <div className={DefaultLayoutStyles.defaultLayout}>
      <div
        className={`${DefaultLayoutStyles.navBlock} ${
          showNavShadow ? "shadow-sm" : null
        }`}
      >
        <TopNav />

        <PopularCategories />
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
