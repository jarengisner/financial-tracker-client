import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { listUser, TrackerItem } from '../tracker-list/tracker-list-types';

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

  //need to figure out how we are gonna format? or maybe it formats in the backend
//  const [submissionDate, setSubmissionDate] = useState<date>();
  

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
      console.log(resData);
    })
    .catch((err)=>{
      console.log('There was an error when submitting the daily ' + err);
    });
  };

  return(
    <div className='daily-form-container'>
      <p className='caption-for-daily'>Amount put into savings today</p>
        <input type='text' className='daily-input' 
          placeholder='$'
          onChange={(e)=>setSavings(JSON.parse(e.target.value))}
        />
      <p className='caption-for-daily'>Savings note</p>
        <textarea className='daily-note-input'
          onChange={(e)=>setSavingsNote(e.target.value)}
        />
      <p className='caption-for-daily'>Amount spent on "needs" today</p>
        <input type='text' className='daily-input' 
          placeholder='$'
          onChange={(e)=>setNeeds(JSON.parse(e.target.value))}
        />
      <p className='caption-for-daily'>Needs Note</p>
        <textarea className='daily-note-input'
          onChange={(e)=>setNeedsNote(e.target.value)}
        />
      <p className='caption-for-daily'>Amount spent on "wants" today</p>
        <input type='text' className='daily-input' 
          placeholder='$'
          onChange={(e)=>setWants(JSON.parse(e.target.value))}
        />
      <p className='caption-for-daily'>Wants note</p>
        <textarea className='daily-note-input'
          onChange={(e)=>setWantsNote(e.target.value)}
        />
      <Button 
        className='daily-submit-button'
        onClick={()=>submitHandle()}
      >
        Submit Daily
      </Button>
    </div>
  );
};
