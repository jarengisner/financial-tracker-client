interface loginHandleObject {
  username: string;
  id: number;
  token: string;
}

export type stateManipulationFunction = () => void;

export type loginStateManipulation = (arg: loginHandleObject) => void;
