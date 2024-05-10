import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { SideBar } from '../home-side-bar/SideBar';
import { Login } from '../login-component/Login';
import { SideBarClosed } from '../home-side-bar/SideBarClosed';

//types
import { stateManipulationFunction } from '../../types';

export const MainView: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar: stateManipulationFunction = (): void => {
    setSideBarOpen(true);
  };

  return (
    <BrowserRouter>
      {/**user && token &&  */}
      {sideBarOpen ? (
        <Col md={2} style={{ height: '100vh' }}>
          <SideBar />
        </Col>
      ) : (
        <Col md={1} style={{ height: '100vh' }}>
          <SideBarClosed openSideBar={openSideBar} />
        </Col>
      )}
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
