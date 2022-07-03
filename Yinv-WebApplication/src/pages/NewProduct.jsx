import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CustomError from '../components/GlobalUtils/CustomError';
import CustomLoader from '../components/GlobalUtils/CustomLoader';
import ReturnButton from '../components/GlobalUtils/ReturnButton';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const NewProduct = () => {

  const [dataNewProduct, setDataNewProduct] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [specs, setSpecs] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [loader, setLoader] = useState(false);


  useEffect(() => {

    setLoader(true);

    axios.get('https://localhost:8000/api/getNewProduct').then((res) => {

      setDataNewProduct(res.data);
      setLoader(false);
    })

    axios.get("https://localhost:8000/api/getCategory").then((res) => {

      setDataCategory(res.data);

    })
    axios.get("https://localhost:8000/api/getBrand").then((res) => {

      setDataBrand(res.data);

    })

  }, [])

  const valueAccordion = (id) => {

    dataNewProduct.forEach(target => {

      if (target.id === id) {

        setName(target.name);
        setStock(target.stock);
      }
    })

    setError(false);
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    if (category === "" || brand === "") {

      setError(true);
      setErrorValue("Catégorie ou marque manquante");
      return;
    }

    setError(false);
  }

  const openDeleteModal = (id) => {

    setShowDelete(id);

  }

  const closeDeleteModal = () => {

    setShowDelete(false);
  }

  return (
    <div className='container mt-5'>
      <ReturnButton />
      <h3 className='my-5'>{dataNewProduct.length} {dataNewProduct.length > 1 ? "Nouveaux produits enregistrés" : "Nouveau produit enregistré"} </h3>
      {loader ? (

        <CustomLoader text="Chargement des nouveaux produits" />
      ) : (
        <Accordion>
          {dataNewProduct.map((target) => (
            <React.Fragment key={target.id} >
              <Accordion.Item onClick={() => valueAccordion(target.id)} className='mb-3 shadow rounded' eventKey={target.id}>
                <Accordion.Header>
                  <span className='fs-5 fw-semibold'>{target.name}</span>
                </Accordion.Header>
                <Accordion.Body>
                  {error && (

                    <CustomError text={errorValue} />
                  )}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 d-flex justify-content-between flex-wrap">
                      <Form.Control style={{ width: '34%' }} type="text" onChange={(e) => setName(e.target.value)} value={name === undefined ? "" : name} placeholder="Nom du produit" required />
                      <Form.Control style={{ width: '14%' }} type="number" onChange={(e) => setStock(e.target.value)} value={stock === undefined ? "" : stock} placeholder="Quantité" required />
                      <Form.Select style={{ width: '24%' }} defaultValue="" onChange={(e) => setCategory(e.target.value)} aria-label="select category">
                        <option value="" disabled>Par défault</option>
                        {dataCategory.map((target) => (
                          <option key={target.id} value={target.name}>{target.name}</option>
                        ))}
                      </Form.Select>

                      <Form.Select style={{ width: '24%' }} defaultValue="" onChange={(e) => setBrand(e.target.value)} aria-label="select brand">
                        <option value="" disabled>Par défault</option>
                        {dataBrand.map((target) => (
                          <option key={target.id} value={target.name}>{target.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                      <Form.Control as="textarea" onChange={(e) => setSpecs(e.target.value)} placeholder='Information sur le produit' rows={3} required />
                    </Form.Group>
                    <Button variant="primary" className='me-2' type="submit">
                      <FontAwesomeIcon icon={faPlus} /> Ajouter Nouveau Produit
                    </Button>
                    <Button variant="danger" onClick={() => openDeleteModal(target.id)}>
                      <FontAwesomeIcon icon={faTrash} />  Supprimer ce nouveau produit
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Modal show={showDelete === target.id} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Supprimer {target.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sur de vouloir supprimer ce nouveau produit ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger">
                    Supprimer
                  </Button>
                  <Button variant="secondary" onClick={closeDeleteModal}>
                    Fermer
                  </Button>
                </Modal.Footer>
              </Modal>
            </React.Fragment>
          ))}
        </Accordion>
      )}

    </div>
  );
};

export default NewProduct;