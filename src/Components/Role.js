import React from 'react';
import PropTypes from 'prop-types';
import './Role.css';
import Icon24User from '@vkontakte/icons/dist/24/user';

function Role(props) {
  const { name, current, need } = props;

  return (
    <div className="EventRole">
      <div className="EventRole__name">{name}</div>
      <div className="EventRole__current">{current}</div>
      <div className="EventRole__delimiter">/</div>
      <div className="EventRole__need">{need}</div>
      <Icon24User />
    </div>
  );
}

Role.propTypes = {
  name: PropTypes.node,
  current: PropTypes.number,
  need: PropTypes.number,
};

export default Role;