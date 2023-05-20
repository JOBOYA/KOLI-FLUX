import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Svg from "../media/logo.svg";
import Modal from 'react-bootstrap/Modal';



//navbar

const Navbars: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="navbar-brand text-white text-uppercase">
          <img src={Svg} alt="logo" className="logo" />
        </div>
        <button
          className="navbar-toggler bg-white opacity-50"
          type="button"
          onClick={handleShow}
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
        <Modal show={show} onHide={handleClose} style={{opacity: "0.5"}}>

          <Modal.Header closeButton>
            <Modal.Title>Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <ul className="list-unstyled">
              <li>
                <Link onClick={handleClose} className="text-decoration-none text-uppercase" style={{color: "black", fontWeight:'bold'}} to="/Home">
                  🏠Accueil
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} className="text-decoration-none text-uppercase" style={{color: "black", fontWeight:'bold'}} to="/Search">
                📢Annonces
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} className="text-decoration-none text-uppercase" style={{color: "black", fontWeight:'bold'}} to="/Login">
                  🙋‍♂️Login
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} className="text-decoration-none text-uppercase" style={{color: "black", fontWeight:'bold'}} to="/Contact">
                ✍️Contact
                </Link>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
      </div>
    </nav>
  );
};










export default Navbars;


