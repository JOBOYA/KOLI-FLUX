import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Svg from "../logo.svg";


//navbar
const Navbar: React.FC = () => {


//navbar style
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid ">
        <div className="navbar-brand text-white text-uppercase ">

          <img src={Svg} alt="logo" className="logo" />
        </div>
        <button
          className="navbar-toggler bg-white opacity-50"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active text-white text-uppercase" aria-current="page" to="/Home">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white text-uppercase" to="/Search">
                Annonces
              </Link>
            </li>
            <Link className="nav-link active text-white text-uppercase" aria-current="page" to="/Login">
              Login
            </Link>
            <li className="nav-item">
              <Link className="nav-link text-white text-uppercase" to="/Contact">
                Contact
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>


  );
};









export default Navbar;


