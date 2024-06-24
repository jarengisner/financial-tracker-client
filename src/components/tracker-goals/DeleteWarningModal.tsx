import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { goalRefreshFunction, stateManipulationFunction } from '../../types';
import { listUser, TrackerItem } from '../tracker-list/tracker-list-types';

//style
import './goals-styles.css'


interface DeleteProps{
  showDeleteModal: boolean;
  toggleShowDelete: stateManipulationFunction;
  refreshGoals: goalRefreshFunction;
  currentTracker: TrackerItem;
};


export const DeleteWarningModal: React.FC<DeleteProps> = ({showDeleteModal, toggleShowDelete, refreshGoals, currentTracker}) => {

  const deleteHandler=():void =>{
    //placeholder for the moment
    //
    //refreshGoals(currentTracker.tracker_id)
    //
    //the above will refresh after delete
  };


  return (
    <Modal show={showDeleteModal} size='lg' centered>
    <Modal.Body> 
    <div className='delete-modal-exit-button-container'>
      <button className='close-button'>
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
    <div className='delete-goal-message-container'>
      <p className='delete-goal-message'>Are you sure that you want to delete this goal?</p>
      <Button variant='danger' onClick={()=>deleteHandler()}>Delete</Button>
    </div>
    </Modal.Body>
</Modal>
  );
};
