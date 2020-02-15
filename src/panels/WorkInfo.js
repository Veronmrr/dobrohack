import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FormLayout, FormStatus, Button, Input,PanelHeaderBack } from '@vkontakte/vkui';
import { PANEL_MAIN } from '../constants';
import { PANEL_EVENT_INFO } from '../constants';
import { PANEL_EVENT_SENT } from '../constants';

export default class WorkInfo extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };

  render() {
    return (
        <Fragment>
          Hid
        </Fragment>

    );
  }
}