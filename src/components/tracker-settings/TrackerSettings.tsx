import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

//types
import { TrackerItem } from '../tracker-list/tracker-list-types';
import { stateManipulationFunction } from '../../types';

//style
import '../tracker-settings/tracker-settings-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface TrackerSettingsProps {
  token: string;
  tracker: TrackerItem;
  closeSettings: stateManipulationFunction;
  id: number;
}

export const TrackerSettings: React.FC<TrackerSettingsProps> = ({
  token,
  tracker,
  closeSettings,
  id,
}) => {
  const [thisTracker, setThisTracker] = useState<TrackerItem | null>();

  useEffect(() => {
    setThisTracker(tracker);
  }, [tracker]);

  return (
    <Col>
      <div>
        <Button>
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </Button>
        <h1>Tracker Settings</h1>
        {thisTracker ? <h2>{thisTracker.tracker_name}</h2> : null}
        {thisTracker ? (
          <div className='delete-button-container'>
            <p className='delete-text'>
              Delete this Tracker?{' '}
              <span className='delete-warning-message'>
                Warning this is a permanent action
              </span>
            </p>
            <Button variant='danger'>Delete Tracker</Button>
          </div>
        ) : (
          <p>No Tracker Found</p>
        )}
      </div>
    </Col>
  );
};
