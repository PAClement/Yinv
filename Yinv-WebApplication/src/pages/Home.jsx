import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faList, faPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import { QRCodeCanvas } from 'qrcode.react';

import CardHome from '../components/HomePage/CardHome';

const Home = () => {

  const compagny = localStorage.getItem('userToken');

  const card = [{
    link: "/product",
    logo: faList,
    title: "Liste Produit",
    subTitle: "Voir la liste de vos produits"
  }, {
    link: "/newProduct",
    logo: faPlus,
    title: "Nouveau Produit",
    subTitle: "Ajouter un nouveau produit"
  }, {
    link: "/gestion",
    logo: faWrench,
    title: "Gestion",
    subTitle: "Gestion des spécificités"
  }]

  return (
    <div className="homeContainer">
      {card.map(target => (

        <CardHome key={target.link} link={target.link} logo={target.logo} title={target.title} subTitle={target.subTitle} />
      ))}
      <div>
        <QRCodeCanvas value={compagny} size={200} />
        <h4 className='mt-5'>Scanner ce QR-Code afin de vous connecter à votre application</h4>
      </div>
    </div>
  );
};

export default Home;