import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import ReturnButton from '../components/GlobalUtils/ReturnButton';
import ListProduct from '../components/ProductPage/ListProduct';
import CustomLoader from '../components/GlobalUtils/CustomLoader';
import Button from 'react-bootstrap/Button';


const Product = () => {

  const [loader, setLoader] = useState(true);

  const [dataProduct, setDataProduct] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const [dataCategory, setDataCategory] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  useEffect(() => {

    getAllProduct();

    axios.get("https://localhost:8000/api/getCategory").then((res) => {

      setDataCategory(res.data);

    })
    axios.get("https://localhost:8000/api/getBrand").then((res) => {

      setDataBrand(res.data);

    })
  }, [])

  const getAllProduct = () => {

    axios.get("https://localhost:8000/api/getProduct").then((res) => {

      setLoader(false);
      setDataProduct(res.data);
      setDataFilter(res.data);

    })
  }

  const productFilter = () => {

    let tab = dataProduct.filter(target => {

      if (target.category.name !== categoryFilter && categoryFilter !== "") {

        return false;
      } else if (target.brand.name !== brandFilter && brandFilter !== "") {

        return false;
      }

      return true;
    })

    setDataFilter(tab);
  }

  const resetFilter = () => {

    setCategoryFilter("");
    setBrandFilter("");

    setDataFilter(dataProduct);

  }

  return (
    <div className='container mt-5'>
      <ReturnButton />
      {loader ? (

        <CustomLoader text="Chargement de votre inventaire" />
      ) : (
        <>
          <p className='mt-3 fs-5'>{dataFilter.length}{dataFilter.length > 1 ? " résultats trouvés" : " résultat trouvé"}</p>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='me-3 d-flex justify-content-between flex-wrap' style={{ width: '70%' }}>
              {dataFilter.length === 0 ? (

                <p className='text-danger'>Aucun article n'a été trouvé</p>
              ) : (

                <ListProduct reloadProduct={getAllProduct} category={dataCategory} brand={dataBrand} data={dataFilter} />
              )}
            </div>
            <div className='shadow rounded bg-white py-3' style={{ width: '30%' }}>
              <h2 className='text-center'>Filtres</h2>
              <div className='mx-3 mt-3'>
                <Form>
                  <Form.Label className='mt-3'>Categorie :</Form.Label>
                  <Form.Select id="category" onChange={(e) => setCategoryFilter(e.target.value)} aria-label="select Category">
                    <option value="">Par défault</option>
                    {dataCategory.map((target) => (
                      <option key={target.id}>{target.name}</option>
                    ))}
                  </Form.Select>
                  <Form.Label className='mt-3' >Marque :</Form.Label>
                  <Form.Select id="brand" onChange={(e) => setBrandFilter(e.target.value)} aria-label="select brand">
                    <option value="">Par défault</option>
                    {dataBrand.map((target) => (
                      <option key={target.id} value={target.name}>{target.name}</option>
                    ))}
                  </Form.Select>
                  <div className='d-flex justify-content-between mt-3 '>

                    <Button variant="primary" onClick={productFilter}>Appliquer filtres</Button>
                    <Button variant="danger" type='reset' onClick={resetFilter}>Reinitialiser filtres</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;