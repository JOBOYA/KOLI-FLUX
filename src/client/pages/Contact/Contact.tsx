import React, { useState } from 'react';
import './contact.css';
import Footer from '../../components/Footer/Footer';
import Dark from '../../components/DarkStyle/dark';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


//form
const ContactForm: React.FC = () => {

  //Variables
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  //send form
  const Form = (e: any) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:5000/form', {
        name: name,
        email: email,
        message: message,
      })
        .then((response) => {
          console.log(response);
          confirmAlert({
            title: 'Message envoyé',
            message: 'Votre message a été envoyé avec succès !',
            buttons: [
              {
                label: 'OK',
                onClick: () => {
                  window.location.href = '/Home';
                },
              },
            ],
          });
        })
        .catch((error) => {
          console.log(error);
          confirmAlert({
            title: 'Erreur',
            message: 'Votre message n\'a pas pu être envoyé !',
            buttons: [
              {
                label: 'OK',
              },
            ],
          });
        });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <form className="contact-form" onSubmit={Form}>
      <div className="form-group">
        <label htmlFor="name" className='place' placeholder="Votre nom ici">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
      </div>
      <div className="form-group">
        <label htmlFor="email" className='place'>Email :</label>
        <input

          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
      </div>
      <div className="form-group">
        <label className='place' htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required />
      </div>
      <button id='btn' type="submit">Envoyer</button>
      <Footer />
      <Dark active={true} />
    </form>

  );
};


export default ContactForm;
