import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { stateManipulationFunction } from '../../types';
import { listUser, User } from "../tracker-list/tracker-list-types";

interface PassChangeProps{
  toggleChangePass: stateManipulationFunction;
  showChangePass: boolean;
  user: listUser; 
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

    fetch(`http://localhost:8080/users/update/password/${user.id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedUser),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log({
        id: data.id,
        username: data.username,
        message: "Successfully updated password"
      });

      localStorage.clear();
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
    })
  };


  return(
    <Modal show={showChangePass} centered>
      <Modal.Header>
        <div className='pass-change-header'>
          <h2>Change Password</h2>
          <p style={{color: '#dc3545'}}>You will be logged out after changing your password</p>
        </div>
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
          <Button variant='primary' style={{marginRight: '1%'}} onClick={()=>passwordChangeHandler()}>
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
