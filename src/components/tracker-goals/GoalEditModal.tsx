import React, { useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';

//types imports
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { stateManipulationFunction } from '../../types';

interface editGoalProps {
  currentTracker: TrackerItem | null;
  user: listUser;
  token: string;
  show: boolean;
  toggleEditModal: stateManipulationFunction;
}

export const GoalEditModal: React.FC<editGoalProps> = ({
  currentTracker,
  user,
  token,
  show,
  toggleEditModal,
}) => {
  const [editedMessage, setEditedMessage] = useState<string>('');

  const handleClose = (): void => {
    toggleEditModal();
  };

  return (
    <>
      {currentTracker && (
        <Modal show={show}>
          <Row>
            <Col>
              <h3>{`Adding a goal to ${currentTracker.tracker_name}`}</h3>
            </Col>
            <Col>
              <button onClick={() => handleClose()}>close</button>
            </Col>
          </Row>
          <Row>
            <input
              type="text"
              placeholder="Enter a message to write yourself a goal"
              onChange={(e) => setEditedMessage(e.target.value)}
            />
          </Row>
        </Modal>
      )}
    </>
  );
};
