import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import { stateManipulationFunction } from '../../types';


interface DeleteProps{
  showDeleteModal: boolean;
  toggleShowDelete: stateManipulationFunction;
};


export const DeleteWarningModal: React.FC<DeleteProps> = ({showDeleteModal, toggleShowDelete}) => {
  return (
    <Modal show={showDeleteModal}>
      <Row>
        <p>Delete tag title</p>
        <button onClick={()=>toggleShowDelete()}>Close</button>
      </Row>
      <Row>
        <p>Warning here</p>
      </Row>
    </Modal>
  );
};
