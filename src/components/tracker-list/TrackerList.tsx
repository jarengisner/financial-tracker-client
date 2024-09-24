import React, { useEffect } from 'react';
import { useState } from 'react';
import { User, listUser, newTracker } from './tracker-list-types';
import { Card, Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { TrackerItem } from './tracker-list-types';

//stylesheet
import '../tracker-list/tracker-list-styles.css';
import { Link } from 'react-router-dom';
import { CreateTracker } from './CreateTracker';

interface TrackerComponentProps {
  user: listUser;
  token: string;
}

export const TrackerList: React.FC<TrackerComponentProps> = ({
  user,
  token,
}) => {
  const [usersTrackers, setUsersTrackers] = useState<TrackerItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [newTrackerName, setNewTrackerName] = useState<string>('');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [newSavingsGoal, setNewSavingsGoal] = useState<number>(0);
  const [newWantsGoal, setNewWantsGoal] = useState<number>(0);
  const [newNeedsGoal, setNewNeedsGoal] = useState<number>(0);

  //************************************************************************************************************************************************************************************ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId: number = user.id;
        const response = await fetch(
          `http://localhost:8080/trackers/${userId}/all`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response) {
          throw new Error('Unsuccessful response from server');
        }

        if (response.status === 204) {
          setUsersTrackers([]);
          return;
        }

        if (response.status === 401) {
          console.log('caught the error');
        }

        const data = await response.json();
        console.log(data);

        setUsersTrackers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, token]);

  const modalOpenHandler = (): void => {
    setShowModal(true);
  };

  const modalCloseHandler = (): void => {
    setShowModal(false);
  };

  const yearlyCheckHandle = (): void => {
    setIsYearly(true);
    setIsMonthly(false);
  };

  const monthlyCheckHandle = (): void => {
    setIsMonthly(true);
    setIsYearly(false);
  };

  const submitNewTrackerHandle = (): void => {
    const newTrackerData: newTracker = {
      user_id: user.id,
      tracker_name: newTrackerName,
      savings_goal: newSavingsGoal,
      wants_goal: newWantsGoal,
      needs_goal: newNeedsGoal,
      year: isYearly,
      month: isMonthly,
    };
    fetch(`http://localhost:8080/trackers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTrackerData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersTrackers((previousTrackers) => [...previousTrackers, data]);
        modalCloseHandler();
      });
  };

  return (
    <>
      <CreateTracker
        show={showModal}
        yearlyCheckHandle={yearlyCheckHandle}
        monthlyCheckHandle={monthlyCheckHandle}
        modalCloseHandle={modalCloseHandler}
        setNewSavingsGoal={setNewSavingsGoal}
        setnewWantsGoal={setNewWantsGoal}
        setNewNeedsGoal={setNewNeedsGoal}
        isMonthly={isMonthly}
        isYearly={isYearly}
        setNewTrackerName={setNewTrackerName}
        />
      <Modal
        show={showModal}
        className="create-tracker-modal"
        size="lg"
        centered
      >
        <div className="create-modal-header-container">
          <h1 className="create-tracker-modal-title">Add Tracker</h1>
          <button
            onClick={() => modalCloseHandler()}
            className="create-tracker-close-button"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="create-tracker-form-container">
          <div className="form-section name-section">
            <h3 className="create-tracker-input-title">Tracker Name</h3>
            <input
              type="text"
              placeholder="Name"
              className="create-tracker-text-input"
              onChange={(e) => setNewTrackerName(e.target.value)}
            />
          </div>
          <div className="form-section">
            <h3 className="create-tracker-input-title">Yearly</h3>
            <Form.Check
              type="switch"
              id="yearly-check"
              className="create-tracker-length-switch"
              checked={isYearly}
              onChange={() => yearlyCheckHandle()}
            />
            <h3 className="create-tracker-input-title">Monthly</h3>
            <Form.Check
              type="switch"
              id="monthly-check"
              className="create-tracker-length-switch"
              checked={isMonthly}
              onChange={() => monthlyCheckHandle()}
            />
          </div>
          <div className="form-section last-section">
            <h3 className="create-tracker-input-title">Savings Goal</h3>
            <p className="create-tracker-explanation-text">
              Your savings goal is simple. It is purely how much you want to
              save, nothing more.
            </p>
            <input
              type="number"
              placeholder="Enter a number"
              className="create-tracker-text-input"
              onChange={(e) => setNewSavingsGoal(Number(e.target.value))}
            />
            <h3 className="create-tracker-input-title">Wants Goal</h3>
            <p className="create-tracker-explanation-text">
              Your wants goal is the maximum amount of money you want to spend
              on things that you WANT within this time period.
            </p>
            <input
              type="number"
              placeholder="Enter a number"
              className="create-tracker-text-input"
              onChange={(e) => {
                setNewWantsGoal(Number(e.target.value));
              }}
            />
            <h3 className="create-tracker-input-title">Needs Goal</h3>
            <p className="create-tracker-explanation-text">
              Your needs goal is going to be your spending goal for things that
              you NEED to spend money on. For this category, think groceries,
              gas, or other necessities that you have some sort of control over
              the total.
            </p>
            <input
              type="number"
              placeholder="Enter a number"
              className="create-tracker-text-input bottom-input"
              onChange={(e) => setNewNeedsGoal(Number(e.target.value))}
            />
          </div>
        </div>
        <Button
          className="create-tracker-submit-button"
          onClick={() => submitNewTrackerHandle()}
        >
          Submit
        </Button>
      </Modal>
      <div className="list-container">
        <Card className="tracker-card add-tracker-card">
          <div className="add-tracker-inner-container">
            <button
              className="add-tracker-button"
              onClick={() => modalOpenHandler()}
            >
              <FontAwesomeIcon icon={faPlus} className="add-tracker-icon" />
            </button>
          </div>
        </Card>
        {usersTrackers.length > 0 ? (
          usersTrackers.map((tracker) => (
            <Card className="tracker-card" key={tracker.tracker_id}>
              <div className="tracker-card-info-container">
                <div className="tracker-title-container">
                  <Card.Title className="tracker-card-title">
                    {tracker.tracker_name}
                  </Card.Title>
                  {tracker.year ? (
                    <p className="year-or-month">Yearly</p>
                  ) : (
                    <p className="year-or-month">Monthly</p>
                  )}
                </div>
                <div className="enter-tracker-view-container">
                  <Link to={`trackers/${tracker.tracker_id}`}>
                    <button className="enter-tracker-view-button">
                      <FontAwesomeIcon
                        icon={faChartSimple}
                        className="enter-tracker-view-icon"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p style={{ color: 'white' }}>No trackers have been found</p>
        )}
      </div>
    </>
  );
};
