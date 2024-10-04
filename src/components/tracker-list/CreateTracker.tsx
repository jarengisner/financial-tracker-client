import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

interface CreateTrackerProps {
  show: boolean;
  yearlyCheckHandle: any;
  monthlyCheckHandle: any;
  modalCloseHandle: any;
  setNewSavingsGoal: any;
  setnewWantsGoal: any;
  setNewNeedsGoal: any;
  setNewTrackerName: any;
  isMonthly: boolean;
  isYearly: boolean;
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
  isMonthly,
  isYearly
  })=>{
  //state to hold which slide we are on
  const [showNameQ, setShowNameQ] = useState<boolean>(true);
  const [showMonthOrYear, setShowMonthOrYear] = useState<boolean>(false);
  const [showSavingsGoal, setShowSavingsGoal] = useState<boolean>(false);
  const [showWantsGoal, setShowWantsGoal] = useState<boolean>(false);
  const [showNeedsGoal, setShowNeedsGoal] = useState<boolean>(false);


  return(
    <Modal show={show}>
      <Modal.Body>
        {showNameQ &&(
          <div>
            <h1>Pick a name for your new tracker</h1>
            <input
              type="text"
              placeholder="Name"
              className="create-tracker-text-input"
              onChange={(e)=>setNewTrackerName(e.target.value)}
            />
            <Button onClick={()=>{
              setShowNameQ(false);
              setShowMonthOrYear(true);
            }}>
              Next
            </Button>
          </div>
        )}
        {showMonthOrYear &&(
          <div className="form-section">
            <h3 className="create-tracker-input-title">Yearly</h3>
            <Form.Check
              type="switch"
              id="yearly-check"
              className="create-tracker-length-switch"
              checked={isYearly}
              onChange={() => yearlyCheckHandle()}
            />
            <h3 className="create-tracker-input-title">Monthly</h3>
            <Form.Check
              type="switch"
              id="monthly-check"
              className="create-tracker-length-switch"
              checked={isMonthly}
              onChange={() => monthlyCheckHandle()}
            />
            <Button onClick={()=>{
              setShowMonthOrYear(false);
              setShowSavingsGoal(true);
            }}>
              Next
            </Button>
          </div>
        )}
        {showSavingsGoal &&(
          <div>
            <h1>Set a new goal for your savings</h1>
            <input
              type="text"
              placeholder="Name"
              className="create-tracker-text-input"
              onChange={(e)=>setNewSavingsGoal(Number(e.target.value))}
            />
            <Button onClick={()=>{
              setShowSavingsGoal(false)
              setShowWantsGoal(true);
            }
            }>
              Next
            </Button>
          </div>
        )}
        {showWantsGoal &&(
          <div>
            <h1>Set a new goal for your wants spending</h1>
            <input
              type="text"
              placeholder="Name"
              className="create-tracker-text-input"
              onChange={(e)=>setnewWantsGoal(Number(e.target.value))}
            />
            <Button onClick={()=>{
              setShowWantsGoal(false)
              setShowNeedsGoal(true)
            }}>
             Next 
            </Button>
          </div>
        )}
        {showNeedsGoal &&(
          <div>
            <h1>Set a new goal for your needs spending</h1>
            <input
              type="text"
              placeholder="Name"
              className="create-tracker-text-input"
              onChange={(e)=>setNewNeedsGoal(Number(e.target.value))}
            />
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
} 
