import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";

interface CreateTrackerProps {
  show: boolean;
  yearlyCheckHandle: any;
  monthlyCheckHandle: any;
  modalCloseHandle: any;
  setNewSavingsGoal: any;
  setnewWantsGoal: any;
  setNewNeedsGoal: any;
  setNewTrackerName: any;
};

export const CreateTracker: React.FC<CreateTrackerProps> = 
  ({
  show,
  yearlyCheckHandle,
  monthlyCheckHandle,
  modalCloseHandle,
  setNewSavingsGoal,
  setnewWantsGoal,
  setNewNeedsGoal,
  setNewTrackerName,
  })=>{
  //state to hold which slide we are on
  const [showNameQ, setShowNameQ] = useState<boolean>();
  const [showMonthOrYear, setShowMonthOrYear] = useState<boolean>();
  const [showSavingsGoal, setShowSavingsGoal] = useState<boolean>();
  const [showWantsGoal, setShowWantsGoal] = useState<boolean>();
  const [showNeedsGoal, setShowNeedsGoal] = useState<boolean>();


  return(
    <Modal show={show}>
      {showNameQ &&(
        <div>
          <h1>Pick a name for your new tracker</h1>
          <input
            type="text"
            placeholder="Name"
            className="create-tracker-text-input"
            onChange={(e)=>setNewTrackerName(e.target.value)}
          />
        </div>
      )}
      {showMonthOrYear &&(
        <div></div>
      )}
      {showSavingsGoal &&(
        <div>
          <h1>Set a new goal for your savings</h1>
          <input
            type="text"
            placeholder="Name"
            className="create-tracker-text-input"
            onChange={}
          />
        </div>
      )}
      {showWantsGoal &&(
        <div>
          <h1>Set a new goal for your savings</h1>
          <input
            type="text"
            placeholder="Name"
            className="create-tracker-text-input"
            onChange={}
          />
        </div>
      )}
      {showNeedsGoal &&(
        <div>
          <h1>Set a new goal for your savings</h1>
          <input
            type="text"
            placeholder="Name"
            className="create-tracker-text-input"
            onChange={}
          />
        </div>
      )}
    </Modal>
  )
} 
