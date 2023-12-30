import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './SpecialtyItem.css';

const SpecialtyItem = props => {
  const { isLoading, error, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="specialty-item">
        <Card className="specialty-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="specialty-item__info">
            <h2>{props.name}</h2>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default SpecialtyItem;
