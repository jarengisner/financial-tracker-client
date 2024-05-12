import React, { useEffect } from 'react';
import { useState } from 'react';
import { TrackerItem } from './tracker-list-types';

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
        usersTrackers.map((tracker) => <h1>{tracker.tracker_name}</h1>)
      ) : (
        <p style={{ color: 'white' }}>No trackers have been found</p>
      )}
    </div>
  );
};
