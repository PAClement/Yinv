import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const ListProduct = (props) => {

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  /**
   * State formulaire
   */

  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [specs, setSpecs] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const handleOpen = (id) => {

    setShow(id);

    props.data.forEach((target) => {

      if (target.id === id) {

        setName(target.name);
        setStock(target.stock);
        setSpecs(target.specs);
        setCategory(target.category.name);
        setBrand(target.brand.name);
      }
    })
  }

  const handleClose = () => {

    setShow(false);
    setEdit(false);
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.put("https://localhost:8000/api/updateProduct", {

      id: show,
      name,
      stock,
      specs,
      category,
      brand

    }).then((res) => {

      if (res.data === "ok") {

        props.reloadProduct();
        handleClose();
      }

    })
  }

  const openDeleteModal = () => {

    setShowDelete(show);

  }

  const closeDeleteModal = () => {

    setShowDelete(false);
  }

  const productSuppression = () => {

    axios.delete(`https://localhost:8000/api/deleteProduct/${show}`).then(res => {

      if (res.data === "ok") {

        props.reloadProduct();
        handleClose();
      }
    })
  }

  return (
    <>
      {props.data.map((target) => (
        <React.Fragment key={target.id}>
          <Card className='shadow rounded mb-3 cardProduct' onClick={() => handleOpen(target.id)} style={{ cursor: 'pointer', width: '18rem' }}>
            <Card.Body>
              <h5 className='mb-3'>{target.name}</h5>
              <p>Stock : {target.stock}</p>
            </Card.Body>
            <Card.Footer className='text-white border-top-0'>
              <div className='d-flex'>
                <span type="button" className="btn btn-primary me-1">{target.category.name}</span>
                <span type="button" className="btn btn-secondary">{target.brand.name}</span>
              </div>
            </Card.Footer>
          </Card>

          <Modal show={show === target.id} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Informations produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {edit ? (

                <Form onSubmit={handleSubmit}>
                  <div className='d-flex justify-content-between'>
                    <Form.Group className="mb-3 me-2" controlId="formBasicNom" style={{ width: '75%' }}>
                      <Form.Label className='fw-bolder'>Nom du produit</Form.Label>
                      <Form.Control type="text" defaultValue={target.name} onChange={(e) => setName(e.target.value)} placeholder="Nom du produit" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicStock" style={{ width: '25%' }}>
                      <Form.Label className='fw-bolder'>Stock</Form.Label>
                      <Form.Control type="number" defaultValue={target.stock} onChange={(e) => setStock(Number.parseInt(e.target.value))} placeholder="Stock" required />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicSpecs">
                    <Form.Label className='fw-bolder'>Informations produit</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={target.specs} onChange={(e) => setSpecs(e.target.value)} placeholder="Informations produit" required />
                  </Form.Group>
                  <div className='d-flex justify-content-between mb-5'>
                    <Form.Select defaultValue={target.category.name} onChange={(e) => setCategory(e.target.value)} className='me-2' aria-label="category" required>
                      {props.category.map((targetCategory) => (

                        <option key={targetCategory.id} className={targetCategory.name === target.category.name ? "bg-secondary text-white" : ""}>{targetCategory.name}</option>
                      ))}
                    </Form.Select>
                    <Form.Select defaultValue={target.brand.name} onChange={(e) => setBrand(e.target.value)} aria-label="brand" required>
                      {props.brand.map((targetBrand) => (

                        <option key={targetBrand.id} className={targetBrand.name === target.brand.name ? "bg-secondary text-white" : ""}>{targetBrand.name}</option>
                      ))}
                    </Form.Select>
                  </div>
                  <Button variant="primary" type="submit">
                    Éditer les informations
                  </Button>
                </Form>
              ) : (
                <>
                  <div className='d-flex justify-content-between'>
                    <p className='fs-5 p-2'>{target.name}</p>
                    <p className='fs-5 p-2'>{target.stock}</p>
                  </div>
                  <p className='p-2 fs-5 border-top border-bottom'>{target.specs === null ? <span>Aucunes informtations suplémentaires enregistrées</span> : `${target.specs}`}</p>
                  <div className='d-flex justify-content-between'>
                    <p className='fs-5 p-2'>{target.category.name}</p>
                    <p className='fs-5 p-2'>{target.brand.name}</p>
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={openDeleteModal}>
                Supprimer ce produit
              </Button>
              <Button variant="primary" onClick={() => setEdit(!edit)}>
                {edit === true ? "Quitter le mode édition" : "Mode édition"}
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal className='modalSuppr' show={showDelete === target.id} onHide={closeDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Supprimer {target.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Êtes-vous sur de vouloir supprimer ce produit ?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={productSuppression}>
                Supprimer
              </Button>
              <Button variant="secondary" onClick={closeDeleteModal}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      ))}
    </>
  );
};

export default ListProduct;