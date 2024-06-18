import React, { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { stateManipulationFunction, newGoal } from '../../types';

import './goals-styles.css';



interface addGoalProps {
  currentTracker: TrackerItem;
  user: listUser;
  token: string;
  show: boolean;
  toggleAddModal: stateManipulationFunction;
}

export const AddGoalModal: React.FC<addGoalProps> = ({
  currentTracker,
  user,
  token,
  show,
  toggleAddModal,
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (): void => {
    let postData:newGoal = {
      message: message,
      tracker_id: currentTracker.tracker_id,
    };


    fetch(`http://localhost:8080/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    })
    .then((res)=>res.json())
    .then((data)=>{
        //need to add a callback to refresh the goal data in goals main component here
        console.log(data);
      })
  };

  const closeHandle = (): void => {
    toggleAddModal();
  };

  return (
    <>
      {currentTracker && (
    <Modal show={show} className='add-goal-modal' size='lg' centered>
    <Modal.Header>
        <h3>{`Adding a goal to ${currentTracker.tracker_name}`}</h3>
        <button onClick={()=>closeHandle()}>Close</button>
    </Modal.Header>
    <Modal.Body>
        <input
        type="text"
        placeholder="Enter a message to write yourself a goal"
          onChange={(e)=>setMessage(e.target.value)}
          className='goal-message-input'
      />
    </Modal.Body>
    <Modal.Footer>
        <button className='add-goal-submit-button' onClick={()=>handleSubmit()}>submit</button>
    </Modal.Footer>
    </Modal>
      )}
    </>
  );
};
