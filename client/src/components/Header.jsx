import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  //console.log('헤더')

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  });

  return (
    <header className={scrollPosition < 80 ? "originalHeader" : "changeHeader"}>
      <div className="logo p-3.5">
        <h1 className="italic text-3xl font-extrabold">
          <Link to="/">
            POCAZ<span className="logoDot">.</span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
