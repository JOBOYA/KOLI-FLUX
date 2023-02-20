import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './road.css';

const Timeline = () => {
  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.reveal', { duration: 6000 });

    // define variables
    const items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    function isElementInViewport(el: Element) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []);

  return (
    <section className="timeline">
      <div className="title"> <h2>Notre Roadmap</h2></div>
      <ul>
        <li>
          <div className="reveal">
            <h3>2019</h3>
            <p>
              Création de la société Koliflux
              et lancement du projet de la<br />
              plateforme de gestion de flux<br />
              de trésorerie immobillière 🏠<br />
            </p>
          </div>
        </li>

        <li>
          <div className="reveal">
            <h3>2020</h3>
            <p>

              Commercialisation , Koliflux<br />
              a été sélectionné pour<br />
              participer au programme d'accélération<br />
              de la French Tech GitFrance 💻 <br />
            </p>
          </div>
        </li>
        <li>
          <div className="reveal">
            <h3>2020</h3>

            <p>
              Lancement du wallet
              KOLICOIN sur <br />
              android et ios 🚀 <br />
            </p>
          </div>
        </li>
        <li>
          <div className="reveal">
            <h3>2021</h3>
            <p>
              Lancement du Token KOL,<br />
              la première monnaie virtuelle<br />
              dédiée pour les<br />
              transactions immobilières 💲 <br />
            </p>
          </div>
        </li>
        <li>
          <div className="reveal">
            <h3>2023</h3>
            <p>
              Partenariat avec des<br />
              agences immobilières pour<br />
              la gestion des contrats<br />
              de location et les paiements<br />
              de loyer, ainsi que la résolution<br />
              des problèmes de logement 📢 <br />
            </p>
          </div>
        </li>
      </ul>

    </section>
  );
};

export default Timeline;