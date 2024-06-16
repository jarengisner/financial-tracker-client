import React from 'react';
import { Modal, Row } from 'react-bootstrap';

export const DeleteWarningModal: React.FC = () => {
  return (
    <Modal>
      <Row>
        <p>Delete tag title</p>
        <button>Exit</button>
      </Row>
      <Row>
        <p>Warning here</p>
      </Row>
    </Modal>
  );
};
