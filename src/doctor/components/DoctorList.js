import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import DoctorItem from './DoctorItem';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './DoctorList.css';

const DoctorList = props => {
  const { error, clearError } = useHttpClient();

  if (props.items.length === 0) {
    return (
      <div className="doctor-list center">
        <Card>
          <h2>No doctors found. Maybe create one?</h2>
          <Button to="/doctor/add">Share Doctor</Button>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
        <ul className="doctor-list">
        {props.items.map(doctor => (
          <DoctorItem
            key={doctor.id}
            id={doctor.id}
            name={doctor.name}
            surname={doctor.surname}
            dni={doctor.dni}
            specialty={doctor.specialty}
          />
        ))}
        </ul>
      </React.Fragment>
  );
};

export default DoctorList;
