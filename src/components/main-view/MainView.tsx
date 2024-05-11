import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { SideBar } from '../home-side-bar/SideBar';
import { Login } from '../login-component/Login';
import { SideBarClosed } from '../home-side-bar/SideBarClosed';

//types
import { stateManipulationFunction } from '../../types';

//styles
import '../main-view/main-view-styles.css';

export const MainView: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar: stateManipulationFunction = (): void => {
    setSideBarOpen(true);
  };

  const closeSideBar: stateManipulationFunction = (): void => {
    setSideBarOpen(false);
  };

  return (
    <BrowserRouter>
      {/**user && token &&  */}
      {sideBarOpen ? (
        <Col md={2} style={{ height: '100vh' }} className='open-side-menu'>
          <SideBar closeSideBar={closeSideBar} />
        </Col>
      ) : (
        <Col md={1} style={{ height: '100vh' }}>
          <SideBarClosed openSideBar={openSideBar} />
        </Col>
      )}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <div>
              <h1>Home screen</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
