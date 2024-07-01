import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { stateManipulationFunction } from '../../types';
import { listUser, User } from '../tracker-list/tracker-list-types';

interface DeleteConfirmationProps{
  user: User;
  token: String;
  showDeleteWarning: boolean;
  toggleDeleteWarning: stateManipulationFunction;
};

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  user, token, showDeleteWarning
})=>{


//currently not working, believe that a string is being sent as a user_id
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



  return(
    <Modal size='lg' centered show={showDeleteWarning}>
      <Modal.Body>
        <Row>
          <Col md={8}>
            <p>
              Delete Account? 
              <span>
                This is a permanent action
              </span>
            </p>
          </Col>
          <Col md={4}>
            <Button variant='danger' onClick={()=>deleteHandle()}>Delete Account</Button>
          </Col>
          <Col md={4}>
            <Button variant='secondary'>Cancel</Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
