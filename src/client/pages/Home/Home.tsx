import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Img from '../../media/KOLIFLUX.png';
import '../../components/Footer/footer.css';
import Chart from '../../ChartsJs/chart';
import Map from '../../ChartsJs/Map';
import ArrowUp from './ArrowUp';
import Footer from '../../components/Footer/Footer';
import CustomizedTimeline from '../../ChartsJs/Circle';
import Astronaut from './Astronaut';
import Road from './RoadMap';








const Home: React.FC = () => {

  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target as Node)
      ) {
        setShowChat(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);

  const handleClick = () => {
    setShowChat(!showChat);
  }

  return (

// style={{ backgroundImage: `url(${Img})` }}

    <div className="home">




      <video className='video-container' autoPlay loop muted>{ /*video background*/}
        <source src={require('../../globe.mp4')} type="video/mp4" />

      </video>
    {/*Svg */}
      <Astronaut />
      <div className="home__title ">
        <img src={Img} alt="logo" className='logo__home ' />
        <span>K</span>
        <span>O</span>
        <span>L</span>
        <span>I</span>
        <span>F</span>
        <span>l</span>
        <span>U</span>
        <span>X</span>

      </div>
      <button className='web3' id='button' onClick={handleClick} >


        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>Read</span>
      </button>

      {showChat && (
        <div className="chat">
          <div className="chat-bubble">
            <div className="chat-message">"Trouvez votre chez-vous avec Koliflux"</div>
          </div>
        </div>
      )}



      <div className="chart invisibleText">
        <div className="chart__title">
          <h1 >Stats des Ventes 2023</h1>
        </div>
        <Chart />
      </div>
      <div className="fade-in">
        <p className="invisibleText text-gradient">
          Koliflux est une agence immobilière spécialisée dans la vente et la location qui offre des services personnalisés
          pour répondre aux besoins uniques de chaque client. L'équipe expérimentée de l'entreprise aide les locataires à trouver leur
          logement idéal et les propriétaires à maximiser la rentabilité de leurs biens.
        </p>
        <p className="invisibleText text-gradient">
          Ils comprennent que trouver un logement peut être stressant et ont simplifié la recherche en créant une plateforme en ligne avec des
          procédures de vérification des antécédents pour s'assurer que les locataires sont fiables. L'entreprise gère également les contrats
          de location et les paiements de loyer, ainsi que la résolution des problèmes de logement
        </p>
        <p className="invisibleText text-gradient">
          De plus, elle accepte la monnaie virtuelle avec sa propre monnaie pour des transactions entre propriétaires et locataires .
          Koliflux est convaincue que les crypto-monnaies sont l'avenir et contribue dès maintenant à leur développement.
        </p>
        <p className="invisibleText text-gradient">
          En tant qu'agence immobilière, nous sommes également engagés dans la
          gestion des contrats de location et des paiements de loyer, ainsi que dans la
          résolution des problèmes de logement.
        </p>
        <p className="invisibleText text-gradient">
          Notre objectif est de créer une expérience de location agréable pour tous nos clients,
          en offrant des services professionnels et efficaces. Nous sommes là pour vous aider à
          trouver le logement de vos rêves et à gérer les détails de votre location. N'hésitez
          pas à nous contacter pour toute question ou pour discuter de vos besoins immobiliers.
        </p>

      </div>

        {/*Map */}
      <div className="invisibleText">
        <div className="title"><h2>Notre Flux</h2></div>
        <Map />
      </div>
      {/*CustomizeTimeline*/}
      <div className="circle">
        <CustomizedTimeline />
      </div>

      <ArrowUp />

{/*RoadMap */}
      <Road />
      <div className="footer">
        <Footer />
      </div>







    </div>




  );
};

window.addEventListener("scroll", smoothText);


// Function to add animation to text
function smoothText() {
  let invisibleText = document.querySelectorAll(".invisibleText");
  let scrollBody = window.scrollY;
  let count = 1;
  if (scrollBody >= 150) {
    invisibleText.forEach(element => {
      element.classList.add("animateInvisibleText");
      element.setAttribute("style", `animation-delay: ${count}s`);

      count++;
    });
  }
}










export default Home;
