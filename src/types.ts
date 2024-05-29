import { TrackerItem } from './components/tracker-list/tracker-list-types';

interface loginHandleObject {
  username: string;
  id: number;
  token: string;
}

export type stateManipulationFunction = () => void;

export type loginStateManipulation = (arg: loginHandleObject) => void;

export type trackerTransportFunction = (arg: TrackerItem) => void;
