import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { listUser } from '../tracker-list/tracker-list-types';

interface DeleteConfirmationProps{
  user: listUser;
  token: String;
};

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ()=>{
  return(
    <Modal size='lg' centered>
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
            <Button variant='danger'>Delete Account</Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
