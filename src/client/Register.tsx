import './login.css';
import { FaUserAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';




//register component 
const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');
  const [msg, setMsg] = useState<undefined | string | null>();
  const navigate = useNavigate();
  
  //register function
  const Register = (e: any) => {
    e.preventDefault();
    try {
      axios.post('https://koli-flux.herokuapp.com/users', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      }).then((response) => {
        if (response.data.msg === 'Register Success') {
          navigate('/');
        } else {
          setMsg(response.data.msg);
        }
      }).catch((error) => {
        setMsg(error.response.data.msg);
      });
    } catch (error) {
      console.log(error);
    }
  };

//register form 
  return (
    <div className="contain-box">
      <div className="login-box">
        <FaUserAlt style={{ backgroundColor: 'white', borderRadius: '50%' }} size={50} />
        {msg && (
          <div className="alert alert-secondary " role="alert" style={{ fontSize: '0.9rem' }}>
            {msg} !!🎉
          </div>
        )}

        <h2>Inscription</h2>

        <form onSubmit={Register}>

          <div className="user-box">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Nom</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Mot de Passe</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
            <label>Confirmer Mot de Passe</label>

          </div>
          <button className="btn" >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Inscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
