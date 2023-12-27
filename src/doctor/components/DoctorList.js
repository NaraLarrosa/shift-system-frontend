import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import DoctorItem from './DoctorItem';
import Button from '../../shared/components/FormElements/Button';
import './DoctorList.css';

const DoctorList = props => {
  if (props.items.length === 0) {
    return (
      <div className="doctor-list center">
        <Card>
          <h2>No doctors found. Maybe create one?</h2>
          <Button to="/doctors/new">Share Doctor</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="doctor-list">
      {props.items.map(doctor => (
        <DoctorItem
          key={doctor.id}
          id={doctor.id}
          name={doctor.name}
          surname={doctor.surname}
          dni={doctor.dni}
          specialty={doctor.specialty}
          onDelete={props.onDeleteDoctor}
        />
      ))}
    </ul>
  );
};

export default DoctorList;
