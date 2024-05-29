import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { TrackerItem, listUser } from '../tracker-list/tracker-list-types';
import { TrackerSelector } from './TrackerSelector';

import { useEffect } from 'react';

//style
import './goals-styles.css';

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

  //state manipulation function passed to child to set state for the rest of the component
  const sendSelected = (arg: TrackerItem): void => {
    setFocusedTracker(arg);
  };

  const setNone = (): void => {
    setFocusedTracker(null);
  };

  return (
    <Col md={10}>
      <div className='goals-title-container'>
        <h1 className='goals-title'>Goals</h1>
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
    </Col>
  );
};
