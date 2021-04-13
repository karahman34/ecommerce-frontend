import { useEffect, useMemo, useState } from "react";
import DefaultLayoutStyles from "./DefaultLayout.module.scss";
import TopNav from "./TopNav/TopNav";
import Footer from "./Footer/Footer";
import PopularCategories from "./PopularCategories/PopularCategories";
import { useLocation } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const location = useLocation();

  const [showNavShadow, setShowNavShadow] = useState(false);
  const scrollHandler = (e) => {
    if (window.scrollY > 0) {
      setShowNavShadow(true);
    } else {
      setShowNavShadow(false);
    }
  };

  const showCategoriesNav = useMemo(() => {
    const blackList = ["/browse"];

    if (blackList.includes(location.pathname)) {
      return false;
    }

    return true;
  }, [location.pathname]);

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

        {showCategoriesNav && <PopularCategories />}
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
