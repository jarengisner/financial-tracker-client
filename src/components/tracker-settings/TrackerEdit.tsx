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
  const [isYearly, setIsYEarly] = useState<boolean>(false);

  return (
    <div>
      <h2>Tracker Name</h2>
      <input type='text' placeholder={tracker.tracker_name} />
      <h2>Savings Goal</h2>
      <input type='number' placeholder='Enter your new Savings Goal' />
      <h2>Wants Goal</h2>
      <input type='number' placeholder='Enter your new Wants Goal' />
      <h2>Needs Goal</h2>
      <input type='number' placeholder='Enter your new Needs Goal' />
      <h2>Monthly or Yearly</h2>
      <Form.Check type='switch' />
    </div>
  );
};
