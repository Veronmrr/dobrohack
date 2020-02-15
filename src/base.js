import PropTypes from 'prop-types';

export const EventPropType = {
  allergy: PropTypes.bool,
  date: PropTypes.string,
  description: PropTypes.string,
  exp: PropTypes.node,
  id: PropTypes.node,
  place: PropTypes.string,
  shelter: PropTypes.node
};

export const UserPropType = {
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    age: PropTypes.number,
  };