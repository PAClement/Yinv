import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const ReturnButton = () => {

  const navigation = useNavigate();

  return (
    <Button onClick={() => navigation('/')} className="fs-6 text-white">
      <FontAwesomeIcon icon={faArrowLeft} className="me-3" />Revenir au menu
    </Button>
  );
};

export default ReturnButton;