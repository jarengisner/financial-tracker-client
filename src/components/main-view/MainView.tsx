import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { SideBar } from '../home-side-bar/SideBar';
export const MainView: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <BrowserRouter>
      {user && token && sideBarOpen ? (
        <Col md={2}>
          <SideBar />
        </Col>
      ) : (
        <Col md={2}>
          <h2>Closed icon</h2>
        </Col>
      )}
      <Routes>{/*Routes will go here */}</Routes>
    </BrowserRouter>
  );
};
