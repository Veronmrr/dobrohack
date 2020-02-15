import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormLayout, Select, TabComponent, PanelHeader, Tabs, TabsItem, Footer } from '@vkontakte/vkui';
import { PANEL_EVENT_INFO, PANEL_EVENT_SENT, TAB_EVENTS, TAB_WORK, TAB_MAP, TAB_ACCOUNT, PANEL_MAIN, PANEL_WORK_INFO, STATUS_DEFAULT } from '../constants';
import EventCard from '../Components/EventCard';

export default class TabEvents extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    events: PropTypes.array,
  };

  static defaultProps = {
    events: [],
  };

  render() {
    const items = this.props.events;
    return (
      <Fragment>
        {!items.length && <Footer>Ничего не найдено</Footer>}
        {items.map((event) => {
          return (
            <EventCard
              key={event.status==STATUS_DEFAULT ? event.id : null}
              title={event.status==STATUS_DEFAULT ? event.title : null  }
              exp={event.status==STATUS_DEFAULT ? event.exp : null  }
              where={event.status==STATUS_DEFAULT ? event.place : null  }
              caption={event.status==STATUS_DEFAULT ? event.description : null}
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