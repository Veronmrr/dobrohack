import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Checkout from './AddIvent/Checkout';


export default class TabAdmin extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };

  static defaultProps = {

  };

  constructor (props) {
    super(props);

    this.state = {
        title: "",
        date: "",
        shelter: "",
        allergy: "",
        place: "",
        status: "",
        description: "", 
    };
    global.that = this
  }
 
  render() {
    const {  } = this.props;
    return (
        <Checkout>

        </Checkout>
    );
  }
}
