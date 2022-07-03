import React, { useState } from 'react';

import GestionBody from '../components/GestionPage/GestionBody';
import Button from 'react-bootstrap/Button';
import ReturnButton from '../components/GlobalUtils/ReturnButton';


const Gestion = () => {

  const [spec, setSpec] = useState("category");

  return (
    <div className="container mt-5">

      <ReturnButton />

      <div className='d-flex justify-content-center'>
        <Button variant="primary" onClick={() => setSpec("category")} className={`shadow rounded p-5 fs-5 mx-3 border-3 ${spec === "category" ? "bg-primary" : "bg-white text-secondary"}`}>
          Categorie
        </Button>
        <Button onClick={() => setSpec("marque")} className={`shadow rounded p-5 fs-5 mx-3 border-3 ${spec === "marque" ? "bg-primary" : "bg-white text-secondary"}`}>
          Marque
        </Button>
      </div>
      {
        spec === "category" ? (

          <GestionBody specDisplay="categorie" specRequete="Category" />
        ) : (

          <GestionBody specDisplay="marque" specRequete="Brand" />
        )
      }
    </div >
  );
};

export default Gestion;