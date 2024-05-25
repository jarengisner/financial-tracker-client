import React, { useEffect, useState } from 'react';

//styles
import '../tracker-settings/tracker-settings-style.css';
import { TrackerItem } from '../tracker-list/tracker-list-types';
import { Button, Form } from 'react-bootstrap';

interface TrackerEditingProps {
  tracker: TrackerItem;
}

export const TrackerEdit: React.FC<TrackerEditingProps> = ({ tracker }) => {
  const [newTrackerName, setNewTrackerName] = useState<string>('');
  const [newSavingsGoal, setNewSavingsGoal] = useState<number>(0);
  const [newNeedsGoal, setNewNeedsGoal] = useState<number>(0);
  const [newWantsGoal, setNewWantsGoal] = useState<number>(0);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const yearlyCheckHandle = (): void => {
    setIsYearly(true);
    setIsMonthly(false);
  };

  const monthlyCheckHandler = (): void => {
    setIsMonthly(true);
    setIsYearly(false);
  };

  return (
    <div>
      <h2 className='tracker-edit-label'>Tracker Name</h2>
      <input
        type='text'
        placeholder={tracker.tracker_name}
        id='tracker-name-id'
        className='tracker-edit-input'
      />
      <h2 className='tracker-edit-label'>Savings Goal</h2>
      <input
        type='number'
        placeholder='Enter your new Savings Goal'
        id='tracker-savings-goal-id'
        className='tracker-edit-input'
      />
      <h2 className='tracker-edit-label'>Wants Goal</h2>
      <input
        type='number'
        placeholder='Enter your new Wants Goal'
        id='tracker-wants-goal-id'
        className='tracker-edit-input'
      />
      <h2 className='tracker-edit-label'>Needs Goal</h2>
      <input
        type='number'
        placeholder='Enter your new Needs Goal'
        id='tracker-needs-goal-id'
        className='tracker-edit-input'
      />
      <h2 className='tracker-edit-label'>Yearly</h2>
      <Form.Check
        type='switch'
        checked={isYearly}
        onChange={yearlyCheckHandle}
        id='year-switch'
        className='tracker-edit-switch'
      />
      <h2 className='tracker-edit-label'>Monthly</h2>
      <Form.Check
        type='switch'
        checked={isMonthly}
        onChange={monthlyCheckHandler}
        id='month-switch'
        className='tracker-edit-switch'
      />
      <Button className='submit-edits-button'>Submit</Button>
    </div>
  );
};
