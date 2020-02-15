import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, Button, PanelHeaderBack, Separator, Footer, PopoutWrapper } from '@vkontakte/vkui';
import { PANEL_MAIN, PANEL_EVENT_SENT, STATUS_DEFAULT, STATUS_REQUESTED, STATUS_APPROVED, PANEL_EVENT_INFO } from '../constants';

import { EventPropType } from '../base';
import Role from '../Components/Role';
import './EventInfo.css';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import vkQr from 'vk-qr';

export default class EventInfo extends Component {
  static propTypes = {
    event: PropTypes.shape(EventPropType),

    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    updateEventStatus: PropTypes.func,
    hidePopout: PropTypes.func,
    showPopout: PropTypes.func,
  };

  render() {
    const { event } = this.props;
	
	var shelter;
	for (var i=0; i< global.shelters.length; i++){
		if (event.shelter === global.shelters[i].id){
			shelter = global.shelters[i];
		}
	}
	
    return (
      <Fragment>
        <PanelHeader
          left={<PanelHeaderBack onClick={() => this.props.go(PANEL_MAIN)} />}
        >{event.title}
        </PanelHeader>

        <div className="EventInfo">
          <div className="EventInfo__in">
            {event.cover && <div className="EventInfo__cover">
              <img src={event.cover} />
              {event.status === STATUS_APPROVED &&
              <div className="EventInfo__qr" onClick={() => {
                const qrSvg = vkQr.createQR(event.title, {
                  qrSize: 182,
                  isShowLogo: true,
                });

                this.props.showPopout(
                  <PopoutWrapper
                    onClick={() => this.props.hidePopout()}
                  >
                    <div className="EventInfoQr">
                      <div className="EventInfoQr__title">Персональный QR Code</div>
                      <div className="EventInfoQr__svg">
                        <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
                      </div>
                      <div className="EventInfoQr__caption">Дайте отсканировать этот QR ментору на площадке</div>
                      <div className="EventInfoQr__caption">Не забудьте, свой QR нужно показать на входе и на выходе</div>
                    </div>
                  </PopoutWrapper>
                );
              }}>
                <Icon24Qr width={28} height={28} />
              </div>}
            </div>}

            <div className="EventInfo__title">{event.title}</div>
            {event.place && <div className="EventInfo__where">{event.place}<br/>{shelter===undefined ? (<div></div>) : shelter.title }<br/>{event.date}</div>}

          

            <div
              className="EventInfo__description"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            <div className="EventInfo__footer">
              {event.status === STATUS_DEFAULT &&
              <Button size="xl" onClick={() => {
				  event.user_id = global.userInfo.id;
				fetch('https://01f1fef5.ngrok.io/api/v1/task/detail/'+event.id, {method: 'PUT', // Method itself
																			 headers: {
																			  'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
																			 },
																			 body: JSON.stringify({'id': event.id, 'status': 2, 'user_id': toString(global.userInfo.id)}) })

                this.props.update(PANEL_EVENT_SENT, { event });
                this.props.go(PANEL_EVENT_SENT);
              }}>Подать заявку</Button>}

              {event.status === STATUS_REQUESTED &&
              <Button size="xl" onClick={() => {
				  event.user_id = 0;
				  fetch('https://01f1fef5.ngrok.io/api/v1/task/detail/'+event.id, {method: 'PUT', // Method itself
																			 headers: {
																			  'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
																			 },
																			 body: JSON.stringify({'id': event.id, 'status': 1, 'user_id': 0}) })
                this.props.updateEventStatus(event.id, STATUS_DEFAULT);
                this.props.update(PANEL_EVENT_INFO, {
                  event: {
                    ...event,
                    status: STATUS_DEFAULT,
                  },
                });
              }}>Отменить заявку</Button>}
			  {(global.userInfo.isAdmin && event.user_id) &&
              <Button size="xl" onClick={() => {
				  fetch('https://01f1fef5.ngrok.io/api/v1/task/detail/'+event.id, {method: 'PUT', // Method itself
																			 headers: {
																			  'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
																			 },
																			 body: JSON.stringify({'id': event.id, 'status': 3}) })
        //global.userInfo.exp += event.exp;
        for (var i = 0; i < global.vlt.length; i++){
          if (global.vlt[i].urlVK === (global.user_info.id).toString()) {
            global.vlt_i = i;
          }
        }

        global.vlt[global.vlt_i].karma += event.exp;

        console.log(global.vlt[global.vlt_i].karma)
				fetch('https://01f1fef5.ngrok.io/api/v1/task/getlist/?format=json')
				.then(response => response.json())
				.then(result => {
				  global.jsn = result;
				  this.setState();
				},
				// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
				// чтобы не перехватывать исключения из ошибок в самих компонентах.
				(error) => {
				  console.log(error)
				});
				
				this.props.update(PANEL_EVENT_SENT, { event });
                this.props.go(PANEL_EVENT_SENT);
              }}>Задание выполнено</Button>}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}