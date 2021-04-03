import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DefaultLayoutStyles from "./DefaultLayout.module.scss";
import TopNav from "./TopNav/TopNav";
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

      <main className='mt-3'>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default DefaultLayout;
