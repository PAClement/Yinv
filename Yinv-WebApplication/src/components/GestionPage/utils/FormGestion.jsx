import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CustomError from '../../GlobalUtils/CustomError';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import CustomLoader from '../../GlobalUtils/CustomLoader';

const FormGestion = (props) => {

  /**
   * COMPONSANT FORMULAIRE - Permet d'ajouter une catégorie ou un article à la bdd 
   * contient un formulaire dans une modal et un bouton pour l'activer grâce au state show
   */

  const [nameSpec, setNameSpec] = useState("");
  const [show, setShow] = useState(false);

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    setLoader(true);

    axios.post(`https://localhost:8000/api/add${props.specRequete}`, {

      name: nameSpec
    }).then((res) => {

      if (res.data === "exist") {

        setLoader(false);
        setError(true);
      } else {

        setError(false);
        setLoader(false);
        handleClose();
        props.realoadList();
      }
    })
  }

  const handleClose = () => setShow(false);

  return (
    <>
      <div className='d-flex justify-content-center mb-3'>
        <Button variant="primary" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faCirclePlus} /> Ajouter une {props.formSpec === "categorie" ? "Categorie" : "Marque"}
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loader ? (
            <CustomLoader text="Ajout en cours..." />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formSpec">
                {error &&
                  <CustomError text={`${props.formSpec === "categorie" ? "Categorie" : "Marque"} déjà existante !`} />
                }
                <Form.Label>Entrer le nom :</Form.Label >
                <Form.Control onChange={(e) => setNameSpec(e.target.value)} type="text" placeholder={`Nom de la ${props.formSpec}`} required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Ajouter {props.formSpec}
              </Button>
            </Form>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal >

    </>
  );
};

export default FormGestion;