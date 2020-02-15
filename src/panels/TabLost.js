import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FormLayout, FormStatus, Button, Input, PanelHeaderBack, View, Panel, Slider, Select, Group, Div, InfoRow,
  Progress, File, Tabs, TabsItem, Avatar } from '@vkontakte/vkui';
import vkConnectPromise from '@vkontakte/vk-connect-promise';
import vkConnect from '@vkontakte/vk-connect';
import "./TabLost.css";
import TabAdmin from "./TabAdmin";

const x = document.getElementById("geo_placeholder");


export default class TabLost extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };
  
  state = {
    clicked: 'false'
  }

  static defaultProps = {
      
  };

  constructor (props) {
    super(props);

    this.state = {
      value1: 50,
      loadWorksheep: false,
      post: false
    };
  }

  options () {
    const options = [];
    for (let i = 0; i <= 10; i += 2) {
      options.push(<option value={`${i / 10}`} key={`${i}`}>{i / 10}</option>);
    }
    return options;
  }



  sending = () => {
    //.log(vkConnect.send("VKWebAppGetAuthToken", {"app_id": 7175703, "scope": "wall"}))
    vkConnectPromise
      .send('VKWebAppGetAuthToken', {"app_id": 7175703, "scope": "wall, notes, messages"})
      .then(data => {
        global.token = data.access_token;
        console.log(global.token)
      })
      .catch(error => {
        // Handling an error
      });

      //vkConnect.send("VKWebAppCallAPIMethod", {"method": "wall.post", "request_id": "32test", "params": {"owner_id": global.user_info.id, "from_group": 0, "message": 'test', "v":"5.102", "access_token":global.token}});
      vkConnect.send("VKWebAppCallAPIMethod", {"method": "messages.send", "request_id": "32test", "params": {"random_id": "12313132", "user_id": 147993097, "message": 'test', "v":"5.102", "access_token": 'vbxhTPebYzKN38FStxtmSY9SM1tA_E8sVvqjnuFRhYgsbVUVbOBIuTtPToBYbKb8'}});

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

      fetch('https://01f1fef5.ngrok.io/api/v1/post/send/', {
        method: 'PUT', // Method itself
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": 14,
          "description": document.getElementById("dsc").value,
          "place": document.getElementById("place").value,
          "custom": document.getElementById("prm").value,
          "lat": global.lat,
          "lon": global.lon
      })});
      
  }  

  render() {
    const { userInfo } = this.props;
      const startPage = (
        <Fragment>
          <div>
            <center>
              {!this.state.post &&
              <form>
                <div className="input-field col s12">
                  <textarea id="dsc" className="materialize-textarea"></textarea>
                  <label htmlFor="dsc">Описание проблемы</label>
                </div>
                <div className="input-field col s12">

                  <textarea id="place" className="materialize-textarea"></textarea>
                  <label htmlFor="place">Примерное местоположение</label>
                </div>
                <div className="input-field col s12">
                  <textarea id="prm" className="materialize-textarea "></textarea>
                  <label htmlFor="prm">Особые приметы</label>
                </div>
                <Button size="xl" value='Сообщить' onClick={() => {
                  this.sending();
                  this.setState({post: true})
                }}>Сообщить</Button>
                <br />
                <div className="Account_admin">
                   <Button size="xl"
                      onClick={() =>
                      {
                        this.setState({loadWorksheep: true})
                      }}
                  >
                    Создать задание
                  </Button>



                </div>
              </form>
              }
              {this.state.post &&
              <div className='posted'>Ваш пост отправлен на обработку!</div>
              }
            </center>
          </div>

      </Fragment>
      );
    return (
        <div>{ this.state.loadWorksheep ? <WorksheetSelector/> : startPage }</div>

    );
  }
  }


function WorksheetSelector(props) {
  return (
      <TabAdmin></TabAdmin>
  );
}

