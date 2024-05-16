import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TrackerItem } from '../tracker-list/tracker-list-types';

//styles
import '../tracker-home/tracker-home-styles.css';

interface trackerHomeProps {
  tracker: any;
}

export const TrackerHome: React.FC<trackerHomeProps> = ({ tracker }) => {
  const { id } = useParams();

  const [currentTracker, setCurrentTracker] = useState<TrackerItem>();

  useEffect(() => {
    setCurrentTracker(tracker);
  }, [tracker, id]);

  return (
    <Col md={10}>
      {tracker ? (
        <div className='main-content-container'>
          <h1 className='tracker-home-title'>{currentTracker?.tracker_name}</h1>
          <p>Data visualization next</p>
        </div>
      ) : null}
    </Col>
  );
};
