import photoProfil from './img/photoprofil.png';
import './App.css';
import Chat from './chat.js';
import React, { useState, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaNode } from "react-icons/fa";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



function App() {
  const aboutMeRef = useRef(null);
  const skillRef = useRef(null);
  const experienceRef = useRef(null);
  const scolarityRef = useRef(null);
  const contactMeRef = useRef(null);
  const [openChat, setOpenChat] = useState(false);
  const [openToolBar, setOpenToolBar] = useState(false);


  const goToRef = ref => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="App">
      <AppBar position="fixed" className="appBar" >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenToolBar(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="chat">
        <Chat openChat={openChat} setOpenChat={setOpenChat} />
      </div>
      <div className="container">

        <Drawer anchor="left" open={openToolBar} onClose={() => setOpenToolBar(false)} className="drawer">
          <Button color="inherit" onClick={() => { goToRef(skillRef); setOpenToolBar(false) }} variant="text">Compétence</Button>
          <Button color="inherit" onClick={() => { goToRef(experienceRef); setOpenToolBar(false) }} variant="text">Expérience</Button>
          <Button color="inherit" onClick={() => { goToRef(scolarityRef); setOpenToolBar(false) }} variant="text">Cursus scolaire</Button>
          <Button color="inherit" onClick={() => { goToRef(aboutMeRef); setOpenToolBar(false) }} variant="text">A propos</Button>
          <Button color="inherit" onClick={() => { goToRef(contactMeRef); setOpenToolBar(false); setOpenChat(true) }} variant="text">Contact</Button>
        </Drawer>
        <div className="row">
          <div className="tm-left-right-container">

            <div className="tm-blue-bg tm-left-column">
              <div className="profile-container">
                <img
                  src={photoProfil}
                  alt="Photo de profil"
                  className="profile-image"
                />
              </div>
              <div className="FlexBox">
                <Button color="inherit" onClick={() => goToRef(skillRef)} variant="text">Compétence</Button>
                <Button color="inherit" onClick={() => goToRef(experienceRef)} variant="text">Expérience</Button>
                <Button color="inherit" onClick={() => goToRef(scolarityRef)} variant="text">Cursus scolaire</Button>
                <Button color="inherit" onClick={() => goToRef(aboutMeRef)} variant="text">A propos</Button>
                <Button color="inherit" onClick={() => { goToRef(contactMeRef); setOpenChat(true) }} variant="text">Contact</Button>


              </div>
            </div>


            <div className="tm-right-column">
              <div className="header">
                <div className="tm-blue-text tm-welcome-title name">Gwenolé Castellier</div>
                <div className="subName">Web Developer | Mobile Developer | FullStack Developer</div>
                <div></div>
              </div>

              <div className="tm-content-div">



                <section ref={skillRef} className="tm-section competence-section">
                  <div className="row">
                    <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12 push-lg-4 push-md-5">
                      <h2 className="tm-blue-text tm-section-title tm-margin-b-45">Mes Compétences</h2>
                      <p>Développeur fullstack, je maîtrise des technologies modernes telles que <a href="https://react.dev/" target="_blank">React </a>, <a href="https://vuejs.org/" target="_blank">Vue.js</a>, <a href="https://nodejs.org/en" target="_blank">Node.js</a>, et <a href="https://reactnative.dev/" target="_blank">React Native</a> pour concevoir des solutions robustes et performantes. J'ai participé à des projets menants à la création de plateformes de gestion ainsi qu'à des solutions exploitant le <a href="https://en.wikipedia.org/wiki/Building_information_modeling" target="_blank">BIM</a>. Mes compétences couvrent l'ensemble du processus, de l'architecture frontend à l'implémentation backend.</p>
                      <p>Spécialisé dans l'approche mobile-first et le design responsive, j'utilise des librairies comme <a href="https://mui.com/material-ui/" target="_blank">Materiel-UI</a> pour m'assurer que les interfaces s'adaptent parfaitement à tous les écrans. Mon engagement envers la qualité de code se reflète dans l'intégration de <a href="https://jestjs.io/" target="_blank">Jest</a> pour les tests unitaires et <a href="https://eslint.org/" target="_blank">ESLint</a> pour maintenir des normes élevées.</p>
                      <p>Habitué à évoluer dans des environnements Agile, je m'appuie sur des outils comme <a href="https://www.atlassian.com/fr/software/jira" target="_blank">Jira</a> pour gérer les sprints, fournir un feedback rapide et pratiquer l'intégration continue.</p>
                    </div>

                    <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 pull-lg-8 pull-md-7 tm-about-img-container">
                      <div className="cadre">
                        <FaHtml5 className="item-cadre html5Item" onClick={() => window.open("https://en.wikipedia.org/wiki/HTML5", "_blank")} />
                        <FaCss3Alt className="item-cadre css3Item" onClick={() => window.open("https://en.wikipedia.org/wiki/CSS#CSS_3", "_blank")} />
                        <SiJavascript className="item-cadre jsItem" onClick={() => window.open("https://en.wikipedia.org/wiki/JavaScript", "_blank")} />
                        <SiTypescript className="item-cadre tsItem" onClick={() => window.open("https://en.wikipedia.org/wiki/TypeScript", "_blank")} />
                        <FaReact className="item-cadre reactItem" onClick={() => window.open("https://react.dev/", "_blank")} />
                        <FaVuejs className="item-cadre vuejsItem" onClick={() => window.open("https://vuejs.org/", "_blank")} />
                        <FaNode className="item-cadre nodeItem" onClick={() => window.open("https://nodejs.org/en", "_blank")} />
                      </div>
                    </div>
                  </div>
                </section>
                <section ref={experienceRef} className="tm-section">


                  <h2 className="tm-blue-text tm-section-title tm-margin-b-30 left-text">Mes Expériences</h2>
                  <div className="line tm-margin-b-30" ></div>
                  <div >
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">Rénovation de maisons anciennes</h3>
                      <div className="tm-blue-text since left-text" >
                        Juin 2022 - Aujourd'hui
                      </div>
                    </div>
                    <p className=" left-text ">Rénovation complète de maisons anciennes : de la conception des plans (modélisation 3D, réalisation du permis de construire) à l'exécution des travaux (maçonnerie, terrassement, couverture, menuiserie, électricité, plomberie, isolation, etc.).</p>
                  </div>
                  <div>
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">Développeur web et mobile</h3>
                      <div className="tm-blue-text since left-text" >
                        Septembre 2018 - Juin 2022
                      </div>
                    </div>
                    <h5 className=" left-text entrepriseName" onClick={() => window.open("https://www.etiskapp.com/", "_blank")}>ETISKAPP</h5>
                    <p className=" left-text ">Réalisation et conception de sites et d’applications web : de l’analyse des besoins du client (rédaction du cahier des charges, proposition de solutions techniques, gestion du planning) au développement (méthodologie AGILE, utilisation de sprints, tests et validations), jusqu’à la livraison du projet (avec possibilité d’assurer une maintenance corrective ou évolutive).</p>
                  </div>
                  <div>
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">Game Master / Créateur et réalisateur de salle</h3>
                      <div className="tm-blue-text since left-text" >
                        Mai 2017 - Février 2018
                      </div>
                    </div>
                    <h5 className=" left-text entrepriseName" onClick={() => window.open("https://escapeyourselfrennes.fr/", "_blank")}>ESCAPE YOURSELF - RENNES</h5>
                    <p className=" left-text ">Création et réalisation de décors et de mécanismes pour salles d’escape game, notamment à l’aide de cartes programmables type Arduino. Accueil des joueurs, supervision de leur expérience (déroulement du jeu, suivi en temps réel, etc.).</p>
                  </div>
                  <div>
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">Autres expériences</h3>
                      <div className="tm-blue-text since left-text" >
                        Decembre 2016 - Avril 2017
                      </div>
                    </div>
                    <p className=" left-text ">Réalisation et pose de menuiseries aluminium, dépannage automobile, gestion de chambres d’hôtes,  inventaires en magasin, ainsi que service et entretien en hôtellerie</p>
                  </div>

                </section>

                <section ref={scolarityRef} className="tm-section">


                  <h2 className="tm-blue-text tm-section-title tm-margin-b-30 left-text">Cursus scolaire</h2>
                  <div className="line tm-margin-b-30" ></div>
                  <div>
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">Développeur web</h3>
                      <div className="tm-blue-text since left-text" >
                        Février 2018 - Juillet 2018
                      </div>
                    </div>
                    <h5 className=" left-text entrepriseName" onClick={() => window.open("https://www.wildcodeschool.com/", "_blank")}>WILD CODE SCHOOL</h5>
                    <p className=" left-text "> Réalisation et conception de site et d'application pour le web</p>
                  </div>
                  <div>
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">1er année en licence de droit</h3>
                      <div className="tm-blue-text since left-text" >
                        2016 - 2017
                      </div>
                    </div>
                    <h5 className=" left-text entrepriseName">FACULTÉ DE DROIT</h5>
                    <p className=" left-text ">  6 Rue Léonard de Vinci, Université du Maine, 53000 Laval</p>
                  </div>
                  <div>
                    <div className='justify-between'>
                      <h3 className="tm-blue-text left-text">Baccalauréat série science et technologie de l'industrie et du développement durable</h3>
                      <div className="tm-blue-text since left-text" >
                        2014 - 2016
                      </div>
                    </div>
                    <h5 className=" left-text entrepriseName">LYCÉE JEANNE D'ARC</h5>
                    <p className=" left-text "> 13 place de la République, 35500 Vitré <br></br>
                      Option Système Informatique et Numérique</p>
                  </div>


                </section>

                <section ref={aboutMeRef} className="tm-section aboutMe">
                  <h2 className="tm-blue-text tm-section-title tm-margin-b-30 left-text">A propos de moi</h2>
                  <div className="line tm-margin-b-30" ></div>
                  <div className='textContainer'>
                    <div className='textFlexContainer'>
                      <p>Développeur Web et Mobile avec 6 ans d'expérience, j'ai acquis une solide expertise dans le développement web et mobile, notamment avec des frameworks comme React, React Native, Vue, et Node.js. Je maîtrise également des outils tels que MUI, Jest, ESLint et Jira, et j'ai une bonne expérience de la gestion de projets en utilisant la méthodologie agile. En parallèle, je m'intéresse beaucoup au BIM, qui permet de combiner la technologie avec l'architecture et la construction.</p>
                      <p>En dehors du développement, je suis un grand passionné de voyages, ce qui m’a permis de découvrir différentes cultures et de m'adapter à divers environnements. Je pratique aussi le bricolage, ce qui nourrit mon côté créatif et ma capacité à résoudre des problèmes techniques de manière pratique. J’ai également une passion pour les drones, que ce soit pour des projets personnels ou professionnels, et pour la lecture, principalement de romans fantastiques, qui m’inspirent et enrichissent mon imagination.</p>
                    </div>
                  </div>
                </section>


              </div>
              <footer ref={contactMeRef} style={{ textAlign: "center", padding: "20px 0", backgroundColor: "#f8f8f8", fontSize: "16px" }}>
                <p style={{ margin: "5px 0" }}>
                  <FaPhoneAlt size={20} />{" "}
                  <a href="tel:+33770265970" style={{ textDecoration: "none", color: "#000" }}>07 70 26 59 70</a> |
                  <FaEnvelope size={20} style={{ marginLeft: "10px" }} />{" "}
                  <a href="mailto:castellier.gwenole@gmail.com" style={{ textDecoration: "none", color: "#000" }}>
                    castellier.gwenole@gmail.com
                  </a>
                </p>
                <div style={{ marginTop: "10px" }}>
                  <a
                    href="https://www.linkedin.com/in/gwenole-castellier/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0 10px", textDecoration: "none" }}
                  >
                    <FaLinkedin size={30} />
                  </a>
                  <a
                    href="https://github.com/CastellierGwenole"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0 10px", textDecoration: "none" }}
                  >
                    <FaGithub size={30} />
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
