import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Card = ({ icon, headline, link }) => {
  return (
    <a href={link} className="card">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="card-headline">{headline}</div>
    </a>
  );
};

export default Card;
