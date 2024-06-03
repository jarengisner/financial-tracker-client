import React, { useEffect, useState } from 'react';

//styles
import '../tracker-settings/tracker-settings-style.css';
import { TrackerItem } from '../tracker-list/tracker-list-types';
import { Button, Form } from 'react-bootstrap';
import { trackerUpdateObject } from '../../types';

interface TrackerEditingProps {
  tracker: TrackerItem;
  token: string;
}

export const TrackerEdit: React.FC<TrackerEditingProps> = ({
  tracker,
  token,
}) => {
  const [newTrackerName, setNewTrackerName] = useState<string>(
    tracker.tracker_name
  );
  const [newSavingsGoal, setNewSavingsGoal] = useState<number>(
    tracker.savings_goal
  );
  const [newNeedsGoal, setNewNeedsGoal] = useState<number>(tracker.needs_goal);
  const [newWantsGoal, setNewWantsGoal] = useState<number>(tracker.wants_goal);
  const [isMonthly, setIsMonthly] = useState<boolean>(tracker.month);
  const [isYearly, setIsYearly] = useState<boolean>(tracker.year);
  const [message, setMessage] = useState<string>('');

  const yearlyCheckHandle = (): void => {
    setIsYearly(true);
    setIsMonthly(false);
  };

  const monthlyCheckHandler = (): void => {
    setIsMonthly(true);
    setIsYearly(false);
  };

  const submitHandle = (): void => {
    const id = tracker.tracker_id;

    const data: trackerUpdateObject = {
      tracker_name: newTrackerName,
      savings_goal: newSavingsGoal,
      needs_goal: newNeedsGoal,
      wants_goal: newWantsGoal,
      year: isYearly,
      month: isMonthly,
    };

    fetch(`http://localhost:8080/trackers/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setMessage('Successfully Edited Tracker');
      })
      .catch((e) => {
        console.log(e);
        setMessage('Failed to alter Tracker, please try again later');
      });
  };

  return (
    <div>
      <h2 className='tracker-edit-label'>Tracker Name</h2>
      <input
        type='text'
        placeholder={tracker.tracker_name}
        id='tracker-name-id'
        className='tracker-edit-input'
        onChange={(e) => setNewTrackerName(e.target.value)}
      />
      <h2 className='tracker-edit-label'>Savings Goal</h2>
      <input
        type='number'
        placeholder='Enter your new Savings Goal'
        id='tracker-savings-goal-id'
        className='tracker-edit-input'
        onChange={(e) => setNewSavingsGoal(Number(e.target.value))}
      />
      <h2 className='tracker-edit-label'>Wants Goal</h2>
      <input
        type='number'
        placeholder='Enter your new Wants Goal'
        id='tracker-wants-goal-id'
        className='tracker-edit-input'
        onChange={(e) => setNewWantsGoal(Number(e.target.value))}
      />
      <h2 className='tracker-edit-label'>Needs Goal</h2>
      <input
        type='number'
        placeholder='Enter your new Needs Goal'
        id='tracker-needs-goal-id'
        className='tracker-edit-input'
        onChange={(e) => setNewNeedsGoal(Number(e.target.value))}
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
      <Button className='submit-edits-button' onClick={submitHandle}>
        Submit
      </Button>
    </div>
  );
};
