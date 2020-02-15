import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FormLayout, Button, PanelHeaderBack, FormLayoutGroup, Radio, ScreenSpinner } from '@vkontakte/vkui';
import { TAB_WORK, PANEL_MAIN, PANEL_EVENT_INFO, STATUS_REQUESTED } from '../constants';
import { EventPropType } from '../base';

export default class EventSent extends Component {
  static propTypes = {
    event: PropTypes.shape(EventPropType),

    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    showPopout: PropTypes.func.isRequired,
    hidePopout: PropTypes.func.isRequired,
    updateEventStatus: PropTypes.func,
  };

  render() {
    const { event } = this.props;

    return (
      <Fragment>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.go(PANEL_EVENT_INFO)} />}>—</PanelHeader>

        <div className="EventSent">
          <div className="EventSent__in">
            <FormLayout>
              <div className="EventSent__title">{event.title}</div>
				<div>Нажимая кнопку, Вы даете согласие на обработку своих данных.</div>
              {Array.isArray(event.roles) && event.roles.length > 0 &&
              <FormLayoutGroup top="Выберите должность">
                {event.roles.map((role, index) => {
                  return (
                    <Radio
                      key={index}
                      name="role"
                    >{role.name}</Radio>
                  );
                })}
              </FormLayoutGroup>}

              <Button size="xl" onClick={() => {
                this.props.showPopout(<ScreenSpinner />);
                setTimeout(() => {
                  this.props.hidePopout();
                  this.props.update(PANEL_MAIN, { activeTab: TAB_WORK });
                  this.props.updateEventStatus(this.props.event.id, STATUS_REQUESTED);
                  this.props.go(PANEL_MAIN);
                }, 1000);
              }}>Отправить</Button>
            </FormLayout>
          </div>
        </div>
      </Fragment>
    );
  }
}