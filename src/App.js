import React, { Component } from 'react';
import { Root, View, Panel } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';
import vkConnect from '@vkontakte/vk-connect';
import EnterStart from './panels/EnterStart';
import EnterFinish from './panels/EnterFinish';
import vkConnectPromise from '@vkontakte/vk-connect-promise';

import { VIEW_ENTER, PANEL_MAIN, VIEW_MAIN, PANEL_ENTER_START, PANEL_ENTER_FINISH, panels, panelsOrder, getViewByPanel, VIEW_EVENT_INFO, PANEL_EVENT_INFO, PANEL_EVENT_SENT, VIEW_EVENT_SENT, VIEW_WORK_INFO, PANEL_WORK_INFO, STATUS_DEFAULT, STATUS_REQUESTED, STATUS_APPROVED } from './constants';
import Main from './panels/Main';
import EventInfo from './panels/EventInfo';
import EventSent from './panels/EventSent';

export default class App extends Component {
  constructor(props) {
    super(props);

    const currentPanelId = PANEL_MAIN;
    const currentViewId = getViewByPanel(currentPanelId);

    this.state = {
      activeView: currentViewId,
      activePanels: Object.keys(panelsOrder).reduce((acc, viewId) => {
        acc[viewId] = panelsOrder[viewId][0];
        return acc;
      }, {}),

      ...panels.reduce((acc, panelId) => {
        acc[panelId] = {};
        return acc;
      }, {}),
    };
  }

    RESP = (url) => {
    fetch(url, {referrerPolicy: "unsafe-url"})
    .then(response => response.json())
    .then(result => {
      global.jsn = result;
      this.update(PANEL_MAIN, {events: global.jsn});
    },
    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    // чтобы не перехватывать исключения из ошибок в самих компонентах.
    (error) => {
      console.log(error)
    });
    }

    RESPSH = (url) => {
      fetch(url)
      .then(response => response.json())
      .then(result => {
        global.shelters = result;
      },
      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      // чтобы не перехватывать исключения из ошибок в самих компонентах.
      (error) => {
        console.log(error)
      });
      }

    RESPVLT = (url) => {
      fetch(url)
      .then(response => response.json())
      .then(result => {
        global.vlt = result;
        
      },
      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      // чтобы не перехватывать исключения из ошибок в самих компонентах.
      (error) => {
        console.log(error)
      });
      console.log(url)
      }

  getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  }

  loglog = (err, data) =>{
    console.log(err, data)
  }

  componentDidMount() {
    this.RESP('https://fedos.pythonanywhere.com/api/v1/task/getlist/?format=json')
    this.RESPSH('https://fedos.pythonanywhere.com/api/v1/shelter/getlist/?format=json')
    this.RESPVLT('https://fedos.pythonanywhere.com/api/v1/vlt/getlist/?format=json')
    //this.getJSON('https://fedos.pythonanywhere.com/api/v1/task/getlist/?format=json', this.loglog)
    console.log(global.jsn)
    console.log(global.shelters)
    console.log(global.vlt)
    vkConnect.subscribe(this.connectListener);
    vkConnect.send('VKWebAppGetUserInfo', {});
    /*vkConnect.subscribe(this.connectListener);
    vkConnect.send('VKWebAppGetUserInfo', {});*/

    vkConnectPromise
      .send('VKWebAppGetGeodata')
      .then(data => {
        global.lat = data.lat;
        global.lon = data.long;
        console.log(global.lat, global.lon)
      })
      .catch(error => {
        // Handling an error
      });

    vkConnectPromise
      .send('VKWebAppGetPhoneNumber')
      .then(data => {
        // Handling received data
        console.log(data.phone_number);
        global.phone_number = '+' + data.phone_number;
      })
      .catch(error => {
        // Handling an error
      })

      vkConnectPromise
      .send('VKWebAppGetUserInfo')
      .then(data => {
        // Handling received data
        console.log(data)
        global.user_info = data;
      })
      .catch(error => {
        // Handling an error
      });
    	
  }

  connectListener = (e) => {
    const { type, data } = e.detail;
	console.log(data);
    switch (type) {
      case 'VKWebAppGetUserInfoResult':
	    {
			
			data.exp = 0;
			data.level = 3;
      global.userInfo = data;
      //global.userInfo.isAdmin = false;
      
			this.setState({ userInfo: data });
			break;
		}
      case 'VKWebAppGetClientVersionResult':
        const { version } = data;
        this.setState({ clientVersion: version });
        break;
      case 'VKWebAppAccessTokenReceived': {
        // const { access_token, secret } = data;
        break;
      }
      case 'VKWebAppAccessTokenFailed':
        // vkConnect.send('VKWebAppClose', { status: 'error', text: 'Доступ запрещен' });
        break;
      default:
    }
  };

  updateEventStatus = (eventId, status) => {
    const events = (this.state[PANEL_MAIN].events || []).map((event) => {
      if (event.id === eventId) {
        return { ...event, status };
      }
      return event;
    });
    this.update(PANEL_MAIN, { events: events });
  }

  go = (panelId) => {
    if (!panels.includes(panelId)) {
      throw new Error('[App.go] panelId is not found in panels');
    }

    const viewId = getViewByPanel(panelId);

    this.setState({
      activeView: viewId,
      activePanels: {
        ...this.state.activePanels,
        [viewId]: panelId,
      },
    });
  };

  /**
   * Обновляет state панели
   *
   * @param {string} panelId id панели
   * @param {object} newState Объект стейта, который нужно смержить с текущим
   * @param {object} options
   * @param {function} next Колбек, который будет вызван после обновления стейта
   */
  update = (panelId, newState, options = {}, next) => {
    return new Promise((resolve) => {
      if (options.clean) {
        this.setState({ [panelId]: newState }, next || resolve);
      } else {
        this.setState((state) => ({
          [panelId]: {
            ...state[panelId],
            ...newState,
          },
        }), next || resolve);
      }
    });
  };

  showPopout = (popout) => {
    this.setState({ popout });
  };

  hidePopout = () => {
    this.setState({ popout: null });
  };

  render() {
    
    return (
      <Root activeView={this.state.activeView} popout={this.state.popout}>
        <View id={VIEW_ENTER} activePanel={this.state.activePanels[VIEW_ENTER]}>
          <Panel id={PANEL_ENTER_START} theme="white">
            <EnterStart
              {...this.state[PANEL_ENTER_START]}
              update={this.update}
              go={this.go}
            />
          </Panel>
          <Panel id={PANEL_ENTER_FINISH}>
            <EnterFinish
              {...this.state[PANEL_ENTER_FINISH]}
              update={this.update}
              go={this.go}
            />
          </Panel>
        </View>

        <View id={VIEW_MAIN} activePanel={this.state.activePanels[VIEW_MAIN]}>
          <Panel id={PANEL_MAIN}>
            <Main
              {...this.state[PANEL_MAIN]}
              update={this.update}
              go={this.go}
              userInfo={this.state.userInfo}
            />
          </Panel>
        </View>

        <View id={VIEW_EVENT_INFO} activePanel={this.state.activePanels[VIEW_EVENT_INFO]}>
          <Panel id={PANEL_EVENT_INFO}>
            <EventInfo
              {...this.state[PANEL_EVENT_INFO]}
              update={this.update}
              go={this.go}
              updateEventStatus={this.updateEventStatus}
              showPopout={this.showPopout}
              hidePopout={this.hidePopout}
            />
          </Panel>
        </View>

        <View id={VIEW_EVENT_SENT} activePanel={this.state.activePanels[VIEW_EVENT_SENT]}>
          <Panel id={PANEL_EVENT_SENT}>
            <EventSent
              {...this.state[PANEL_EVENT_SENT]}
              update={this.update}
              go={this.go}
              showPopout={this.showPopout}
              hidePopout={this.hidePopout}
              updateEventStatus={this.updateEventStatus}
            />
          </Panel>
        </View>

        <View id={VIEW_WORK_INFO} activePanel={this.state.activePanels[VIEW_WORK_INFO]}>
          <Panel id={PANEL_WORK_INFO}>
            <EventSent
              {...this.state[PANEL_WORK_INFO]}
              update={this.update}
              go={this.go}
            />
          </Panel>
        </View>
      </Root>
    );
  }
}