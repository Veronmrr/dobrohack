import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsItem, FixedLayout, activeTab, Group, PanelHeader, PanelHeaderBack, Footer } from '@vkontakte/vkui';
import { PANEL_EVENT_INFO, PANEL_EVENT_SENT, TAB_EVENTS, TAB_WORK, TAB_MAP, TAB_ACCOUNT, PANEL_MAIN, PANEL_WORK_INFO, STATUS_REQUESTED, STATUS_APPROVED } from '../constants';
import EventCard from '../Components/EventCard';

const WORK_TAB_ALL = 'all';
const WORK_TAB_APPROVED = 'approved';

export default class TabWork extends Component {
  static propTypes = {
    workActiveTab: PropTypes.string,
    events: PropTypes.array,

    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };

  static defaultProps = {
    events: [],
    workActiveTab: WORK_TAB_ALL,
  };

  openEvent = (e) => {
    this.props.update(PANEL_WORK_INFO, {
      eventName: e.currentTarget.getAttribute('data-event-name'),
    });

    this.props.go(PANEL_WORK_INFO);
  };

  render() {
    const status = this.props.workActiveTab === WORK_TAB_ALL ? STATUS_REQUESTED : STATUS_APPROVED;
    const items = this.props.events.filter(i => i.status === status);

    return (
      <Fragment>
        <Tabs theme="light">
          <TabsItem
            onClick={() => this.props.update(PANEL_MAIN, { workActiveTab: WORK_TAB_ALL })}
            selected={this.props.workActiveTab === WORK_TAB_ALL}
          >
            Зарегистрированные
          </TabsItem>
          <TabsItem
            onClick={() => this.props.update(PANEL_MAIN, { workActiveTab: WORK_TAB_APPROVED })}
            selected={this.props.workActiveTab === WORK_TAB_APPROVED}
          >
            Выполненные
          </TabsItem>
        </Tabs>

        {!items.length && <Footer>Ничего не найдено</Footer>}

        {items.map((event) => {
          return (
            <EventCard
              key={event.id}
              title={event.title}
              exp={event.exp}
              where={event.where}
              caption={event.caption}
              roles={event.roles}
              onClick={() => {
                this.props.update(PANEL_EVENT_INFO, { event });
                this.props.go(PANEL_EVENT_INFO);
              }}
            />
          );
        })}

        <div style={{ height: 60 }} />
      </Fragment>
    );
  }
}