import React from "react";
import HTML from "../assets/html.png";
import CSS from "../assets/css.png";
import JavaScriptImg from "../assets/javascript.png";
import PHP from "../assets/php.png";
import MySQL from "../assets/mysql.png";
import ReactImg from "../assets/react.png";
import NodeImg from "../assets/nodejs.png";
import Express from "../assets/express.png";
import MongoDb from "../assets/mongodb.png";
import AWSImg from "../assets/aws.png";
import BootstrapImg from "../assets/bootstrap.png";
import DockerImg from "../assets/docker.png";
import JqueryImg from "../assets/jquery.png";
import GitImg from "../assets/git.png";
import GitHubImg from "../assets/github.png";
import FigmaImg from "../assets/figma.png";
import AiImg from "../assets/ai.png";
import PsImg from "../assets/ps.png";
import Canva from "../assets/canva.png";
import "./Tools.css";

const toolsData = [
  {
    "title" : "HTML",
    "imageSrc" : HTML
  },
  { 
    "title" : "CSS",
    "imageSrc" : CSS
  },
  {
    "title" : "JavaScript",
    "imageSrc" : JavaScriptImg
  },
  {
    "title" : "PHP",
    "imageSrc" : PHP
  },
  {
    "title" : "MySQL",
    "imageSrc" : MySQL
  },
  {
    "title" : "ReactJS",
    "imageSrc" : ReactImg
  },
  {
    "title" : "Node JS",
    "imageSrc" : NodeImg
  },
  {
    "title" : "Express",
    "imageSrc" : Express
  },
  {
    "title" : "MongoDB",
    "imageSrc" : MongoDb
  },
  {
    "title" : "AWS",
    "imageSrc" : AWSImg
  },
  {
    "title" : "Bootstrap",
    "imageSrc" : BootstrapImg
  },
  {
    "title" : "Docker",
    "imageSrc" : DockerImg
  },
  {
    "title" : "jQuery",
    "imageSrc" : JqueryImg
  },
  {
    "title" : "GIT",
    "imageSrc" : GitImg
  },
  {
    "title" : "GitHub",
    "imageSrc" : GitHubImg
  },
  {
    "title" : "Figma",
    "imageSrc" : FigmaImg
  },
  {
    "title" : "Illustrator",
    "imageSrc" : AiImg
  },
  {
    "title" : "Photoshop",
    "imageSrc" : PsImg
  },
  {
    "title" : "Canva",
    "imageSrc" : Canva
  }
];

function Tools () {
  return (
    <section className="toolsContainer" id="tools">
      <h1 className="toolsTitle">TOOLS WE USE</h1>
      <div className="toolsContent">
        <div className="toolsSkills">
          {
            toolsData.map((skill, id) => {
              return (
                <div key={id} className="toolsSkill">
                  <div className="toolsImage">
                    <img src={skill.imageSrc} alt={skill.title} />
                  </div>
                  <p>{skill.title}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
};

export default Tools;