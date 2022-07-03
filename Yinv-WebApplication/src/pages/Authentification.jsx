import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import CustomLoader from '../components/GlobalUtils/CustomLoader';
import CustomError from '../components/GlobalUtils/CustomError';

const Authentification = () => {

  const navigation = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();
    setError(false);
    setLoader(true);

    if (userEmail !== "" && userPassword !== "") {

      axios.post("https://localhost:8000/api/getOneUser", {
        email: userEmail,
        password: userPassword
      }).then((res) => {

        if (res.data === "Email ou mot de passe incorret") {

          setLoader(false);
          setError(true);
        } else {

          localStorage.setItem('userToken', res.data.token);
          navigation('/');
        }
      })
    }
  }

  return (
    <div className='authContainer'>
      <div className='bg-light py-4 px-3 rounded shadow p-3 mb-5 bg-body' style={{ width: '25rem' }}>
        {error &&

          <CustomError text="Email ou mot de passe incorrect" />
        }
        <h1 className='text-center mb-5 text-primary'>Se connecter</h1>
        {loader ? (
          <div className='d-flex justify-content-center text-center'>
            <CustomLoader text="Connexion en cours..." />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control onChange={(e) => setUserEmail(e.target.value)} type="email" placeholder="Email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Control onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder="Mot de passe" required />
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button className='mt-3' variant="primary" type="submit" style={{ width: '15rem' }}>
                Connexion
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div >
  );
};

export default Authentification;