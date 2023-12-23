import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/specialty`}>
          <div className="user-item__info">
            <h2>{props.user.id}</h2>
            <h3>
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
