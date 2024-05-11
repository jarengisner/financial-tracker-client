import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { SideBar } from '../home-side-bar/SideBar';
import { Login } from '../login-component/Login';
import { SideBarClosed } from '../home-side-bar/SideBarClosed';

//types
import { loginStateManipulation, stateManipulationFunction } from '../../types';

//styles
import '../main-view/main-view-styles.css';

export const MainView: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [sideBarOpen, setSideBarOpen] = useState<Boolean>(false);

  const openSideBar: stateManipulationFunction = (): void => {
    setSideBarOpen(true);
  };

  const closeSideBar: stateManipulationFunction = (): void => {
    setSideBarOpen(false);
  };

  //May need to push into user and token
  const onLogin: loginStateManipulation = (arg) => {
    const argDestructure = {
      username: arg.username,
      id: arg.id,
    };
    setUser(argDestructure);
    setToken(arg.token);
  };

  return (
    <BrowserRouter>
      <Row>
        {user && token && sideBarOpen ? (
          <Col
            md={2}
            style={{ height: '100vh' }}
            className='side-bar-menu open'
          >
            <SideBar closeSideBar={closeSideBar} />
          </Col>
        ) : (
          !user &&
          !token &&
          sideBarOpen && (
            <Col
              md={1}
              style={{ height: '100vh' }}
              className='side-bar-menu closed'
            >
              <SideBarClosed openSideBar={openSideBar} />
            </Col>
          )
        )}
        <Routes>
          <Route path='/login' element={<Login onLogin={onLogin} />} />
          <Route
            path='/'
            element={
              user && token && sideBarOpen ? (
                <Col md={10} className='main-component'>
                  <div className='main-component-content-container'>
                    <h1>main</h1>
                  </div>
                </Col>
              ) : (
                <Col md={11} className='main-component'>
                  <div className='main-component-content-container'>
                    <h1>main</h1>
                  </div>
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
