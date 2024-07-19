import React from 'react';
import { Dropdown, DropdownButton, DropdownItem, Row } from 'react-bootstrap';
import { useState } from 'react';
import { TrackerItem } from '../tracker-list/tracker-list-types';
import {
  stateManipulationFunction,
  trackerTransportFunction,
} from '../../types';

//style
import './goals-styles.css';

interface selectorProps {
  trackers: TrackerItem[] | null;
  sendSelected: trackerTransportFunction;
  setNone: stateManipulationFunction;
}

export const TrackerSelector: React.FC<selectorProps> = ({
  trackers,
  sendSelected,
  setNone,
}) => {
  const [selectedTrackerName, setSelectedTrackerName] =
    useState<string>('None Selected');

  const clickHandler = (tracker: TrackerItem): void => {
    sendSelected(tracker);
    setSelectedTrackerName(tracker.tracker_name);
  };

  const noneHandler = (): void => {
    setSelectedTrackerName('None Selected');
    setNone();
  };

  return (
    <Row>
      <div className='tracker-selector-outer-container'>
        <h2 className='drop-down-title'>Select Tracker to edit or add to:</h2>
          <DropdownButton id='drop-down-main' title={selectedTrackerName}>
            <Dropdown.Item
              className='drop-down-button'
              as='button'
              onClick={() => noneHandler()}
            >
              None
            </Dropdown.Item>
            {trackers?.map((t) => (
              <Dropdown.Item
                className='drop-down-button'
                as='button'
                onClick={() => clickHandler(t)}
              >
                {t.tracker_name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
      </div>
    </Row>
  );
};
