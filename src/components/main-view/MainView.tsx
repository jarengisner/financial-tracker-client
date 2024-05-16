import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { SideBar } from '../home-side-bar/SideBar';
import { Login } from '../login-component/Login';
import { SideBarClosed } from '../home-side-bar/SideBarClosed';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

//types
import { loginStateManipulation, stateManipulationFunction } from '../../types';

//styles
import '../main-view/main-view-styles.css';
import { TrackerList } from '../tracker-list/TrackerList';
import { TrackerHome } from '../tracker-home/TrackerHome';
import { TrackerItem } from '../tracker-list/tracker-list-types';

export const MainView: React.FC = () => {
  //User related state
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [valid, setValidToken] = useState<boolean>(false);

  //render specific state
  const [sideBarOpen, setSideBarOpen] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  //prop related state
  const [selectedTracker, setSelectedTracker] = useState<TrackerItem>();

  //fetch trackers
  useEffect(() => {
    if (storedUser && storedToken && valid === false) {
      const validationRequest = {
        token: storedToken,
      };

      fetch('http://localhost:8080/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationRequest),
      }).then((res) => {
        if (res.ok) {
          setLoading(false);
          setValidToken(true);
          return;
        } else {
          localStorage.clear();
          setUser(null);
          setToken(null);
        }
      });
    }
  }, [storedToken, storedUser]);

  //********************************************************************************************************************************************************************* */

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
              user && token && loading === false ? (
                <Col md={10} className='main-component'>
                  <div className='main-component-content-container'>
                    <TrackerList user={user} token={token} />
                  </div>
                </Col>
              ) : user && token && loading ? (
                <Col md={10} className='main-component'>
                  <div className='main-component-content-container'>
                    <ClipLoader />
                  </div>
                </Col>
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />

          <Route
            path='/trackers/:id'
            element={<TrackerHome tracker={selectedTracker} />}
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
