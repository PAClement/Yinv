import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import CustomLoader from '../../GlobalUtils/CustomLoader';
import CustomError from '../../GlobalUtils/CustomError';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ListGestion = (props) => {

  /**
   * COMPOSANT LIST - Ce componsant contient les formulaires d'edition et de suppression des catégory ou des marques
   * contenu dans 1 modal qui affiche un contenu différent selon le bouton pressé
   */

  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");

  const [updateText, setUpdateText] = useState("");
  const [error, setError] = useState(false);

  const [updateData, setUpdateData] = useState(false);

  const [specList, setSpecList] = useState([]);
  const [loader, setLoader] = useState(true);

  const [actionLoader, setActionLoader] = useState(false);

  const [specRequete, setSpecRequete] = useState(props.specRequete);


  useEffect(() => {

    if (specRequete !== props.specRequete) {
      //Condition pour mettre le loader que dans la spec change entre category et marque

      setLoader(true);
    }

    setSpecRequete(props.specRequete);

    axios.get(`https://localhost:8000/api/get${props.specRequete}`).then((res) => {

      setSpecList(res.data);
      setLoader(false);
    })
  }, [props.specRequete, updateData, props.reloadForm])

  const updateSubmit = (e) => {

    setActionLoader(true);

    e.preventDefault();

    axios.put(`https://localhost:8000/api/update${props.specRequete}`, {
      id: show,
      name: updateText

    }).then((res) => {

      if (res.data === "not found") {

        setActionLoader(false);
        setError(true);
      } else {

        setUpdateData(!updateData);
        setActionLoader(false);
        setError(false);
        handleClose();
      }

    })
  }

  const deleteSubmit = () => {

    setActionLoader(true);

    axios.delete(`https://localhost:8000/api/delete${props.specRequete}/${show}`).then((res) => {

      if (res.data === "inventory_found") {

        setActionLoader(false);
        setError(true);
      } else {

        setActionLoader(false);
        setError(false);
        setUpdateData(!updateData);
        handleClose();
      }

    }).catch(error => {

      console.log(error);
    })
  }

  const handleOpen = (name, id) => {

    setShow(id);
    setModalName(name);
  }

  const handleClose = () => {

    setShow(false);
    setError(false);
  }
  return (
    <div>
      {loader ? (

        <div className='d-flex justify-content-center text-center'>
          <CustomLoader text={`Chargement des ${props.specRequete === "Category" ? 'Categories' : 'Marques'}...`} />
        </div>
      ) : (
        <>
          <div className='mx-5 d-flex justify-content-center'>
            <Card className='shadow rounded border-0 bodyCard' style={{ width: '50rem' }}>
              <Card.Body>
                {specList.map((target) => (
                  <div key={target.id} >
                    <div className="d-flex justify-content-between mt-2">
                      <p className='fs-5'>{target.name}</p>
                      <div>
                        <Button variant="primary" className='me-5' onClick={() => handleOpen("update", target.id)}><FontAwesomeIcon icon={faPenToSquare} /> Modifier</Button>
                        <Button variant="danger" onClick={() => handleOpen("delete", target.id)}><FontAwesomeIcon icon={faTrash} /> Supprimer</Button>
                      </div>
                    </div>
                    <Modal show={show === target.id} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>{target.name}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {modalName === "update" ? (
                          <>
                            {error &&
                              <CustomError text="Une erreur est survenue" />
                            }
                            {actionLoader ? (
                              <CustomLoader text={`Modification de la ${props.specRequete === "Category" ? 'categorie' : 'marque'}...`} />
                            ) : (
                              <Form onSubmit={updateSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                  <Form.Label>Modification</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={target.name}
                                    onChange={(e) => setUpdateText(e.target.value)}
                                    autoFocus
                                    required
                                  />
                                </Form.Group>
                                <Button variant="primary" type='submit'>
                                  Appliquer Modification
                                </Button>
                              </Form>
                            )}
                          </>
                        ) : (
                          <>
                            {error &&
                              <CustomError text={`Cette ${props.specRequete === "Category" ? 'categorie' : 'marque'} est utilisée par 1 ou plusieurs produit, impossible de la supprimer pour le moment.`} />
                            }
                            {actionLoader ? (

                              <CustomLoader text={`Suppression de la ${props.specRequete === "Category" ? 'categorie' : 'marque'}...`} />
                            ) : (
                              <>
                                Êtes-vous sur de vouloir supprimer cette catégorie ?
                                <div>
                                  <Button variant="danger" className='mt-3' onClick={deleteSubmit}>
                                    Supprimer
                                  </Button>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Fermer
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        </>
      )
      }
    </div >
  );
};

export default ListGestion;