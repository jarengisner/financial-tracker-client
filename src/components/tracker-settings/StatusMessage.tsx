import React from 'react';
import { Card } from 'react-bootstrap';

//style
import './tracker-settings-style.css';

interface messageProps {
  message: string;
  success: boolean;
}

export const StatusMessage: React.FC<messageProps> = ({ message, success }) => {
  return (
    <>
      {success ? (
        <Card className='successful-message-card'>
          <p className='success-message-card-text'>{message}</p>
        </Card>
      ) : (
        <Card className='failed-message-card'>
          <p className='failed-message-card-text'>{message}</p>
        </Card>
      )}
    </>
  );
};
