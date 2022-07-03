import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const CardHome = (props) => {
  return (
    <Link to={props.link} style={{ textDecoration: 'none', color: '#333' }}>
      <Card className='shadow rounded border-0 bodyCard' style={{ width: '25rem' }}>
        <Card.Body>
          <FontAwesomeIcon icon={props.logo} className="homeIcon" />
          <Card.Title className='cardTitle' style={{ marginBottom: 30 }}>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.subTitle}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardHome;