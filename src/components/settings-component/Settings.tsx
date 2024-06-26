import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { User } from '../tracker-list/tracker-list-types';
import { DeleteConfirmation } from './DeleteConfirmation';
import { PasswordChange } from './PasswordChange';

import './settings-style.css';

interface SettingsProps{
  user: User; 
  token: string;
}


export const Settings: React.FC<SettingsProps> = ({user, token}) => {

  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
  const [showChangePass, setShowChangePass] = useState<boolean>(false);

  const toggleDeleteWarning = ():void =>{
    setShowDeleteWarning(!showDeleteWarning);
  };

  const toggleChangePass = ():void =>{
    setShowChangePass(!showChangePass);
  };

  return (
    <>
    {showDeleteWarning && (
      <DeleteConfirmation user={user} token={token} showDeleteWarning={showDeleteWarning}
      toggleDeleteWarning={toggleDeleteWarning}
      />
    )}
    {
      showChangePass && (
        <PasswordChange />
      )
    }
    <Col md={10}>
    <Row>
      <div className='settings-title-container'>
        <h1>Settings</h1>
      </div>
    </Row>
      <Row>
        <div className='settings-page-standard-container'>
          <p className='settings-page-text'>Change Password</p>
          <div className='settings-password-container'>
            <p className='settings-page-text caption'>Are you sure that you want to change your password?</p>
            <Button variant='secondary' onClick={()=>toggleChangePass()}>Change Password</Button>
          </div>
        </div> 
      </Row>
      <Row>
        <div className='settings-page-standard-container'>
          <p className='settings-page-text'>Delete Account</p>
          <div className='settings-delete-container'>
            <p className='settings-page-text caption'>Are you sure that you would like to delete your account?</p>
            <Button variant='danger' onClick={()=>toggleDeleteWarning()}>Delete Account</Button>
          </div>
        </div> 
      </Row>
    </Col>
    </>
  );
};
