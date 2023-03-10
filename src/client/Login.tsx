import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//login component 
const Login: React.FC = () => {

//state for email and password 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<undefined | string | null>();
  const navigate = useNavigate();

  const Auth = (e: any) => {
    e.preventDefault();
    try {
      axios.post('https://koli-flux.herokuapp.com/login', {

        email: email,
        password: password,

      })

        .then((response) => {
          navigate('/Dashboard');
          if (response.data.msg === 'Login Success') {




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




  return (

    <div className="contain-box">

      <div className="login-box">
        <FaUserAlt style={{ backgroundColor: 'white', borderRadius: '50%' }} size={50} />

        <h2>Login</h2>

        <form onSubmit={Auth}>

          <div className="alert alert-secondary " role="alert" style={{ fontSize: '0.9rem' }}>
            {msg}
          </div>

          <div className="user-box">
            <input
              type="text"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              placeholder=''
              required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <label>Mot de Passe</label>
          </div>

          <button className="btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Connexion
          </button>

          <div className="remember">
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className="remember">
              Remember
            </label>
          </div>
          {typeof msg === "string" && <div className="error">{msg}</div>}

          <div className="Register">
            <button className="btn" >
              <Link to="/Register">Inscription</Link></button>
          </div>


        </form>

      </div>


    </div>
  );
};

export default Login;

