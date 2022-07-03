import React, { useState } from 'react';
import FormGestion from './utils/FormGestion';
import ListGestion from './utils/ListGestion';

const GestionBody = (props) => {

  const [addFormState, setAddFormState] = useState(false);

  /**
   * GestionBody componsant - Permet d'afficher deux componsant l'un pour le formulaire d'ajout et l'autre la liste des catégories et marque ainsi
   * que les intéractions possible.
   */

  const addForm = () => {

    setAddFormState(!addFormState);
  }

  return (
    <div>
      <p className='text-center my-5 fs-2'>Liste des {props.specDisplay}s</p>
      <FormGestion formSpec={props.specDisplay} specRequete={props.specRequete} realoadList={addForm} />
      <ListGestion specRequete={props.specRequete} reloadForm={addFormState} />
    </div>
  );
};

export default GestionBody;