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
    this.RESP('https://01f1fef5.ngrok.io/api/v1/task/getlist/?format=json')
    this.RESPSH('https://01f1fef5.ngrok.io/api/v1/shelter/getlist/?format=json')
    this.RESPVLT('https://01f1fef5.ngrok.io/api/v1/vlt/getlist/?format=json')
    //this.getJSON('https://01f1fef5.ngrok.io/api/v1/task/getlist/?format=json', this.loglog)
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
    

    /*const events = [
      {
        id: 1,
        title: 'Выставка "Почему?"',
        cover: 'https://sun9-37.userapi.com/c855236/v855236666/10b3f7/2P8vRgLiN5g.jpg',
        where: `Открытая коллекция Политехнического музея (Москва, м. Текстильщики, Волгоградский проспект, д. 42, корп. 5, 2 этаж, вход через КПП №3)`,
        exp: 'от 100 EXP',
        caption: `Почему опасно перемещаться во времени? Почему мы забываем сны? Почему в носу есть дырки? Почему хомяки боятся летать в космос поодиночке?…`,
        description: `
        - Почему опасно перемещаться во времени?<br />
        - Почему мы забываем сны?<br />
        - Почему в носу есть дырки?<br />
        - Почему хомяки боятся летать в космос поодиночке?<br /><br />
        Попробуйте представить, как могут выглядеть ответы на эти вопросы.
        Если не получается, приходите на выставку «Почему?» в Открытую коллекцию Политеха.
        Будем искать образы и ответы вместе с юными художниками и мастерами творческой «Студии ДЭЗ №5».
        Целый год они сомневались и удивлялись. И теперь вы можете увидеть скульптурные композиции-вопросы, которые участники выставки
        буквально «встроили» в ряды гигантских электронных вычислительных машин, исторических автомобилей,
        макетов энергетических установок и телефонных аппаратов. Детский взгляд позволяет по-новому понять и старые вещи, и современное искусство.
        `,
        roles: [{
          name: 'Переноска оборудования',
          current: 70,
          need: 100,
        }, {
          name: 'Встреча гостей',
          current: 4,
          need: 10,
        }],
        status: STATUS_DEFAULT,
      },
      {
        id: 2,
        title: 'Сканирование базы',
        exp: 'от 200 EXP',
        where: 'Открытая коллекция Политехнического музея (Москва, м. Текстильщики, Волгоградский проспект, д. 42, корп. 5, 2 этаж, вход через КПП №3)',
        caption: 'У нас есть интереснейшее задание для Вас, друзья, на днях в нашем музее проходила мастер-класс с французским архитектором. Он вместе с детьми сделали несколько поделок…',
        roles: [{
          name: 'Волонтёры',
          current: 0,
          need: 1,
        }],
        status: STATUS_DEFAULT,
      },
      {
        id: 3,
        title: 'VK Hackathon 2019',
        cover: require('./img/hack.jpg'),
        exp: '499 exp',
        where: 'Центральный выставочный зал "Манеж", Санкт-Петербург',
        caption: 'Пятый хакатон пройдет с 27 по 29 сентября. Свои проекты представят 600 участников из 150 команд...',
        roles: [{
          id: 1,
          name: 'Встреча гостей',
          current: 1,
          need: 2,
        }, {
          id: 2,
          name: 'Раздача мерча',
          current: 1,
          need: 2,
        }, {
          id: 3,
          name: 'Помощь на территории',
          current: 7,
          need: 20,
        }],
        status: STATUS_APPROVED,
      },
    ];*/
    //this.update(PANEL_MAIN, { events: events });
	
	
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