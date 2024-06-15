import React, { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { stateManipulationFunction, newGoal } from '../../types';



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
    <Modal show={show}>
      <Row className='add-goal-title-section'>
        <h3>{`Adding a goal to ${currentTracker.tracker_name}`}</h3>
        <button onClick={()=>closeHandle()}>Close</button>
      </Row>
      <Row className='add-goal-input-section'>
        <input
        type="text"
        placeholder="Enter a message to write yourself a goal"
          onChange={(e)=>setMessage(e.target.value)}
      />
        <button className='add-goal-submit-button' onClick={()=>handleSubmit()}>submit</button>
      </Row>
    </Modal>
      )}
    </>
  );
};
