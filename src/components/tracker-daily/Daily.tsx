import React, { useEffect, useState } from 'react';
import { Col, Dropdown, DropdownButton, DropdownItem, NavDropdown, Row } from 'react-bootstrap';
import { listUser, TrackerItem, User } from '../tracker-list/tracker-list-types';
import { DailyForm } from './DailyForm';


import './daily-styles.css'

interface DailyProps{
  user: listUser;
  token: string;
};

export const Daily: React.FC<DailyProps> = ({user, token}) => {
  const [usersTrackers, setUsersTrackers] = useState<TrackerItem[]>([]);

  const [selectedTracker, setSelectedTracker] = useState<TrackerItem | null>(null);

  const [title, setTitle] = useState<string>('No Tracker Selected');

  useEffect(()=>{
    fetch(`http://localhost:8080/trackers/${user.id}/all`, {
      method: 'GET', 
    headers: {
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`,
    },
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log('Data fetched on Daily page ', data);
      setUsersTrackers(data);
    })
    .catch((err)=>{
      console.log('Error generated in Daily page ', err);
    })
  }, [token, user]);

  const noneHandler = ():void =>{
    setSelectedTracker(null);
    setTitle('No tracker selected');
  };

  //makes sure that tracker is displayed on button when refreshing
  useEffect(()=>{
    if(selectedTracker){
      setTitle(selectedTracker.tracker_name);
    }
  }, [selectedTracker])

  return (
    <Col md={10}>
      <div className="daily-title-container">
        <h1 className="daily-title">Daily</h1>
      </div>
      <Row style={{marginTop: "1.5%"}}>
        <DropdownButton title={title} className='daily-dropdown-select' id='daily-drop'  drop='down-centered'>
          <Dropdown.Item as='button' onClick={()=>noneHandler()}>None</Dropdown.Item>
          {usersTrackers?.map((t)=>(
            <Dropdown.Item as='button' onClick={()=>setSelectedTracker(t)}>
              {t.tracker_name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Row>
      {selectedTracker &&(
        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <DailyForm selectedTracker={selectedTracker} user={user} token={token} />
        </Row>
      )}
    </Col>
  );
};
