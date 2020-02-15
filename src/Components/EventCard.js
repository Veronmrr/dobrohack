import React from 'react';
import PropTypes from 'prop-types';
import './EventCard.css';
import { Separator } from '@vkontakte/vkui';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Role from './Role';

function EventCard(props) {
  const { title, where, caption, exp, roles, onClick } = props;

  return ( <div>{title === null ? (<div></div>) : (
    <div className="EventCard" onClick={onClick}>
      <div className="EventCard__in">
        <div className="EventCard__header">
          <div className="EventCard__title">{title}</div>
          <div className="EventCard__exp"><span class="new badge red" data-badge-caption="">{'+ '+exp+' exp'}</span></div>
        </div>
        <div className="EventCard__where">{where}</div>

        {roles.length > 0 && <div className="EventCard__roles">
          <Separator wide />
          {roles.map((role, index) => {
            return (
              <Role
                key={index}
                name={role.name}
                current={role.current}
                need={role.need}
              />
            );
          })}
          <Separator wide />
        </div>}

        <div className="EventCard__caption">
          {caption}
        </div>
      </div>
    </div>)
  }</div>);
}

EventCard.propTypes = {
  title: PropTypes.node,
  exp: PropTypes.node,
  where: PropTypes.node,
  caption: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    current: PropTypes.number,
    need: PropTypes.number,
  })),
  onClick: PropTypes.func,
};

EventCard.defaultProps = {
  roles: [],
};

export default EventCard;