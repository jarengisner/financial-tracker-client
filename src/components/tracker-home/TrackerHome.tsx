import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TrackerItem } from '../tracker-list/tracker-list-types';
import { ClipLoader } from 'react-spinners';

//styles
import '../tracker-home/tracker-home-styles.css';

//types
import { Goal } from './tracker-home-types';

interface TrackerHomeProps {
  token: string;
}

export const TrackerHome: React.FC<TrackerHomeProps> = ({ token }) => {
  const { id } = useParams();

  const [currentTracker, setCurrentTracker] = useState<TrackerItem>();
  const [trackerGoals, setTrackerGoals] = useState<Array<Goal>>([]);

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

      setTrackerGoals(goalData);
    } catch (err) {
      console.log(err);
    }

    goalFetcher();
  };

  /**
   * useEffect uses the tracker id to fetch the trackers, as well as the goals
   * that are associated with the trackers so that both are ready to render
   */

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
  }, []);

  return (
    <Col md={10}>
      {currentTracker ? (
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
            {trackerGoals.length > 0 ? (
              trackerGoals.map((goal) => (
                <Card key={goal.goal_id}>
                  <p>{goal.message}</p>
                </Card>
              ))
            ) : (
              <p>No goals found for this tracker</p>
            )}
          </div>
          <div>
            <p className='year-month-caption'>Data visualization here</p>
          </div>
          <div>
            <p className='year-month-caption'>
              Here we will have a dailies button and a settings button that
              allows for editing things about the tracker in general, such as
              the name, etc
            </p>
          </div>
        </>
      ) : (
        <ClipLoader />
      )}
    </Col>
  );
};
