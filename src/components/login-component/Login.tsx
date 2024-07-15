import { useState } from 'react';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import '../login-component/login.styles.css';
import { loginStateManipulation } from '../../types';
import { Link, useNavigate } from 'react-router-dom';

interface loginProps {
  onLogin: loginStateManipulation;
}

export const Login: React.FC<loginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [register, setRegister] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (): void => {
    const userData = {
      username: username,
      password: password,
    };

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('Incorrect username or password');
        }
      })
      .then((info) => {
        const infoObj = {
          username: info.username,
          id: info.id,
        };

        localStorage.setItem('user', JSON.stringify(infoObj));
        localStorage.setItem('token', info.token);
        console.log('successful login');
        onLogin(info);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleRegistration = ():void =>{
    //placeholder
  };

  return (
    <>
    {!register ? (
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
                type='password'
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
          <div>
            <Button
             variant='secondary'
             className='login-submit-button'
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <p className='no-account-message'>
              No account? Sign up below
            </p>
              <Button
                variant='secondary'
                className='login-submit-button register-button'
                onClick={()=>setRegister(true)}
              >
                Sign up
              </Button>
          </div>
        </Form>
      </Card>
    </div>
    ):(
    <div className='login-container'>
      <Card className='login-card'>
        <Card.Title className='login-title'>Sign Up</Card.Title>
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
                type='password'
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
          <div className='registration-buttons-container'>
            <Button
             variant='secondary'
             className='login-submit-button'
              onClick={handleRegistration}
            >
              Sign Up
            </Button>
              <Button
                variant='secondary'
                className='login-submit-button back-button'
                onClick={()=>setRegister(false)}
              >
                Back
              </Button>
          </div>
        </Form>
      </Card>
    </div>
    )}
    </>
  );
};
