import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ShiftItem from './ShiftItem';
import Button from '../../shared/components/FormElements/Button';
import './ShiftList.css';

const ShiftList = props => {
  if (props.items.length === 0) {
    return (
      <div className="shift-list center">
        <Card>
          <h2>No shifts found. Maybe create one?</h2>
          <Button to="/shift/new">Share Shift</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="shift-list">

      {props.items.map(shift => (
        <ShiftItem
          key={shift.id}
          id={shift.id}
          day={shift.day}
          hour={shift.hour}
          description={shift.description}
          available={shift.available}
          doctor={shift.doctor}
          canceled={shift.canceled}
          user = {shift.user}
          onDelete={props.onDeleteShift}
        />
      ))}
    </ul>
  );
};

export default ShiftList;
