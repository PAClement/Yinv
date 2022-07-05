import React from 'react';

const CustomeLoader = (props) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <div className="lds-facebook"><div></div><div></div><div></div></div>
      <p className='fs-4 mt-3 text-secondary'>{props.text}</p>
    </div>
  );
};

export default CustomeLoader;