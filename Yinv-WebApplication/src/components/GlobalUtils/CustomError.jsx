import React from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomError = (props) => {
  return (
    <Alert variant="danger" className='text-center' >
      {props.text}
    </Alert>
  );
};

export default CustomError;