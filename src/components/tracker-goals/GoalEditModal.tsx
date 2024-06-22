import React, { useState } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

//types imports
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { goalRefreshFunction, newGoal, stateManipulationFunction } from '../../types';

import './goals-styles.css'

interface editGoalProps {
  currentTracker: TrackerItem;
  user: listUser;
  token: string;
  show: boolean;
  toggleEditModal: stateManipulationFunction;
  refreshGoals: goalRefreshFunction; 
  currentlyEditing: number | null;
  clearCurrentlyEditing: stateManipulationFunction;
}

export const GoalEditModal: React.FC<editGoalProps> = ({
  currentTracker,
  user,
  token,
  show,
  toggleEditModal,
  refreshGoals,
  currentlyEditing,
  clearCurrentlyEditing,
}) => {
  const [editedMessage, setEditedMessage] = useState<string>('');

  const handleClose = (): void => {
    clearCurrentlyEditing()
    toggleEditModal();
  };

  const submitHandle = ():void =>{

    const goalData:newGoal  = {
      message: editedMessage,
      tracker_id: currentTracker.tracker_id,
    };

    if(currentlyEditing){
      fetch(`http://localhost:8080/goals/edit/${currentlyEditing}`, {
        method: 'PUT',
      headers: {
        'Centent-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(goalData),
      })
      .then((res)=>res.json())
      .then((data)=>{
        //do something with the data we recieve
        console.log(data);
      })
      .catch((e)=>{
        console.log(e);
      })
    }
  }

  return (
    <>
      {currentTracker && (
        <Modal show={show} size='xl' centered>
        <Modal.Header>
            <h3>{`Editing goal in: ${currentTracker.tracker_name}`}</h3>
            <button onClick={() => handleClose()} className='close-button'>
            <FontAwesomeIcon icon={faX} />
            </button>
        </Modal.Header>
        <Modal.Body>
          <div className='edit-modal-input-container'>
            <textarea placeholder='Enter new message'
            onChange={(e)=>setEditedMessage(e.target.value)} 
            className='edit-modal-input'/>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className='edit-modal-submit-button' onClick={()=>submitHandle()}>Submit</Button>
        </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
