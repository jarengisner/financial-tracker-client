import React, { useEffect } from 'react';
import { useState } from 'react';
import { User, listUser } from './tracker-list-types';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TrackerItem } from './tracker-list-types';

//stylesheet
import '../tracker-list/tracker-list-styles.css';
import { Link } from 'react-router-dom';

interface TrackerComponentProps {
  user: listUser;
  token: string;
}

export const TrackerList: React.FC<TrackerComponentProps> = ({
  user,
  token,
}) => {
  const [usersTrackers, setUsersTrackers] = useState<TrackerItem[]>([]);

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

  return (
    <div className='list-container'>
      <Card className='tracker-card add-tracker-card'>
        <div className='add-tracker-inner-container'>
          <button className='add-tracker-button'>
            <FontAwesomeIcon icon={faPlus} className='add-tracker-icon' />
          </button>
        </div>
      </Card>
      {usersTrackers.length > 0 ? (
        usersTrackers.map((tracker) => (
          <Card className='tracker-card' key={tracker.tracker_id}>
            <div className='tracker-card-info-container'>
              <div className='tracker-title-container'>
                <Card.Title className='tracker-card-title'>
                  {tracker.tracker_name}
                </Card.Title>
                {tracker.year ? (
                  <p className='year-or-month'>Yearly</p>
                ) : (
                  <p className='year-or-month'>Monthly</p>
                )}
              </div>
              <div className='enter-tracker-view-container'>
                <Link to={`trackers/${tracker.tracker_id}`}>
                  <button className='enter-tracker-view-button'>
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      className='enter-tracker-view-icon'
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
  );
};
