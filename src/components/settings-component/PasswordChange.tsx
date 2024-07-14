import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { stateManipulationFunction } from '../../types';
import { User } from "../tracker-list/tracker-list-types";

interface PassChangeProps{
  toggleChangePass: stateManipulationFunction;
  showChangePass: boolean;
  user: User; 
  token: string;
};

export const PasswordChange: React.FC<PassChangeProps> = ({toggleChangePass, showChangePass, user, token})=>{
  const [newPassword, setNewPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

//check that our endpoint works with a random account before testing in application
  const passwordChangeHandler = ()=>{

    const updatedUser = {
      username: user.username,
      password: newPassword
    };

    fetch(`http://localhost:8080/users/update/password/${user.user_id}`, {
      headers: {
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedUser),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    })
  };


  return(
    <Modal show={showChangePass} centered>
      <Modal.Header>
        <h2>Change Password</h2>
      </Modal.Header>
      <Modal.Body>
      <div className='password-change-container'>
        <p>
          Please enter your new password:
        </p>
        <input type='text' className='password-change-input' onChange={(e)=>setNewPassword(e.target.value)}/>
        <p style={{marginTop: '1%'}}>
          Please confirm your new password:
        </p>
        <input type='text' className='password-change-input' onChange={(e)=>setCheckPassword(e.target.value)}/>
        <div className='pass-change-buttons'>
          <Button variant='primary' style={{marginRight: '1%'}}>
            Confirm
          </Button>
          <Button variant='secondary' onClick={toggleChangePass} style={{marginLeft: '1%'}}>
            Cancel
          </Button>
        </div>
      </div>
      </Modal.Body>
    </Modal>
  )
}
