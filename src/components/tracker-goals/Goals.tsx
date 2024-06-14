import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { TrackerSelector } from './TrackerSelector';

import { useEffect } from 'react';

//style
import './goals-styles.css';
import { Goal } from '../tracker-home/tracker-home-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { GoalEditModal } from './GoalEditModal';

interface GoalProps {
  user: listUser;
  token: string;
}

export const Goals: React.FC<GoalProps> = ({ user, token }) => {
  const [trackers, setTrackers] = useState<TrackerItem[]>([]);

  //Tracker selected by dropdown component
  const [focusedTracker, setFocusedTracker] = useState<TrackerItem | null>(
    null
  );

  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);

  //state for showing different modals depending on which action is selected on the page
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const userId: number = user.id;
    fetch(`http://localhost:8080/trackers/${userId}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Data from Goals page' + data);
        setTrackers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, token]);

  //Fetches goals of whatever tracker is focused in the selector
  const goalFetcher = async (id: number) => {
    try {
      const goalResponse = await fetch(
        `http://localhost:8080/goals/${id}/all`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (goalResponse.status === 204) {
        setActiveGoals([]);
        return;
      }

      const goalData = await goalResponse.json();
      console.log(goalData);

      setActiveGoals(goalData);
    } catch (err) {
      console.log(err);
    }
  };

  //state manipulation function passed to child to set state for the rest of the component
  const sendSelected = (arg: TrackerItem): void => {
    setFocusedTracker(arg);
    goalFetcher(arg.tracker_id);
  };

  const setNone = (): void => {
    setFocusedTracker(null);
    setActiveGoals([]);
  };

  //state manipulation to show modals or close modals
  const toggleAddModal = (): void => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = (): void => {
    setShowEditModal(!showEditModal);
  };

  const toggleDeleteModal = (): void => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <>
      {showEditModal && (
        <GoalEditModal
          currentTracker={focusedTracker}
          user={user}
          token={token}
          show={showEditModal}
          toggleEditModal={toggleEditModal}
        />
      )}
      <Col md={10}>
        <div className="goals-title-container">
          <h1 className="goals-title">Goals</h1>
        </div>
        <div>
          {trackers ? (
            <TrackerSelector
              trackers={trackers}
              sendSelected={sendSelected}
              setNone={setNone}
            />
          ) : (
            <h1>Not loaded, put spinner</h1>
          )}
        </div>
        <div>
          {trackers && activeGoals.length > 0
            ? activeGoals.map((goal) => (
                <Row key={goal.goal_id} className="goal-card-row">
                  <Card className="goals-page-card">
                    <div className="goals-card-message-container">
                      <p className="goal-message">{goal.message}</p>
                    </div>
                    <div className="goals-card-button-container">
                      <button
                        className="goal-card-button"
                        onClick={() => toggleEditModal()}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="goal-card-button">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </Card>
                </Row>
              ))
            : null}
        </div>
      </Col>
    </>
  );
};
