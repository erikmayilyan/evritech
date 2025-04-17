import React, { useRef, useState, useEffect } from "react";
import nationalAuto from "../assets/nationalauto.png";
import topMove from "../assets/topmove.png";
import erikMayilyan from "../assets/erikmayilyan.png";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "./Work.scss";

const items = [
  {
    id: 1,
    title: "Top Move",
    img: topMove,
    desc: "Top Move Inc., a prominent moving and logistics company based in Vancouver, BC, Canada, required a full-stack functional website to enhance their online presence and streamline their service offerings. The website was developed using HTML, CSS, JavaScript, PHP, and MySQL to ensure a robust and user-friendly experience.",
    web: "https://top-move.ca/",
    link: "VISIT SITE"
  },
  {
    id: 2,
    title: "National Auto",
    img: nationalAuto,
    desc: "National Auto, a leading automotive dealership based in Glendale, CA, USA, required a modern and dynamic full-stack functional website to improve their digital presence and streamline their business operations. The website was developed using the MERN stack (MongoDB, Express.js, React, and Node.js) to ensure a high-performance, scalable, and user-friendly solution.",
    web: "https://national-auto-backup-cxqf.vercel.app/",
    link: "COMING SOON (VISIT DEMO)"
  },
  {
    id: 3,
    title: "Erik Mayilyan Portfolio Page",
    img: erikMayilyan,
    desc: "Erik Mayilyan's Portfolio Page is a professional, full-stack functional website showcasing his skills, projects, and accomplishments in the tech industry. Built using HTML, CSS, JavaScript, PHP, and MySQL, the website provides a dynamic and engaging user experience, reflecting Erik's expertise and creativity.",
    web: "https://erikmayilyan.com/",
    link: "VISIT SITE"
  },
];

function Work() {
  const sectionRef = useRef();
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsAnimationEnabled(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(sectionScrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section className="portfolioSection" ref={sectionRef}>
      <div className="portfolioThing">
        <h1 className="portfolioTitle">PORTFOLIO</h1>
        <motion.div style={{ scaleX }} className="portfolioBar"></motion.div>
      </div>
      <div className="portfolioContent">
        {items.map((item) => (
          <PortfolioItem key={item.id} item={item} isAnimationEnabled={isAnimationEnabled} />
        ))}
      </div>
    </section>
  );
}

function PortfolioItem({ item, isAnimationEnabled }) {
  const itemRef = useRef();
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div className="portfolioContentSection" ref={itemRef}>
      <div className="portfolioWrapper">
        <img src={item.img} alt={item.title} />
        <motion.div className="sectionTextContainer" style={{ y: isAnimationEnabled ? y : 0 }}>
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
          <a href={item.web} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Work;
