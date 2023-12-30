import React from 'react';

import SpecialtyItem from './SpecialtyItem';
import Card from '../../shared/components/UIElements/Card';
import './SpecialtiesList.css';

const SpecialtiesList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No specialty found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="specialty-list">
      {props.items.map(specialty => (
        <SpecialtyItem
          key={specialty.id}
          id={specialty.id}
          name={specialty.name}
        />
      ))}
    </ul>
  );
};

export default SpecialtiesList;