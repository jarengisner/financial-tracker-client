import React, { useEffect } from 'react';
import { useState } from 'react';
import { TrackerItem } from './tracker-list-types';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

//stylesheet
import '../tracker-list/tracker-list-styles.css';
import { Link } from 'react-router-dom';

interface TrackerComponentProps {
  trackers: TrackerItem[];
}

export const TrackerList: React.FC<TrackerComponentProps> = ({ trackers }) => {
  const [usersTrackers, setUsersTrackers] = useState<TrackerItem[]>([]);

  useEffect(() => {
    setUsersTrackers(trackers);
  }, [trackers]);

  return (
    <div>
      {trackers.length > 0 ? (
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
