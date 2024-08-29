import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { listUser, TrackerItem } from '../tracker-list/tracker-list-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons';

//loading circle
import ClipLoader from "react-spinners/ClipLoader";

import './daily-styles.css'


interface FormProps{
  selectedTracker:TrackerItem;
  user:listUser;
  token:string;
};

export const DailyForm: React.FC<FormProps> = ({selectedTracker, user, token})=>{
  const [needs, setNeeds] = useState<number>();
  const [wants, setWants] = useState<number>();
  //amount put into savings today
  const [savings, setSavings] = useState<number>();

  const [needsNote, setNeedsNote] = useState<string>();
  const [wantsNote, setWantsNote] = useState<string>();
  const [savingsNote, setSavingsNote] = useState<string>();

 const [sending, setSending] = useState<boolean>(false);
 const [finishedSending, setFinishedSending] = useState<boolean>(false);
 const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)

const formatDate = (date: Date):string =>{
  const year: any = date.getFullYear();
  const month:any = (date.getMonth() + 1).toString().padStart(2, '0');
  const day:any = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`
};


  const submitHandle = ()=>{
    const submitData: any = {
      saved: savings,
      needs: needs,
      wants: wants,
      saved_note: savingsNote,
      needs_note: needsNote,
      wants_note: wantsNote,
      tracker_id: selectedTracker.tracker_id,
      entry_date: formatDate(new Date())
    };

    //load circle loader
    setSending(true);

    fetch(`http://localhost:8080/daily`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(submitData),
    })
    .then((res)=>res.json())
    .then((resData)=>{
      setFinishedSending(true);
      setSubmitSuccess(true);
      setSending(false);

      console.log(resData);
    })
    .catch((err)=>{
      //failed send
      setSubmitSuccess(false);
      console.log('There was an error when submitting the daily ' + err);
    });
  };

  const inputHandle = (e: string):any =>{
    if(e.length > 0){
      return JSON.parse(e);
    }else{
      return 0;
    }
  };

  return(
    <>
      <Modal show={finishedSending} centered>
        <Modal.Body>
          {submitSuccess ? (
            <FontAwesomeIcon icon={faCheck} />
          ):(
            <FontAwesomeIcon icon={faX} />
          )}
        </Modal.Body>
      </Modal>
      <div className='daily-form-container'>
      <Row>
        <Col>
          <div>
            <p className='caption-for-daily'>Amount put into savings today</p>
              <input type='text' className='daily-input' 
                placeholder='$'
                onChange={(e)=>setSavings(inputHandle(e.target.value))}
              />
          </div>
        </Col>
        <Col>
          <div>
              <textarea className='daily-note-input'
                onChange={(e)=>setSavingsNote(e.target.value)}
              />
          </div>
        </Col>
      </Row>
      <Row>
        <div>
          <p className='caption-for-daily'>Amount spent on "needs" today</p>
            <input type='text' className='daily-input' 
              placeholder='$'
              onChange={(e)=>setNeeds(inputHandle(e.target.value))}
            />
        </div>
        <div>
          <p className='caption-for-daily'>Needs Note</p>
            <textarea className='daily-note-input'
              onChange={(e)=>setNeedsNote(e.target.value)}
            />
        </div>
      </Row>
      <Row>
        <div>
          <p className='caption-for-daily'>Amount spent on "wants" today</p>
            <input type='text' className='daily-input' 
              placeholder='$'
              onChange={(e)=>setWants(inputHandle(e.target.value))}
            />
        </div>
        <div>
          <p className='caption-for-daily'>Wants note</p>
            <textarea className='daily-note-input'
              onChange={(e)=>setWantsNote(e.target.value)}
            />
        </div>
      </Row>
          {sending ? (
            <ClipLoader loading={sending}/>
          ):(
        <Button 
          className='daily-submit-button'
          onClick={()=>submitHandle()}
          variant='light'
        >
          Submit Daily
        </Button>
          )}
      </div>
    </>
  );
};
