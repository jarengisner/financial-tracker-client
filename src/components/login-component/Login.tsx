import { useState } from 'react';
import { Card, Form, FormGroup } from 'react-bootstrap';
import '../login-component/login.styles.css';

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className='login-container'>
      <Card className='login-card'>
        <Card.Title className='login-title'>Login</Card.Title>
        <Form>
          <FormGroup controlId='forUsername'>
            <div className='username-container'>
              <Form.Label className='login-input-title'>Username</Form.Label>
              <Form.Control
                type='text'
                value={username}
                required
                placeholder='Username'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className='login-input'
              />
            </div>
          </FormGroup>
          <FormGroup controlId='forPassword'>
            <div className='password-container'>
              <Form.Label className='login-input-title'>Password</Form.Label>
              <Form.Control
                type='text'
                value={password}
                required
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className='login-input'
              />
            </div>
          </FormGroup>
        </Form>
      </Card>
    </div>
  );
};
