import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './SpecialtiesList.css';

const SpecialtiesList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No specialties found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="specialty-list">
    </ul>
  );
};

export default SpecialtiesList;