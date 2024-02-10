import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import { useSelector } from "react-redux";
import './SpecialtyItem.css';

const SpecialtyItem = () => {

  const specialties = useSelector((state) => state.specialty.specialties);

  if (specialties.length === 0) {
    return (
      <div className="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card style={{ width: '80%', maxWidth: '600px', padding: '20px', textAlign: 'center' }}>
          <h2>No specialty found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="specialty-item">
        {specialties.map(specialty => (
            <div>
                key={specialty.id}
                id={specialty.id}
                name={specialty.name}
            </div>
        ))}
    </ul>
  );
};

export default SpecialtyItem;
