import React from "react";
import { useState, useEffect, useRef } from "react";
import "./news.css";

const News = () => {  

  const leftCardRef = useRef(null)
  const rightCardRef = useRef(null)
  const middleCardRef = useRef(null)
  const [leftCdVisibility, setLeftCdVisibility] = useState();
  const [middleCdVisibility, setMiddleCdVisibility] = useState();
  const [rightCdVisibility, setRightCdVisibility] = useState();

  useEffect(() => {
  

    const leftCardObserver = new IntersectionObserver((entries) => {
        const entry1 = entries[0]
        setLeftCdVisibility(entry1.isIntersecting)
    })
    const middleCardObserver = new IntersectionObserver((entries) => {
        const entry2 = entries[0]
        setMiddleCdVisibility(entry2.isIntersecting)
    })
    const rightCardObserver = new IntersectionObserver((entries) => {
        const entry3 = entries[0]
        setRightCdVisibility(entry3.isIntersecting)
    })

    leftCardObserver.observe(leftCardRef.current)
    middleCardObserver.observe(middleCardRef.current)
    rightCardObserver.observe(rightCardRef.current)
  }, []);

  return (
    <div id="news">
      <h1 className="newsH1">News</h1>

      <div className="newsColumn">
        <div ref={leftCardRef} className={`news1 ${leftCdVisibility && "fromLeft"}`}>
          Thunder strikes Delhi</div>

          <div ref={middleCardRef} className={`news2 ${middleCdVisibility && "scale-Up"}`}>
            So sunny in Delhi</div>

            <div ref={rightCardRef} className={`news3 ${rightCdVisibility && "fromRight"}`}>
              Rainy season at Bangaore</div>

      </div>
      <footer>
        <div className="footerTitle">WEATHER APP</div>
        <div className="footerOptions">
          <a href="#home">Home</a>
          <a href="#cities">Cities</a>
          <a href="#news">News</a>
        </div>
        <div className="footerContact">
          
          <div className="contact">
            Contact
            <div className="contact-details">
              <p>
                Contact: 9688854265 <br />
                Mail: elankathirskr92@gmail.com <br />
                Git Id: elankathir1270
              </p>
            </div>
          </div>
          <div>FAq</div>
        </div>
      </footer>
    </div>
  );
};

export default News;
