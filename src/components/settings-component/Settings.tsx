import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { User } from '../tracker-list/tracker-list-types';

import './settings-style.css';

interface SettingsProps{
  user: User; 
  token: string;
}


export const Settings: React.FC<SettingsProps> = ({user, token}) => {

const deleteHandle = ()=>{
  fetch(`http://localhost:8080/users/delete/${user.user_id}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data.message);
  })
}


  return (
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
            <Button variant='secondary'>Change Password</Button>
          </div>
        </div> 
      </Row>
      <Row>
        <div className='settings-page-standard-container'>
          <p className='settings-page-text'>Delete Account</p>
          <div className='settings-delete-container'>
            <p className='settings-page-text caption'>Are you sure that you would like to delete your account?</p>
            <Button variant='danger' onClick={()=>deleteHandle()}>Delete Account</Button>
          </div>
        </div> 
      </Row>
    </Col>
  );
};
