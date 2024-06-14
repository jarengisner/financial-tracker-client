import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { stateManipulationFunction } from '../../types';

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
    /**
     *
     * placeholder
     */
  };

  const closeHandle = (): void => {
    toggleAddModal();
  };

  return (
    <Modal show={show}>
      <h3>{`Adding a goal to ${currentTracker.tracker_name}`}</h3>
      <input
        type="text"
        placeholder="Enter a message to write yourself a goal"
      />
    </Modal>
  );
};
