import { TrackerItem } from './components/tracker-list/tracker-list-types';

interface loginHandleObject {
  username: string;
  id: number;
  token: string;
}

export type stateManipulationFunction = () => void;

export type loginStateManipulation = (arg: loginHandleObject) => void;

export type trackerTransportFunction = (arg: TrackerItem) => void;

export interface trackerUpdateObject {
  tracker_name: string;
  savings_goal: number;
  needs_goal: number;
  wants_goal: number;
  year: boolean;
  month: boolean;
}


export interface newGoal{
  message: string;
  tracker_id: number;
};
