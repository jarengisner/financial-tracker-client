import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { goalRefreshFunction, stateManipulationFunction } from '../../types';
import { listUser, TrackerItem } from '../tracker-list/tracker-list-types';

//style
import './goals-styles.css'


interface DeleteProps{
  showDeleteModal: boolean;
  toggleShowDelete: stateManipulationFunction;
  refreshGoals: goalRefreshFunction;
  currentTracker: TrackerItem;
  currentlyDeleting: number | null;
  token: string;
};


export const DeleteWarningModal: React.FC<DeleteProps> = ({
  showDeleteModal,
  toggleShowDelete,
  refreshGoals,
  currentTracker,
  currentlyDeleting,
  token
}) => {

  const deleteHandler=():void =>{
    fetch(`http://localhost:8080/goal/delete/${currentlyDeleting}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then((res)=>res.json())
    .then((message)=>{
      //do something with message
      console.log(message.message);
      refreshGoals(currentTracker.tracker_id);
      toggleShowDelete();
    })
    .catch((e)=>{
      console.log(e);
    })
  };


  return (
    <Modal show={showDeleteModal} size='lg' centered>
    <Modal.Body>
      <Row>
        <Col md={8}style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className='delete-goal-message-container'>
            <p className='delete-goal-message'>Are you sure that you want to delete this goal?</p>
          </div>
        </Col>
        <Col md={4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className='delete-goal-button-container'>
            <Button variant='danger' onClick={()=>deleteHandler()} className='delete-goal-button'>Delete</Button>
            <Button className='cancel-delete-button' onClick={()=>toggleShowDelete()} variant='secondary'>Cancel</Button>
          </div>
        </Col>
      </Row>
    </Modal.Body>
</Modal>
  );
};
