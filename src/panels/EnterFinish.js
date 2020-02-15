import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FormLayout, FormStatus, Button, Input } from '@vkontakte/vkui';
import { PANEL_MAIN } from '../constants';

export default class EnterFinish extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Fragment>
        <PanelHeader>Этап 2</PanelHeader>
        <FormLayout>
          <Input top="Ваш номер телефона" />
          <Input top="Ваш E-mail" />

          <Button onClick={() => this.props.go(PANEL_MAIN)}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </FormLayout>
      </Fragment>
    );
  }
}