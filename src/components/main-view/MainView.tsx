import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { SideBar } from '../home-side-bar/SideBar';
import { Login } from '../login-component/Login';
import { SideBarClosed } from '../home-side-bar/SideBarClosed';
import { useEffect } from 'react';

//types
import { loginStateManipulation, stateManipulationFunction } from '../../types';

//styles
import '../main-view/main-view-styles.css';
import { TrackerList } from '../tracker-list/TrackerList';

export const MainView: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [sideBarOpen, setSideBarOpen] = useState<Boolean>(false);
  const [userTrackers, setUserTrackers] = useState([]);

  //fetch trackers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId: number = user.id;
        const response = await fetch(
          `http://localhost:8080/trackers/${userId}/all`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response) {
          throw new Error('Unsuccessful response from server');
        }

        if (response.status === 204) {
          setUserTrackers([]);
          return;
        }

        const data = await response.json();
        console.log(data);

        setUserTrackers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData when component mounts or dependencies change
  }, [user.id, token]);

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
        {user && token ? (
          sideBarOpen ? (
            <Col
              md={2}
              style={{ height: '100vh' }}
              className='side-bar-menu open'
            >
              <SideBar closeSideBar={closeSideBar} />
            </Col>
          ) : (
            <Col
              md={1}
              style={{ height: '100vh' }}
              className='side-bar-menu closed'
            >
              <SideBarClosed openSideBar={openSideBar} />
            </Col>
          )
        ) : (
          <Navigate to='/login' />
        )}
        <Routes>
          <Route path='/login' element={<Login onLogin={onLogin} />} />
          <Route
            path='/'
            element={
              user && token ? (
                <Col md={10} className='main-component'>
                  <div className='main-component-content-container'>
                    <TrackerList trackers={userTrackers} />
                  </div>
                </Col>
              ) : (
                <Navigate to='/login' />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
