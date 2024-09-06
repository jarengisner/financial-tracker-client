import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

//components
import { DataVisuals } from '../data-visuals/DataVisuals';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

//styles
import '../tracker-home/tracker-home-styles.css';

//types
import { Goal } from './tracker-home-types';
import { stateManipulationFunction } from '../../types';
import { TrackerItem } from '../tracker-list/tracker-list-types';

//child component
import { TrackerSettings } from '../tracker-settings/TrackerSettings';

interface TrackerHomeProps {
  token: string;
}

export const TrackerHome: React.FC<TrackerHomeProps> = ({ token }) => {
  const { id } = useParams();

  const [currentTracker, setCurrentTracker] = useState<TrackerItem | null>();
  const [trackerGoals, setTrackerGoals] = useState<Array<Goal>>([]);
  const [settings, setSettingsStatus] = useState<boolean>(false);

  const goalFetcher = async () => {
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
        setTrackerGoals([]);
        return;
      }

      const goalData = await goalResponse.json();
      console.log(goalData);

      setTrackerGoals(goalData);
    } catch (err) {
      console.log(err);
    }
  };

  const openSettings = (): void => {
    setSettingsStatus(true);
  };

  const closeSettings = (): void => {
    setSettingsStatus(false);
  };

  useEffect(() => {
    const fetchTracker = async () => {
      try {
        const response = await fetch(`http://localhost:8080/trackers/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response) {
          throw new Error('Unsuccessful response from server');
        }

        if (response.status === 401) {
          throw new Error('Unauthorized');
        } else if (response.status === 500) {
          throw new Error('Server error please try again later');
        } else if (response.status === 404) {
          setCurrentTracker(null);
        }

        const data = await response.json();

        setCurrentTracker(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTracker();
    goalFetcher();
  }, [id, token]);

  return (
    <Col md={10} style={{overflowY: 'scroll'}}>
      {currentTracker && settings === false ? (
        <>
          <div className='tracker-home-info-container'>
            <h1 className='tracker-home-title'>
              {currentTracker.tracker_name}
            </h1>
            {currentTracker.year ? (
              <p className='year-month-caption'>Yearly Tracker</p>
            ) : (
              <p className='year-month-caption'>Monthly Tracker</p>
            )}
            <p className='year-month-caption goal-caption-title'>Your goals:</p>
          </div>
          {trackerGoals.length > 0 ? (
            trackerGoals.map((goal) => (
              <Row>
                <Col md={3}>
                  <Card key={goal.goal_id} className='tracker-home-goal-card'>
                    <p>{goal.message}</p>
                  </Card>
                </Col>
              </Row>
            ))
          ) : (
            <p>No goals found for this tracker</p>
          )}
          <div>
            <DataVisuals />
          </div>
          <Row>
            {currentTracker.savings_goal ? (
              <Col>
                <Card className='money-goals-card'>
                  <p className='year-month-title'>Current Savings Goal:</p>
                  <p>{`$ ${currentTracker.savings_goal}`}</p>
                </Card>
              </Col>
            ) : null}
            {currentTracker.wants_goal ? (
              <Col>
                <Card className='money-goals-card'>
                  <p className='year-month-title'>Current Wants Goal:</p>
                  <p>{`$ ${currentTracker.wants_goal}`}</p>
                </Card>
              </Col>
            ) : null}
            {currentTracker.needs_goal ? (
              <Col>
                <Card className='money-goals-card last-money-card'>
                  <p className='year-month-title'>Current Needs Goal:</p>
                  <p>{`$ ${currentTracker.needs_goal}`}</p>
                </Card>
              </Col>
            ) : null}
          </Row>
          <div>
            <Button className='settings-button' onClick={() => openSettings()}>
              <FontAwesomeIcon icon={faCog} className='settings-icon' />
            </Button>
          </div>
        </>
      ) : currentTracker && settings === true ? (
          <TrackerSettings
            token={token}
            tracker={currentTracker}
            closeSettings={closeSettings}
            id={currentTracker.tracker_id}
          />
      ) : (
        <ClipLoader />
      )}
    </Col>
  );
};
