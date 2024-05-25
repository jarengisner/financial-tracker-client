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
import { TrackerEdit } from './TrackerEdit';

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
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  const backHandler = (): void => {
    closeSettings();
  };

  const openEditing = (): void => {
    setEditorOpen(true);
  };

  const closeEditing = (): void => {
    setEditorOpen(false);
  };

  useEffect(() => {
    setThisTracker(tracker);
  }, [tracker]);

  return (
    <Col>
      <div>
        <div className='back-button-container'>
          <Button
            className='settings-back-button'
            onClick={() => backHandler()}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </Button>
        </div>
        <div className='settings-title-info-outer'>
          <div className='settings-title-info-inner'>
            <h1 className='settings-title'>Tracker Settings</h1>
            {thisTracker ? (
              <h2 className='settings-title tracker-name-title'>
                {thisTracker.tracker_name}
              </h2>
            ) : null}
          </div>
        </div>
        <div className='settings-edit-tracker'>
          {editorOpen ? (
            <div className='tracker-open-container'>
              <div className='edit-tracker-container-open'>
                <p className='edit-tracker-text'>Close Editor?</p>
                <Button
                  className='edit-tracker-button'
                  onClick={() => closeEditing()}
                >
                  Close Editor
                </Button>
              </div>
              <TrackerEdit tracker={tracker} />
            </div>
          ) : (
            <div className='edit-tracker-container'>
              <p className='edit-tracker-text'>Edit your Tracker?</p>
              <Button
                className='edit-tracker-button'
                onClick={() => openEditing()}
              >
                Edit Tracker
              </Button>
            </div>
          )}
        </div>
        {thisTracker ? (
          <div className='delete-button-container'>
            <p className='delete-text'>
              Delete this Tracker?{' '}
              <span className='delete-warning-message'>
                Warning: this is a permanent action
              </span>
            </p>
            <Button variant='danger' className='delete-button'>
              Delete Tracker
            </Button>
          </div>
        ) : (
          <p>No Tracker Found</p>
        )}
      </div>
    </Col>
  );
};
